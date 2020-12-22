/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import RoomService from './RoomService';
import TicTacToeGame from "../game/TicTacToeGame";

describe('RoomService', () => {
    let game = TicTacToeGame();
    let roomService = new RoomService({url: 'http://localhost:8000', games: [game]});

    let roomId = '';
    test('create', async () => {
        let result = await roomService.create({gameName: game.code, numPlayers: 2, setupData: {timeout: 2}});
        console.info("create result:", result);
        roomId = result.roomId;
    });

    let playerCredentials: Array<string> = [];
    test('join', async () => {
        for (let i = 0; i < 2; i++) {
            let result = await roomService.join({
                gameName: game.code,
                roomId: roomId,
                playerId: i,
                playerName: `test${i}`
            });
            playerCredentials[i] = result.playerCredentials;
            console.info(`test${i} join result:`, result);
        }
    });

    test('renamePlayer', async () => {
        for (let i = 0; i < 2; i++) {
            let result = await roomService.renamePlayer({
                gameName: game.code,
                roomId: roomId,
                playerId: i,
                credentials: playerCredentials[i],
                playerName: `test${i}-changed`
            });
            console.info(`test${i} renamePlayer result:`, result);
        }
    });

    // npm run test --testNamePattern="RoomService query"
    test('query', async () => {
        let result = await roomService.query({gameName: game.code});
        console.info(`query result:`, JSON.stringify(result));
    });

    test('get', async () => {
        let result = await roomService.get({gameName: game.code, roomId: roomId});
        console.info(`get result:`, result);
    });

    test('playAgain', async () => {
        let result = await roomService.playAgain({
            gameName: game.code,
            roomId: roomId,
            playerId: 0,
            credentials: playerCredentials[0]
        });
        console.info(`playAgain result:`, result);
    });

    test('get', async () => {
        let result = await roomService.get({gameName: game.code, roomId: roomId});
        console.info(`get result:`, result);
    });

    test('leave', async () => {
        for (let i = 0; i < 2; i++) {
            let result = await roomService.leave({
                gameName: game?.name || '',
                roomId: roomId,
                playerId: i,
                credentials: playerCredentials[i],
            });
            delete playerCredentials[i];
            console.info(`test${i} leave result:`, result);
            break;
        }
    });

});
