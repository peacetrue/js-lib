import joinHttpClient from "./src/joinHttpClient";
import springRest from "./src/springRest";
import cors from "./src/cors";
import resultConverter from "./src/resultConverter";

export const join = joinHttpClient;
export const proxies = {cors, resultConverter, springRest};
export default {join, proxies};