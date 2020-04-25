"use strict";
exports.__esModule = true;
var ResultConverter = function (httpClient) {
    return function (url, options) {
        return httpClient(url, options)
            .then(function (response) { return response.json(); })
            .then(function (result) {
            if (!(result.code && result.message))
                return result;
            if (result.code === 'success')
                return result.data;
            var error = new Error();
            Object.keys(result).forEach(function (key) { return error[key] = result[key]; });
            throw error;
        });
    };
};
exports["default"] = ResultConverter;
