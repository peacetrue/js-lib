import HttpClientProxy from './HttpClientProxy'

const ResultConverter: HttpClientProxy = (httpClient) => {
    return (url, options) => {
        return httpClient(url, options)
            .then(response => response.json())
            .then(result => {
                if (!(result.code && result.message)) return result;
                if (result.code === 'success') return result.data;
                let error = new Error();
                Object.keys(result).forEach(key => error[key] = result[key]);
                throw error;
            });
    }
}

export default ResultConverter;