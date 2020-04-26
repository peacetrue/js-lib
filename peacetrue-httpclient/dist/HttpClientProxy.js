"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpClient_1 = require("./HttpClient");
/** The first proxy takes effect first */
exports.HttpClientJoiner = function (httpClient) {
    if (httpClient === void 0) { httpClient = HttpClient_1.defaultHttpClient; }
    var proxies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        proxies[_i - 1] = arguments[_i];
    }
    var targetHttpClient = httpClient;
    proxies.reverse().forEach(function (proxy, index) {
        targetHttpClient = proxy(targetHttpClient);
    });
    return targetHttpClient;
};
