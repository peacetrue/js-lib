"use strict";
exports.__esModule = true;
var qs = require("qs");
function stringify(params) {
    return qs.stringify(params, {
        arrayFormat: 'repeat',
        serializeDate: function (d) { return d.getTime().toString(); },
        allowDots: true
    });
}
var SpringRest = function (httpClient) {
    return function (url, options) {
        if (options === void 0) { options = {}; }
        if (!options.headers)
            options.headers = new Headers();
        options.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.set('Accept', 'application/json');
        // url params in options.params
        if (options.params)
            url += ('?' + stringify(options.params));
        // body params in options.body
        if (options.body)
            options.body = stringify(options.body);
        return httpClient(url, options);
    };
};
exports["default"] = SpringRest;
