import React from "react";
import {ContainerProps, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {useFormik} from "formik";
import * as Yup from "yup";
import {LocaleObject, TestOptions} from "yup";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import pyup from 'peacetrue-yup'
import Copyright from "./Copyright";
import materialUi from "peacetrue-formik/dist";
import clsx from "clsx";

Yup.setLocale(pyup.local.zhCn as LocaleObject)
export type RegisterClassKey =
    | 'root'
    | 'paper'
    | 'avatar'
    | 'form'
    | 'submit'
    ;

export interface RegisterProps extends StandardProps<ContainerProps, RegisterClassKey> {
    usernameUnique: TestOptions<any>,
    loginUrl?: string,

    handleSubmit(params: any): Promise<any>,
}

export const registerDefaults: Partial<RegisterProps> = {};

export interface Register {
    (props: RegisterProps): JSX.Element
}

let register: Register = function Register(props: RegisterProps): JSX.Element {
    let {classes, className, usernameUnique, loginUrl, handleSubmit, ...other} = props;
    const formik = useFormik({
        initialValues: {username: '', password: ''},
        validationSchema: Yup.object({
            username: Yup.string().label("用户名").required().min(6).max(24).test(pyup.rules.basicCharacter()).test(usernameUnique),
            password: Yup.string().label("密码").required().min(6).max(24).test(pyup.rules.basicCharacter()),
        }),
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true)
            handleSubmit(values).catch(() => setSubmitting(false));
        },
    });
    materialUi.resetGetFieldProps(formik);

    return (
        <Container ref={arguments[1]} component="main" className={clsx(classes?.root, className)}
                   maxWidth="xs" {...other}>
            <div className={classes?.paper}>
                <Avatar className={classes?.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5"> 注册 </Typography>
                <form className={classes?.form} onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* //TODO 不用指定自动聚标 */}
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="用户名"
                                name="username"
                                autoComplete="username"
                                helperText={'6~24个字符，包含数字英文字母和下划线'}
                                {...formik.getFieldProps('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={'6~24个字符，包含数字英文字母和下划线'}
                                {...formik.getFieldProps('password')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes?.submit}
                        disabled={formik.isSubmitting}
                    >
                        注册
                    </Button>
                    {props.loginUrl &&
                    (<Grid container justify="flex-end">
                        <Grid item>
                            <Link href={props.loginUrl} variant="body2">
                                已经拥有账号? 去登陆
                            </Link>
                        </Grid>
                    </Grid>)}
                </form>
            </div>
        </Container>
    );
};
const refRegister = React.forwardRef(register);

refRegister.defaultProps = registerDefaults;

export default withStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}), {name: 'PeaceRegister'})(refRegister);