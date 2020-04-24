import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    Popover,
    StandardProps,
    Theme,
    Typography
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {GameInfo, Player} from "../boardgame-types";
import RoomService, {Room} from "./RoomService";
import {Credentials} from "./PlayerService";
import {Skeleton} from "@material-ui/lab";
import {Loadable} from "../common-types";
import {deepPurple} from "@material-ui/core/colors";
import CopyToClipboard from 'react-copy-to-clipboard';
import {makeStyles} from "@material-ui/core/styles";


/*  玩家等待队列 */
//TODO 没有办法做到所有玩家就绪之后，房主点击开始之后，同时进入游戏室
export type QueueClassKey =
    | 'root'
    | 'game'
    | 'players'
    | 'player'
    | 'operateBar'
    | 'join'
    | 'leave'
    ;

export interface QueueProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, QueueClassKey> {
    game: GameInfo,
    currentPlayer: Player,
    interval?: number,

    /** 获取房间信息 */
    getRoom(): Promise<Room | undefined>,

    /** 加入房间 */
    handleJoin?(currentPlayer: Required<Player>): Promise<Credentials>;

    /** 所有人都已加入房间 */
    handleAllJoined?(credential?: Credentials): void;

    /** 离开房间 */
    handleLeave?(currentPlayer: Required<Player>): void;
}

export const queueDefaults: Partial<QueueProps> = {};

export interface Queue {
    (props: QueueProps): JSX.Element
}

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));


let queue: Queue = function Queue(props: QueueProps): JSX.Element {
    let {
        classes, className,
        game, currentPlayer, interval = 1000, getRoom, handleJoin, handleLeave, handleAllJoined,
        ...other
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event: any) => {
        console.info('open')
        setAnchorEl(event.currentTarget);
    }
    const handlePopoverClose = () => {
        console.info("close")
        setAnchorEl(null);
    }
    let open = Boolean(anchorEl);
    const innerClasses = useStyles();


    const [loadable, setLoadable] = useState<Loadable<Room>>({loading: true});
    const timer = useRef<NodeJS.Timeout>();
    const intervalCallback = () => {
        getRoom().then(room => {
            if (room && !RoomService.hasVacancy(room) && handleAllJoined) handleAllJoined();
            else setLoadable({loading: false, data: room});
        });
    };

    useEffect(() => {
        intervalCallback();
        timer.current = setInterval(intervalCallback, interval);
        return () => clearInterval(timer.current as NodeJS.Timeout);
    }, []);

    const renderPlayer = (player: Player) => {
        if (player.name) {
            return (<Avatar aria-label="recipe" className={classes?.player}>{player.name.substring(0, 1)}</Avatar>);
        } else {
            return (<CircularProgress color="inherit"/>);
        }
    }

    const renderOperate = (room: Room) => {
        let player = RoomService.findPlayer(room, currentPlayer.name);
        if (player) {
            let handleClick = () => handleLeave && handleLeave(player as Required<Player>);
            return (<Button variant={'contained'} color={'primary'} className={classes?.leave}
                            onClick={handleClick}>离开</Button>);
        } else {
            let player: Required<Player> = {
                id: RoomService.findFirstVacancyPlayerIndex(room),
                name: currentPlayer.name
            };
            let handleClick = () => {
                handleJoin && handleJoin(player).then(credential => {
                    if (player.id + 1 === room.players.length && handleAllJoined) {
                        handleAllJoined(credential);
                    }
                });
            };
            return (<Button variant={'contained'} color={'primary'} className={classes?.join}
                            onClick={handleClick}>加入</Button>);
        }
    }

    if (loadable.loading) return (<Skeleton animation="wave"/>);

    if (!loadable.data) {
        return (<div>房间已销毁</div>);
    }

    let room = loadable.data as Room;

    return (
        <Box ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>
            {/*<Typography variant={'h6'} className={classes?.game}>{game?.desc}</Typography>*/}
            {<Grid container spacing={1} className={classes?.players}>
                {room.players.map((player, index) =>
                    (<Grid key={index} item>{renderPlayer(player)}</Grid>)
                )}
            </Grid>}
            <Box className={classes?.operateBar}>
                {renderOperate(room)}
                <CopyToClipboard
                    text={`http://${window.location.host}?roomId=${room.id}&user=${new Date().toISOString()}`}>
                    <Button variant={'contained'} color={'primary'}
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                    >
                        分享
                        <Popover
                            id="mouse-over-popover"
                            className={innerClasses.popover}
                            classes={{paper: innerClasses.paper,}}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                            transformOrigin={{vertical: 'bottom', horizontal: 'right',}}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography>点击复制，发送房间地址给好友</Typography>
                        </Popover>
                    </Button>
                </CopyToClipboard>
            </Box>
        </Box>
    );
};

const refQueue = React.forwardRef(queue);

refQueue.defaultProps = queueDefaults;

export default withStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
    game: {},
    players: {
        textAlign: 'center'
    },
    player: {
        color: theme.palette.getContrastText(deepPurple[200]),
        backgroundColor: deepPurple[200],
    },
    operateBar: {
        marginTop: theme.spacing(2),
        textAlign: 'right',
        '&>*': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    },
    join: {},
}), {name: 'PeaceQueue'})(refQueue);