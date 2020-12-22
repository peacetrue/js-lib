import {GameInfo} from "../boardgame-types";
import {CardProps, StandardProps} from "@material-ui/core";

export type GameClassKey =
    | 'root'
    | 'media'
    | 'title'
    | 'content'
    ;

export interface GameProps extends GameInfo, StandardProps<CardProps, GameClassKey> {

    /** 创建房间 */
    handleCreateRoom?(name: string): void;

    /** 加入房间 */
    handleJoinRoom?(name: string): void;
}

export declare const gameDefaults;

export default function Game(props: GameProps): JSX.Element;
