import React from "react";
import {StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from "clsx";

export type PlaceholderClassKey =
    | 'root'
    ;

export interface PlaceholderProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PlaceholderClassKey> {

}

export const placeholderDefaults: PlaceholderProps = {};

export interface Placeholder {
    (props: PlaceholderProps): JSX.Element
}

let placeholder: Placeholder = function Placeholder(props: PlaceholderProps = placeholderDefaults): JSX.Element {
    let {classes, className, ...other} = props;
    return (
        <div ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>
        </div>
    );
};
const refPlaceholder = React.forwardRef(placeholder);

refPlaceholder.defaultProps = placeholderDefaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeacePlaceholder'})(refPlaceholder);