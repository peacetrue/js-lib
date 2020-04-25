import HttpClientProxy from './HttpClientProxy'

const CORS: HttpClientProxy = (httpClient) => {
    return (url, options = {}) => {
        options.mode = 'cors';
        options.credentials = 'include';
        return httpClient(url, options);
    };
};

export default CORS;


