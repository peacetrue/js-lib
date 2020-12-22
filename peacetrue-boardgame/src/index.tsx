import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lobby, {lobbyDefaults} from './lobby/Lobby';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {AppBar, Button, Container, CssBaseline, Toolbar, Typography} from "@material-ui/core";
import * as serviceWorker from './serviceWorker';
import Copyright from "./user/Copyright";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import {defaultHttpClientJoiner, httpClientProxies, HttpClientProxy} from 'peacetrue-httpclient'
import pyup from "peacetrue-yup";
import {defaultAuthenticationFactory, defaultAuthenticationFactoryOptions} from "peacetrue-authentication";
import Game, {gameDefaults} from "./lobby/Game";

const theme = createMuiTheme({});

const apiProxy: HttpClientProxy = (httpClient) => {
    return (url, options) => {
        return httpClient('http://localhost:9004' + url, options);
    };
};

let httpClient = defaultHttpClientJoiner(fetch, apiProxy, ...Object.values(httpClientProxies));
let usernameUnique = pyup.rules.unique({httpClient, url: value => `/users/exists?username=${value}`});
let authentication = defaultAuthenticationFactory({httpClient, registerUrl: '/users/register'});

function RegisterWrapper(props: any) {
    let history = useHistory();
    return (<Register
        handleSubmit={(props) => authentication.register(props).then(() => history.push(defaultAuthenticationFactoryOptions.loginUrl))}
        usernameUnique={usernameUnique} loginUrl={defaultAuthenticationFactoryOptions.loginUrl}/>)
}

function LoginWrapper(props: any) {
    let history = useHistory();
    return (<Login registerUrl={defaultAuthenticationFactoryOptions.registerUrl}
                   handleSubmit={(props) => authentication.login(props).then(() => history.push('/'))}/>)
}

function GameWrapper(props: any) {
    let history = useHistory();
    return (<Game {...gameDefaults}
                  handleCreateRoom={() => history.push('/game/create')}
    />);
}

function PrivateRoute({children, ...rest}: any) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                authentication.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: defaultAuthenticationFactoryOptions.loginUrl,
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <Container maxWidth={'xs'} style={{padding: '8'}}>
                <AppBar position={'static'}>
                    <Toolbar>
                        <Typography variant={'h6'} component={'a'} href={'/'}> 童年小游戏 </Typography>
                        <div style={{'flexGrow': 1}}/>
                        <Button variant={"outlined"} color={'inherit'}
                                href={defaultAuthenticationFactoryOptions.loginUrl}>登陆</Button>
                        <Button variant={"outlined"} color={'inherit'}
                                href={defaultAuthenticationFactoryOptions.registerUrl}>注册</Button>
                    </Toolbar>
                </AppBar>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <GameWrapper/>
                        </Route>
                        <Route path={defaultAuthenticationFactoryOptions.registerUrl}>
                            <RegisterWrapper/>
                        </Route>
                        <Route path={defaultAuthenticationFactoryOptions.loginUrl}>
                            <LoginWrapper/>
                        </Route>
                        <PrivateRoute path={'/game/create'}>
                            <Lobby
                                {...lobbyDefaults}
                                authentication={authentication.getAuthenticateInfo()}
                                url={process.env.REACT_APP_SERVER_URL || ''}/>
                        </PrivateRoute>
                    </Switch>
                </Router>
                <Copyright/>
            </Container>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
