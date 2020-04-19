import React from "react";
import {Snackbar, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import MuiAlert from '@material-ui/lab/Alert';
import clsx from "clsx";
import {Player} from "../lobby/RoomService";


export type GameOverClassKey =
    | 'root'
    ;

export interface GameOverProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, GameOverClassKey> {
    isDraw: boolean,//是否和棋
    winner?: Player,//非和棋时的获胜者
    player: Player,//当前玩家
}

export const gameOverDefaults: GameOverProps = {
    isDraw: false,
    winner: {id: 0, name: 'the default winner'},
    player: {id: 0, name: 'the default player'},
};

export interface GameOver {
    (props: GameOverProps): JSX.Element
}

export const gameOver: GameOver = function GameOver(props: GameOverProps = gameOverDefaults): JSX.Element {
    let {classes, className, isDraw, winner, player, ...other} = props;
    let message;
    if (isDraw) message = '棋逢对手，和棋！';
    else if (winner?.id == player.id) message = '恭喜，你赢了！';
    else message = '你输了，再接再厉！';
    debugger
    return (
        <Snackbar ref={arguments[1]} className={clsx(classes?.root, className)} {...other}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={true}>
            <MuiAlert elevation={6} variant="filled">{message}</MuiAlert>
        </Snackbar>
    );
};

export const refGameOver = React.forwardRef(gameOver);
refGameOver.defaultProps = gameOverDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeaceGameOver'})(refGameOver);