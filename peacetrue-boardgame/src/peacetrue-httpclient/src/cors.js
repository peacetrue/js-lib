const cors = (httpClient) => {
    return (url, options = {}) => {
        options.mode = 'cors';
        options.credentials = 'include';
        return httpClient(url, options);
    };
};

export default cors;
