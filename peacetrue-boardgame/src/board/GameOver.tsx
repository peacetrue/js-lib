import React from "react";
import {IconButton, Snackbar, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Alert, {Color} from '@material-ui/lab/Alert';
import clsx from "clsx";
import {Player} from "../boardgame-types";
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import {Cancel, Mood, MoodBad} from "@material-ui/icons";

/*
【游戏结束】用于处理游戏结束后的相关事宜
* 展示游戏结果
** 和棋
** 胜利
** 失败
* 离开游戏
* 再来一局
*/

export type GameOverClassKey =
    | 'root'
    ;

export interface GameOverProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, GameOverClassKey> {
    isDraw: boolean,//是否和棋
    winner?: Player,//非和棋时的获胜者
    currentPlayer: Player,//当前玩家
    handleLeave?(player: Player): void,//离开游戏
    handleOnceAgain?(player: Player): void,//再来一局
}

export const gameOverDefaults: GameOverProps = {
    isDraw: false,
    winner: {id: 0, name: 'the default winner'},
    currentPlayer: {id: 0, name: 'the default player'},
    handleLeave(player) {
        console.info("handleLeave");
    },
    handleOnceAgain(player) {
        console.info("handleOnceAgain");
    }
};

export interface GameOver {
    (props: GameOverProps): JSX.Element
}

export const gameOver: GameOver = function GameOver(props: GameOverProps = gameOverDefaults): JSX.Element {
    let {classes, className, isDraw, winner, currentPlayer, handleLeave, handleOnceAgain, ...other} = props;
    let message: { type: Color, content: string };
    if (isDraw) {
        message = {
            type: 'info',
            content: '棋逢对手，和棋！'
        };
    } else if (winner?.id == currentPlayer.id) {
        message = {
            type: 'success',
            content: '恭喜，你赢了！'
        }
    } else {
        message = {
            type: 'warning',
            content: '你输了，再接再厉！'
        }
    }
    return (
        <Snackbar ref={arguments[1]} className={clsx(classes?.root, className)} {...other}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={true}>
            <Alert elevation={6} variant="filled" severity={message.type}
                   iconMapping={{
                       // info: <CheckCircleOutline fontSize="inherit"/>,
                       success: <Mood fontSize="inherit"/>,
                       warning: <MoodBad fontSize="inherit"/>,
                   }}
                   action={
                       <React.Fragment>
                           {handleOnceAgain &&
                           <IconButton color="inherit" size="small"
                                       onClick={() => handleOnceAgain && handleOnceAgain(currentPlayer)}>
                               <PlayCircleFilledWhiteIcon/>
                           </IconButton>}
                           {handleLeave &&
                           <IconButton color="inherit" size="small"
                                       onClick={() => handleLeave && handleLeave(currentPlayer)}>
                               <Cancel/>
                           </IconButton>
                           }
                       </React.Fragment>
                   }>
                {message.content}
            </Alert>
        </Snackbar>
    );
};

export const refGameOver = React.forwardRef(gameOver);
refGameOver.defaultProps = gameOverDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeaceGameOver'})(refGameOver);