"use strict";
exports.__esModule = true;
var HttpClientProxy_1 = require("./src/HttpClientProxy");
var SpringRest_1 = require("./src/SpringRest");
var CORS_1 = require("./src/CORS");
var ResultConverter_1 = require("./src/ResultConverter");
exports.HttpClientProxies = { CORS: CORS_1["default"], ResultConverter: ResultConverter_1["default"], SpringRest: SpringRest_1["default"] };
exports["default"] = { HttpClientJoiner: HttpClientProxy_1.HttpClientJoiner, proxies: exports.HttpClientProxies };
