"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResultError = /** @class */ (function (_super) {
    __extends(ResultError, _super);
    function ResultError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResultError;
}(Error));
exports.ResultError = ResultError;
var ResultConverter = function (httpClient) {
    return function (url, options) {
        return httpClient(url, options)
            .then(function (response) { return response.json(); })
            .then(function (result) {
            if (!(result.code && result.message))
                return result;
            if (result.code === 'success')
                return result.data;
            var error = new ResultError();
            error.name = result.code;
            error.message = result.message;
            error.data = result.data;
            throw error;
        });
    };
};
exports.default = ResultConverter;
