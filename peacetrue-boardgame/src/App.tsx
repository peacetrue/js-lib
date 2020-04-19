import React, {useEffect, useState} from 'react';
import {Client} from 'boardgame.io/react';
import TicTacToeGame from "./game/TicTacToeGame";
// import TicTacToeBoard from "./board/TicTacToeBoard";
import Room from "./board/Room";
import {SocketIO} from "boardgame.io/multiplayer";
import RoomService from "./lobby/RoomService";
import QuickStart from "./lobby/QuickStart";

let tacToeGame = TicTacToeGame();
let TicTacToe = Client({
    game: tacToeGame,
    board: (props: any) => {
        return <Room {...props}/>;
    },
    debug: false,
    multiplayer: SocketIO({server: 'http://peacetrue.cn:8000'}),
});


let roomService = new RoomService({url: 'http://peacetrue.cn:8000', games: [tacToeGame]});
export default function (props: any) {
    let params = new URLSearchParams(window.location.search);
    let user: string = params.get("user") as string;
    console.info("current user:", user);
    if (!user) throw new Error(`current user not found`);
    let quickStart = new QuickStart(roomService, tacToeGame.name, user);
    let [state, setState] = useState<any>({code: 'loading'});

    useEffect(() => {
        let interval = setInterval(() => {
            quickStart.getState().then(_state => {
                if (state.code !== _state.code) setState({code: _state.code, credentials: _state.credentials});
            })
            // .catch(error => alert(error));
        }, 2000);
        return () => clearInterval(interval);
    })

    let handleClick = (props?: any) => {
        quickStart.start(2).then(state => setState(state))
    }

    if (state.code === 'loading') {
        return (<div>loading</div>)
    } else if (state.code === 'waiting') {
        let cache = state.credentials;
        return (<div>waiting</div>)
    } else if (state.code === 'playing') {
        let cache = state.credentials;
        return (<TicTacToe gameID={cache?.roomId} playerID={cache?.playerId + ''} credentials={cache?.credentials}/>);
    } else {
        return (<button onClick={() => handleClick()}>快速开始</button>);
    }
    // return (<Container maxWidth={'md'}><TicTacToe playerID={0}/></Container>);
};
