import {ObjectLike} from './common-types'
import {Game as Game} from "boardgame.io";

export interface G extends ObjectLike<any> {
}

/** 游戏结束 */
export interface GameOver extends ObjectLike<any> {
    /**是否和棋*/
    isDraw: boolean,
    /**获胜者*/
    winner?: Player,
    /**当前玩家*/
    player: Player,
}

/** 游戏配置 */
export interface GameConfig {
    /**英文名称*/
    code: string,
    minPlayers: number,
    maxPlayers: number,
}

/** 游戏信息 */
export interface GameInfo {
    /** 英文名称 */
    code: string,
    /** 中文名称 */
    desc: string,
    logo: string,
    intro: string,
    detail: string,
}

/** 游戏综合信息 */
export interface GameComb extends Game, GameInfo, GameConfig, ObjectLike<any> {

}

/** 玩家 */
export interface Player {
    id?: number,
    name: string,
}

