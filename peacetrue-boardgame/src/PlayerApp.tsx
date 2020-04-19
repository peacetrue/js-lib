import React from "react";
import Player, {playerDefaults as playerDefaults} from "./board/Player";
import {Grid, Typography} from "@material-ui/core";
import Timer, {defaults as timerDefaults} from "./board/Timer";

export default (props: any) => {
    return (<Player {...playerDefaults}>
        <Grid item><Timer {...timerDefaults} component={Typography} variant={'h6'}/></Grid>
    </Player>);
}