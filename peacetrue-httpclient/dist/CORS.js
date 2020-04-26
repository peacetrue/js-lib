"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CORS = function (httpClient) {
    return function (url, options) {
        if (options === void 0) { options = {}; }
        options.mode = 'cors';
        options.credentials = 'include';
        return httpClient(url, options);
    };
};
exports.default = CORS;
