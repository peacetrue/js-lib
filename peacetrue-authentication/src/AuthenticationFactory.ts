import Authentication from "./Authentication";
import {HttpClient} from "peacetrue-httpclient";

export interface AuthenticationFactoryOptions {
    httpClient?: HttpClient,
    token?: string,
    registerUrl?: string,
    loginUrl?: string,
    logoutUrl?: string,
}

export const defaultAuthenticationFactoryOptions: Required<AuthenticationFactoryOptions> = {
    httpClient: fetch,
    token: 'token',
    registerUrl: '/register',
    loginUrl: '/login',
    logoutUrl: '/logout',
}

export interface AuthenticationFactory {
    (options: AuthenticationFactoryOptions): Authentication
}

export const defaultAuthenticationFactory: AuthenticationFactory = ({
                                                                        httpClient = defaultAuthenticationFactoryOptions.httpClient,
                                                                        token = defaultAuthenticationFactoryOptions.token,
                                                                        registerUrl = defaultAuthenticationFactoryOptions.registerUrl,
                                                                        loginUrl = defaultAuthenticationFactoryOptions.loginUrl,
                                                                        logoutUrl = defaultAuthenticationFactoryOptions.logoutUrl
                                                                    }) => ({
    isAuthenticated() {
        return Boolean(localStorage.getItem(token));
    },
    getAuthenticateInfo() {
        let value = localStorage.getItem(token);
        return value ? JSON.parse(value) : null;
    },
    register(params) {
        return httpClient(registerUrl, {method: 'post', body: params})
            .then((result: any) => {
                localStorage.removeItem(token);
                return result;
            });
    },
    login(params) {
        return httpClient(loginUrl, {method: 'post', body: params})
            .then((result: any) => {
                localStorage.setItem(token, JSON.stringify(result));
                return result;
            })
    },
    logout(params) {
        return httpClient(logoutUrl, {method: 'post', body: params}).then((result: any) => {
            localStorage.removeItem(token);
            return result;
        });
    },
});

export default {defaultAuthenticationFactoryOptions, defaultAuthenticationFactory};
