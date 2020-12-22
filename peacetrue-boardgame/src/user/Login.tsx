import React, {useState} from "react";
import {ContainerProps, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {useFormik} from "formik";
import * as Yup from "yup";
import {LocaleObject} from "yup";
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
import Alert from '@material-ui/lab/Alert';


Yup.setLocale(pyup.local.zhCn as LocaleObject)

export type LoginClassKey =
    | 'root'
    | 'paper'
    | 'avatar'
    | 'form'
    | 'submit'
    ;

export interface LoginProps extends StandardProps<ContainerProps, LoginClassKey> {
    registerUrl?: string,

    handleSubmit(params: any): Promise<any>,
}

export const loginDefaults: Partial<LoginProps> = {};

export interface Login {
    (props: LoginProps): JSX.Element
}

let login: Login = function Login(props: LoginProps): JSX.Element {
    const {classes, className, registerUrl, handleSubmit, ...other} = props;
    let [errorMessage, setErrorMessage] = useState<string>();
    const formik = useFormik({
        initialValues: {username: '', password: ''},
        validationSchema: Yup.object({
            username: Yup.string().label("用户名").required().min(6).max(24).test(pyup.rules.basicCharacter()),
            password: Yup.string().label("密码").required().min(6).max(24).test(pyup.rules.basicCharacter()),
        }),
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true)
            handleSubmit(values)
                .catch((error: Error) => {
                    setSubmitting(false);
                    setErrorMessage(error?.message);
                });
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
                <Typography component="h1" variant="h5">
                    登陆
                </Typography>
                <form className={classes?.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="用户名、邮箱、手机号"
                        autoFocus
                        helperText={'6~24个字符，包含数字英文字母和下划线'}
                        {...formik.getFieldProps('username')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="密码"
                        type="password"
                        helperText={'6~24个字符，包含数字英文字母和下划线'}
                        {...formik.getFieldProps('password')}
                    />
                    {errorMessage &&
                    <Alert severity="error">{errorMessage}</Alert>}

                    {/*<FormControlLabel
                        label="记住我"
                        control={<Checkbox name={'remember'} checked={formik.values.remember} color="primary"/>}
                    />*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes?.submit}
                    >
                        登陆
                    </Button>
                    <Grid container>
                        {/*<Grid item xs>
                            <Link href="#" variant="body2">
                                忘记密码?
                            </Link>
                        </Grid>*/}
                        {registerUrl && <Grid item>
                            <Link href={registerUrl} variant="body2">
                                {"还没有账号? 去注册"}
                            </Link>
                        </Grid>}
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
const refLogin = React.forwardRef(login);

refLogin.defaultProps = loginDefaults;

export default withStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}), {name: 'PeaceLogin'})(refLogin);


