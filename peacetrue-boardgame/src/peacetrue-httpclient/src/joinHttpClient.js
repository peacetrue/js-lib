/** The first proxy takes effect last */
const joinHttpClient = (httpClient = fetch, ...proxies) => {
    let targetHttpClient = httpClient;
    proxies.forEach((proxy, index) => {
        targetHttpClient = proxy(targetHttpClient);
    });
    return targetHttpClient;
}

export default joinHttpClient;