import HttpClient, {defaultHttpClient} from "./HttpClient";

export interface HttpClientProxy {
    (httpClient: HttpClient): HttpClient
}

export interface HttpClientJoiner {
    (httpClient: HttpClient, ...proxies: Array<HttpClientProxy>): HttpClient
}

/** The first proxy takes effect first */
export const defaultHttpClientJoiner: HttpClientJoiner = (httpClient: HttpClient = defaultHttpClient, ...proxies) => {
    let targetHttpClient = httpClient;
    proxies.reverse().forEach((proxy, index) => {
        targetHttpClient = proxy(targetHttpClient);
    });
    return targetHttpClient;
}

export default HttpClientProxy;