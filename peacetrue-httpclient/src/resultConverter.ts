import HttpClientProxy from './HttpClientProxy'

export class ResultError extends Error {
    data?: any
}

export const resultConverter: HttpClientProxy = (httpClient) => {
    return (url, options) => {
        return httpClient(url, options)
            .then(response => response.json())
            .then((result: any) => {
                if (!(result.code && result.message)) return result;
                if (result.code === 'success') return result.data;
                let error = new ResultError();
                error.name = result.code;
                error.message = result.message;
                error.data = result.data;
                throw error;
            });
    }
}

export default resultConverter;