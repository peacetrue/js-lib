import {ObjectLike} from '../common-types'
import {G, GameComb} from '../boardgame-types'
import * as Utils from '../utils'
import {Boundary, Cell} from '../utils'
import {Ctx} from "boardgame.io";

function IsDraw(cells: Array<Cell>) {
    return cells.filter(c => c === null).length === 0;
}

export interface TicTacToeGameProps {
    boundary: Boundary,
    count: number,
}

export const ticTacToeGameDefaults: TicTacToeGameProps = {
    boundary: {width: 12, height: 12},
    count: 5
};

export function TicTacToeGame(props: TicTacToeGameProps = ticTacToeGameDefaults): GameComb {
    return ({
        code: 'tic-tac-toe',
        name: 'tic-tac-toe',
        desc: '五子棋',
        minPlayers: 1,
        maxPlayers: 2,
        logo: 'game/gobang.jpeg',
        intro: '五子棋是全国智力运动会竞技项目之一，是一种两人对弈的纯策略型棋类游戏。通常双方分别使用黑白两色的棋子，下在棋盘直线与横线的交叉点上，先形成五子连线者获胜',
        detail: '五子棋是全国智力运动会竞技项目之一，是一种两人对弈的纯策略型棋类游戏。通常双方分别使用黑白两色的棋子，下在棋盘直线与横线的交叉点上，先形成五子连线者获胜。\n' +
            '另外有一种规则，是自己连成五枚棋子就吃掉对方最近的一枚棋子。被吃的棋子还给对方继续使用。最后以先出完所有棋子的一方为胜利者。自己所被对方吃的棋子的那一格自己不能再放棋子，对方可以放。但是吃子不能吃对方已经连成五子的其中一枚棋子，除非对方全部棋子都连成了五子。\n' +
            '五子棋的棋具与围棋通用，是一种的传统黑白棋种。围棋主要流行于东亚以及欧洲的一些国家。\n' +
            '五子棋容易上手，老少皆宜，而且趣味横生，引人入胜；它不仅能增强思维能力，提高智力，而且富含哲理，有助于修身养性。五子棋已在各个游戏平台有应用。',

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

TicTacToeGame.defaultProps = ticTacToeGameDefaults;
export default TicTacToeGame;