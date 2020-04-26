export * from "./HttpClient";
export * from "./HttpClientProxy";
export declare const HttpClientProxies: {
    CORS: import("./HttpClientProxy").default;
    ResultConverter: import("./HttpClientProxy").default;
    SpringRest: import("./HttpClientProxy").default;
};
export default HttpClientProxies;
