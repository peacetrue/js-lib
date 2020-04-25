import HttpClient, {defaultHttpClient} from "./HttpClient";

export default interface HttpClientProxy {
    (httpClient: HttpClient): HttpClient
}

/** The first proxy takes effect first */
export const HttpClientJoiner = (httpClient: HttpClient = defaultHttpClient, ...proxies: Array<HttpClientProxy>) => {
    let targetHttpClient = httpClient;
    proxies.reverse().forEach((proxy, index) => {
        targetHttpClient = proxy(targetHttpClient);
    });
    return targetHttpClient;
}

