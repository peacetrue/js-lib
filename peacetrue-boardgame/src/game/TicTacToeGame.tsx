import {ObjectLike} from '../common-types'
import {Ctx, G} from '../boardgame-types'
import * as Utils from '../utils'
import {Boundary, Cell} from '../utils'

function IsDraw(cells: Array<Cell>) {
    return cells.filter(c => c === null).length === 0;
}

export interface TicTacToeGameProps {
    boundary: Boundary,
    count: number,
}

export const defaults: TicTacToeGameProps = {
    boundary: {width: 12, height: 12},
    count: 5
};

export function TicTacToeGame(props: TicTacToeGameProps = defaults) {
    return ({
        name: 'tic-tac-toe',
        minPlayers: 1,
        maxPlayers: 2,

        setup: (ctx: Ctx, setupData: ObjectLike<any>) => {
            console.info("setupData:", setupData);
            return {cells: new Array(props.boundary.width * props.boundary.height).fill(null)};
        },
        moves: {
            clickCell: (G: G, ctx: Ctx, id: number) => {
                G.cells[id] = {owner: ctx.currentPlayer};
            },
        },
        turn: {
            moveLimit: 1,
        },
        ai: {
            enumerate: (G: G, ctx: Ctx) => {
                let moves = [];
                for (let i = 0; i < props.boundary.width * props.boundary.height; i++) {
                    if (G.cells[i] === null) {
                        moves.push({move: 'clickCell', args: [i]});
                    }
                }
                return moves;
            },
        },
        endIf: (G: G, ctx: Ctx) => {
            let player = Utils.findVictoryPlayer(G.cells, props.boundary, props.count);
            console.info("VictoryPlayer:", player);
            if (player) return {isDraw: false, winner: {id: ctx.currentPlayer}};
            let isDraw = IsDraw(G.cells);
            console.info("isDraw:", isDraw);
            if (isDraw) return {isDraw: true};
        },
    });
}

TicTacToeGame.defaultProps = defaults;
export default TicTacToeGame;