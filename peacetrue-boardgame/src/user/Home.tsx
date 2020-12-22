import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import {defaultHttpClientJoiner, httpClientProxies, HttpClientProxy} from 'peacetrue-httpclient'
import pyup from "peacetrue-yup";
import {defaultAuthenticationFactory, defaultAuthenticationFactoryOptions} from "peacetrue-authentication";
import {Button} from "@material-ui/core";

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

let Menus = (props: any) => {
    let history = useHistory();

    let menus = (
        <React.Fragment>
            <li>已有账号 <Link to={defaultAuthenticationFactoryOptions.loginUrl}>登陆</Link></li>
            <li>尚无账号 <Link to={defaultAuthenticationFactoryOptions.registerUrl}>注册</Link></li>
        </React.Fragment>
    );
    if (authentication.isAuthenticated()) {
        menus = (
            <React.Fragment>
                <li>当前用户：{authentication.getAuthenticateInfo().username}</li>
                <li><Button
                    onClick={() => authentication.logout().then(() => history.push(defaultAuthenticationFactoryOptions.loginUrl))}>退出</Button>
                </li>
            </React.Fragment>
        );
    }
    return menus;
}




export default function Home() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <h1> 欢迎来到棋牌室 </h1>
                    <Menus/>
                </Route>
                <Route path={defaultAuthenticationFactoryOptions.registerUrl}>
                    <RegisterWrapper/>
                </Route>
                <Route path={defaultAuthenticationFactoryOptions.loginUrl}>
                    <LoginWrapper/>
                </Route>
            </Switch>
        </Router>
    );
}
