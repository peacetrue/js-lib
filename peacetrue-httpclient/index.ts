import {HttpClientJoiner} from "./src/HttpClientProxy";
import SpringRest from "./src/SpringRest";
import CORS from "./src/CORS";
import ResultConverter from "./src/ResultConverter";

export const HttpClientProxies = {CORS, ResultConverter, SpringRest};
export default {HttpClientJoiner, proxies: HttpClientProxies};