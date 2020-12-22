import {defaultHttpClient as _defaultHttpClient, HttpClient as _HttpClient} from "./HttpClient";
import {
    defaultHttpClientJoiner as _defaultHttpClientJoiner,
    HttpClientJoiner as _HttpClientJoiner,
    HttpClientProxy as _HttpClientProxy
} from "./HttpClientProxy";
import springRest from "./springRest";
import cors from "./cors";
import resultConverter from "./resultConverter";

export type HttpClient = _HttpClient;
export const defaultHttpClient = _defaultHttpClient;

export type HttpClientProxy = _HttpClientProxy;
export type HttpClientJoiner = _HttpClientJoiner;
export const defaultHttpClientJoiner = _defaultHttpClientJoiner;

export interface HttpClientProxies {
    [propName: string]: _HttpClientProxy
}

export const httpClientProxies: HttpClientProxies = {
    cors,
    resultConverter,
    springRest
};

export default httpClientProxies;