import React from "react";
import {StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";
import {Player as PlayerComponent} from "./Player";
import {Player} from "../lobby/RoomService";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";


export type PlayerLayoutClassKey =
    | 'root'
    ;

export interface PlayerLayoutProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PlayerLayoutClassKey> {
    board: JSX.Element,
    playerComponent: PlayerComponent,
    players: Array<Player>,
    playerId: number,
}

export interface PlayerLayout {
    (props: PlayerLayoutProps): JSX.Element
}

export const playerLayoutDefaults: Partial<PlayerLayoutProps> = {};

export const playerLayout: PlayerLayout = function PlayerLayout(props: PlayerLayoutProps): JSX.Element {
    console.info("playerLayout.props:", props);
    let {
        classes, className,
        board, playerComponent: PlayerComponent,
        players, playerId, ...other
    } = props;
    let index = players.findIndex(item => item.id === playerId);
    let otherIndex = index === 0 ? 1 : 0;
    return (
        <div ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>
            <PlayerComponent profile={{nickname: players[otherIndex].name}}
                             chessman={<FiberManualRecordIcon/>}
                             isActive={players[otherIndex].id === playerId}/>
            {board}
            <PlayerComponent profile={{nickname: players[index].name}}
                             chessman={<RadioButtonUncheckedIcon/>}
                             isActive={players[index].id === playerId}/>
        </div>
    );
};

const refPlayerLayout = React.forwardRef(playerLayout);
refPlayerLayout.defaultProps = playerLayoutDefaults;

export default withStyles((theme: Theme) => ({
    root: {
        // border: '1px solid black'
    },
}), {name: 'PeacePlayerLayout'})(refPlayerLayout);