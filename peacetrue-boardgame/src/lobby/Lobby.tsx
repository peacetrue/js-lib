import React, {useEffect, useState} from 'react';
import {Client} from 'boardgame.io/react';
import TicTacToeGame from "../game/TicTacToeGame";
import Room from "../board/Room";
import {SocketIO} from "boardgame.io/multiplayer";
import RoomService from "./RoomService";
import PlayerService, {Credentials, State} from "./PlayerService";
import {Backdrop, CircularProgress, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import {GameComb, GameInfo} from "../boardgame-types";
import Game from "./Game";
import Queue from "./Queue";
import GameOver from "../board/GameOver";
import {extract} from "../utils";

/*
* 用于处理用户玩单个游戏的整个过程
*/

export type LobbyClassKey =
    | 'root'
    | 'loading'
    ;

export interface LobbyProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, LobbyClassKey> {
    /** 服务端地址 */
    url: string,
    /** 接口地址，默认为服务端地址 */
    apiUrl?: string,
    /** 游戏 */
    game: GameComb,
    /** 房间 */
    room: PropTypes.ReactComponentLike,
}

export const lobbyDefaults: LobbyProps = {
    url: 'http://localhost:8000',
    // apiUrl: 'http://localhost:8000',
    game: TicTacToeGame(),
    room: Room,
};

export interface Lobby {
    (props: LobbyProps): JSX.Element
}

//TODO 参数展开式如何标记为可选
const getParams = ({userId = 'user', roomId = 'roomId'}: { userId?: string, roomId?: string })
    : { userId: string, roomId?: string } => {
    let params = new URLSearchParams(window.location.search);
    return {userId: params.get(userId) as string, roomId: params.get(roomId) as string};
}

let lobby: Lobby = function Lobby(props: LobbyProps): JSX.Element {
    let {classes, className, url, apiUrl, game, room: Room, ...other} = props;
    if (!apiUrl) apiUrl = url;
    let params = getParams({});
    let [state, setState] = useState<State>();
    let roomService = new RoomService({url: apiUrl, games: [game]});
    let playerService = new PlayerService(roomService, game.code, params.userId);

    useEffect(() => {
        playerService.getState().then(setState);
    }, []);

    //TODO 状态化呈现 vs 路由呈现，路由可以同时共存，状态化同一时刻只能存在一种
    const renderChildren = () => {

        function getHandleLeave(credentials: Credentials) {
            return (player: any) => roomService.leave({
                gameName: game.code,
                roomId: credentials.roomId,
                playerId: player.id,
                credentials: credentials.credentials,
            }).then(() => setState({code: 'initial'}));
        }

        function getHandleCreateAndJoin() {
            return () => playerService.createAndJoin(game.maxPlayers).then(setState);
        }

        switch (state?.code) {
            case undefined:
                return (
                    <Backdrop className={classes?.loading} open={true}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                );
            case 'initial':
                if (params.roomId) {
                    let roomId = params.roomId as string;
                    return (
                        <Queue
                            game={game}
                            currentPlayer={{name: params.userId}}
                            getRoom={() => roomService.get({gameName: game.code, roomId: roomId})}
                            handleJoin={(player) => playerService.join(roomId, player.id)}
                            handleAllJoined={(credentials) => setState({code: 'playing', credentials})}
                        />
                    );
                }
                //
                return (
                    <Game {...extract(game, ['code', 'desc', 'logo', 'intro', 'detail']) as GameInfo}
                          handleCreateRoom={getHandleCreateAndJoin()}
                          handleJoinRoom={() => playerService.start(game.maxPlayers).then(setState)}
                    />
                );
            case "waiting":
                let credentials = state.credentials as Credentials;
                return (
                    <Queue
                        game={game}
                        currentPlayer={{id: credentials.playerId, name: credentials.playerName}}
                        getRoom={() => roomService.get({gameName: game.code, roomId: credentials.roomId})}
                        handleLeave={getHandleLeave(credentials)}
                        handleAllJoined={() => setState({code: 'playing', credentials})}
                    />
                );
            case "playing":
                let credentials1 = state.credentials as Credentials;
                let TicTacToe = Client({
                    game: game,
                    board: (props: any) => {
                        let {ctx: {gameover}} = props;
                        let gameOver = !gameover ? undefined :
                            <GameOver isDraw={gameover.isDraw} winner={gameover.winner}
                                      currentPlayer={{id: credentials1.playerId, name: credentials1.playerName}}
                                      handleLeave={getHandleLeave(credentials1)}
                                      handleOnceAgain={getHandleCreateAndJoin()}
                            />;
                        return <Room {...props} gameOver={gameOver}/>;
                    },
                    multiplayer: SocketIO({server: url}),
                    debug: false,
                });
                let credentials0 = state.credentials as Credentials;
                return (
                    <TicTacToe gameID={credentials0.roomId}
                               playerID={credentials0.playerId + ''}
                               credentials={credentials0.credentials}/>
                );
        }
    }

    return (
        <div ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>
            {renderChildren()}
        </div>
    );
};

const refLobby = React.forwardRef(lobby);
refLobby.defaultProps = lobbyDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeaceLobby'})(refLobby);