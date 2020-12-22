import HttpClientProxy from './HttpClientProxy'

export const cors: HttpClientProxy = (httpClient) => {
    return (url, options = {}) => {
        options.mode = 'cors';
        options.credentials = 'include';
        return httpClient(url, options);
    };
};

export default cors;


