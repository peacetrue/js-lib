import HttpClient from "./HttpClient";
export default interface HttpClientProxy {
    (httpClient: HttpClient): HttpClient;
}
/** The first proxy takes effect first */
export declare const HttpClientJoiner: (httpClient?: HttpClient, ...proxies: HttpClientProxy[]) => HttpClient;
