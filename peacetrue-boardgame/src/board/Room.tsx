import React from "react";
import {StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import GameOver from "./GameOver";
import {Player} from "../lobby/RoomService";
import PropTypes from 'prop-types'
import PlayerLayout from './PlayerLayout'
import TicTacToeBoard from "./TicTacToeBoard";
import PlayerComp from "./Player";


/**由 boardgame 传入*/
export interface RoomProps {
    G: any,
    ctx: any,
    moves: any,
    events: any,
    reset: any,
    undo: any,
    redo: any,
    step: any,
    log: any,
    gameID: number,
    playerID: number,
    gameMetadata: Array<Player>,
    isActive: boolean,
    isMultiplayer: boolean,
    isConnected: boolean,
    credentials: string,
    debug: any,
    _redo: any,
    _undo: any,
    _stateID: any,
    plugins: any,
}

export interface Room<T extends RoomProps> {
    (props: T): JSX.Element
}

export type StandardRoomClassKey =
    | 'root'
    ;

export interface CustomRoomProps {
    playerLayout: PropTypes.ReactComponentLike,
    board: PropTypes.ReactComponentLike,
    player: PropTypes.ReactComponentLike,
    gameOver: PropTypes.ReactComponentLike,
}

export interface StandardRoomProps extends RoomProps, CustomRoomProps, StandardProps<React.HTMLAttributes<HTMLDivElement>, StandardRoomClassKey> {
}

export interface StandardRoom extends Room<StandardRoomProps> {
}

export const standardRoom: StandardRoom = function StandardRoom(props: StandardRoomProps): JSX.Element {
    console.info("standardRoom.props:", props);
    let {
        classes, className,
        playerLayout: PlayerLayout, board: Board, player: Player, gameOver: GameOver,
        G, ctx, moves, events, reset, undo, redo, step, log, gameID, playerID,
        gameMetadata, isActive, isMultiplayer, isConnected, credentials,
        _redo, _undo, _stateID, plugins, debug,
        ...other
    } = props;
    let gameover = ctx.gameover;
    let player = gameMetadata.find(item => item.id == playerID);
    return (
        <div ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>
            <PlayerLayout board={<Board {...{G, ctx, moves, events}}/>}
                          playerComponent={Player}
                          players={gameMetadata} playerId={player?.id}/>
            {gameover &&
            <GameOver isDraw={gameover.isDraw} winner={gameover.winner} player={player}/>}
        </div>
    );
}

export const standardRoomDefaults: Partial<StandardRoomProps> = {
    playerLayout: PlayerLayout,
    board: TicTacToeBoard,
    player: PlayerComp,
    gameOver: GameOver,
};

export const refStandardRoom = React.forwardRef(standardRoom);
refStandardRoom.defaultProps = standardRoomDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeaceRoom'})(refStandardRoom);