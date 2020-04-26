export * from "./HttpClient";
export * from "./HttpClientProxy";
import SpringRest from "./SpringRest";
import CORS from "./CORS";
import ResultConverter from "./ResultConverter";

export const HttpClientProxies = {CORS, ResultConverter, SpringRest};
export default HttpClientProxies;