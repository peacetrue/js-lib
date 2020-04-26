"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./HttpClient"));
__export(require("./HttpClientProxy"));
var SpringRest_1 = require("./SpringRest");
var CORS_1 = require("./CORS");
var ResultConverter_1 = require("./ResultConverter");
exports.HttpClientProxies = { CORS: CORS_1.default, ResultConverter: ResultConverter_1.default, SpringRest: SpringRest_1.default };
exports.default = exports.HttpClientProxies;
