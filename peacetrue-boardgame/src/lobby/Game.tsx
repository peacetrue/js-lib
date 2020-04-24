import React from "react";
import {StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {GameInfo} from "../boardgame-types";

export type GameClassKey =
    | 'root'
    | 'media'
    | 'title'
    | 'content'
    ;

export interface GameProps extends GameInfo, StandardProps<React.HTMLAttributes<HTMLDivElement>, GameClassKey> {
    handleCreateRoom?(gameName: string): void;

    handleJoinRoom?(gameName: string): void;
}

export const gameDefaults: Partial<GameProps> = {
    code: 'Tic-Tac-Toe',
    desc: '五子棋',
    logo: 'game/Tic-Tac-Toe.png',
    intro: '井字棋，英文名叫Tic-Tac-Toe，是一种在3*3格子上进行的连珠游戏，和五子棋类似，由于棋盘一般不画边框，格线排成井字故得名。游戏需要的工具仅为纸和笔，然后由分别代表O和X的两个游戏者轮流在格子里留下标记（一般来说先手者为X），任意三个标记形成一条直线，则为获胜',
    detail: '井字棋，英文名叫Tic-Tac-Toe，是一种在3*3格子上进行的连珠游戏，和五子棋类似，由于棋盘一般不画边框，格线排成井字故得名。游戏需要的工具仅为纸和笔，然后由分别代表O和X的两个游戏者轮流在格子里留下标记（一般来说先手者为X），任意三个标记形成一条直线，则为获胜',
};

export interface Game {
    (props: GameProps): JSX.Element
}

let game: Game = function Game(props: GameProps): JSX.Element {
    let {classes, className, code, desc, logo, intro, detail, handleCreateRoom, handleJoinRoom, ...other} = props;
    let onClick = () => handleCreateRoom && handleCreateRoom(code);
    return (
        <Card ref={arguments[1]} className={clsx(classes?.root, className)} {...other} elevation={0} square={true}>
            <CardActionArea>
                <CardMedia className={classes?.media} image={logo} title={desc}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes?.title}>
                        {desc}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes?.content}>
                        {intro}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" disabled={!handleCreateRoom}
                        onClick={onClick} onTouchEnd={onClick}>
                    创建房间
                </Button>
                {/*<Button size="small" color="primary" disabled={!handleJoinRoom}
                        onClick={() => handleJoinRoom && handleJoinRoom(code)}>
                    快速开始
                </Button>*/}
            </CardActions>
        </Card>
    );
};
const refGame = React.forwardRef(game);

refGame.defaultProps = gameDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
    media: {
        height: 240,
    },
    title: {},
    content: {
        height: 120,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap'
    },
}), {name: 'PeaceGame'})(refGame);