import React from "react";
import PropTypes from 'prop-types'

import {Snackbar, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import MuiAlert from '@material-ui/lab/Alert';
import clsx from "clsx";
import {Player} from "../lobby/RoomService";
import {GameOver} from "./GameOver";
import {PlayerLayout} from "./PlayerLayout";


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
    gameMetadata: any,
    isActive: boolean,
    isMultiplayer: boolean,
    isConnected: boolean,
    credentials: string
}

export interface Room {
    (props: RoomProps): JSX.Element
}

export interface RoomBuilderProps {
    playerLayout: PlayerLayout,
    gameOver: GameOver,
}

export interface RoomBuilder {
    (props: RoomBuilderProps): Room
}


export type RoomClassKey =
    | 'root'
    ;

export function roomBuilder(props: RoomBuilderProps) {
    return (props: RoomProps): JSX.Element => {
        return (<div>

        </div>);
    }
}

export interface RoomProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, RoomClassKey> {
    isDraw: boolean,//是否和棋
    winner?: Player,//非和棋时的获胜者
    player: Player,//当前玩家
    gameOver: PropTypes.ReactElementLike,

}

export const roomDefaults: Partial<RoomProps> = {};


const Room = React.forwardRef(function Room(props: RoomProps, ref: any): JSX.Element {
        let {classes, className, isDraw, winner, player, ...other} = props;
        let message;
        if (isDraw) message = '棋逢对手，和棋！';
        else if (winner?.id === player.id) message = '恭喜，你赢了！';
        else message = '你输了，再接再厉！';
        return (
            <Snackbar ref={ref} className={clsx(classes?.root, className)} {...other}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={true}>
                <MuiAlert elevation={6} variant="filled">{message}</MuiAlert>
            </Snackbar>
        );
    }
);


Room.defaultProps = roomDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeaceRoom'})(Room);