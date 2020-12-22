import React from "react";
import {StandardProps, Theme, TypographyProps} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import clsx from "clsx";


export type CopyrightClassKey =
    | 'root'
    ;

export interface CopyrightProps extends StandardProps<TypographyProps, CopyrightClassKey> {

}

export const copyrightDefaults: CopyrightProps = {};

export interface Copyright {
    (props: CopyrightProps): JSX.Element
}

let copyright: Copyright = function Copyright(props: CopyrightProps = copyrightDefaults): JSX.Element {
    let {classes, className, ...other} = props;
    return (
        <Typography ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="http://peacetrue.cn/" target={'_blank'}>
                Peacetrue
            </Link>
            {'.'}
            {' All rights reserved.'}
        </Typography>
    );
};
const refCopyright = React.forwardRef(copyright);

refCopyright.defaultProps = copyrightDefaults;

export default withStyles((theme: Theme) => ({
    root: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}), {name: 'PeaceCopyright'})(refCopyright);




