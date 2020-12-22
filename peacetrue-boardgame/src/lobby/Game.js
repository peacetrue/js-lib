import React from "react";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";

export const gameDefaults = {
    code: 'Tic-Tac-Toe',
    desc: '五子棋',
    logo: 'game/Tic-Tac-Toe.png',
    intro: '井字棋，英文名叫Tic-Tac-Toe，是一种在3*3格子上进行的连珠游戏，和五子棋类似，由于棋盘一般不画边框，格线排成井字故得名。游戏需要的工具仅为纸和笔，然后由分别代表O和X的两个游戏者轮流在格子里留下标记（一般来说先手者为X），任意三个标记形成一条直线，则为获胜',
    detail: '井字棋，英文名叫Tic-Tac-Toe，是一种在3*3格子上进行的连珠游戏，和五子棋类似，由于棋盘一般不画边框，格线排成井字故得名。游戏需要的工具仅为纸和笔，然后由分别代表O和X的两个游戏者轮流在格子里留下标记（一般来说先手者为X），任意三个标记形成一条直线，则为获胜',
};

const refGame = React.forwardRef(function Game(props, ref) {
    let {classes, className, code, desc, logo, intro, detail, handleCreateRoom, handleJoinRoom, ...other} = props;
    let onClick = () => handleCreateRoom && handleCreateRoom(code);
    return (
        <Card ref={ref} className={clsx(classes?.root, className)} elevation={0} square={true} {...other}>
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
});

refGame.defaultProps = gameDefaults;

export default withStyles((theme) => ({
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