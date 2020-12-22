import qs = require("qs");
import HttpClientProxy from './HttpClientProxy'

function stringify(params: any): string {
    return qs.stringify(params, {
        arrayFormat: 'repeat',
        serializeDate: (d) => d.getTime().toString(),
        allowDots: true,
    });
}

export const springRest: HttpClientProxy = (httpClient) => {
    return (url, options = {}) => {
        if (!options.headers) options.headers = new Headers();
        let isFormData = options.body instanceof FormData;
        !isFormData && options.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.set('Accept', 'application/json');
        // url params in options.params
        if (options.params) url += ('?' + stringify(options.params));
        // body params in options.body
        if (options.body && !isFormData) options.body = stringify(options.body);
        return httpClient(url, options);
    };
};

export default springRest;
