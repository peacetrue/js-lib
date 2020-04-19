import React from "react";
import PropTypes from "prop-types";
import {StandardProps, Theme, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/styles";
import {ObjectLike} from "../common-types";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import clsx from 'clsx';


export type PlayerClassKey =
    | 'root'
    | 'profile'//个人信息
    | 'chessman'//棋子
    ;

export interface Profile extends ObjectLike<any> {
    /** 昵称 */
    nickname: string
}

export interface PlayerProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PlayerClassKey> {
    /** 个人信息 */
    profile: Profile,
    /** 棋子 */
    chessman: PropTypes.ReactElementLike,
    /** 是否激活 */
    isActive: boolean,
}

export interface Player {
    (props: PlayerProps): JSX.Element
}

export const playerDefaults: PlayerProps = {
    profile: {nickname: 'unknown'},
    chessman: <FiberManualRecordIcon/>,
    isActive: false,
};

export const player: Player = function (props: PlayerProps = playerDefaults): JSX.Element {
    let {classes, className, profile, chessman, isActive, ...other} = props;
    return (
        <Grid ref={arguments[1]} className={clsx(classes?.root, className)} {...other}
              container justify={'center'} alignItems={'center'} spacing={2}>
            <Grid item className={classes?.profile}>
                <Typography variant={'h6'}>{profile.nickname}</Typography>
            </Grid>
            {props?.children}
            <Grid item className={classes?.chessman}>{props.chessman}</Grid>
        </Grid>
    );
};

export const refPlayer = React.forwardRef(player);
refPlayer.defaultProps = playerDefaults;

export default withStyles((theme: Theme) => ({
    root: {
        // border: '1px solid black',
    },
    profile: {},
    chessman: {},
}), {name: 'PeacePlayer'})(refPlayer);