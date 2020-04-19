import React from "react";
import {StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";


export type PlayerLayoutClassKey =
    | 'root'
    ;

export interface PlayerLayoutProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PlayerLayoutClassKey> {

}

export interface PlayerLayout {
    (props: PlayerLayoutProps): JSX.Element
}

export const playerLayoutDefaults: PlayerLayoutProps = {};

let playerLayout = function PlayerLayout(props: PlayerLayoutProps = playerLayoutDefaults): JSX.Element {
    let {classes, className, ...other} = props;
    return (
        <div ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>

        </div>
    );
};

const refPlayerLayout = React.forwardRef(playerLayout);
refPlayerLayout.defaultProps = playerLayoutDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeacePlayerLayout'})(refPlayerLayout);