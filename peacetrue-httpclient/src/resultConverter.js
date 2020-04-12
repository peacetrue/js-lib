const resultConverter = httpClient => {
    return (url, options) => {
        return httpClient(url, options)
            .then(response => response.json())
            .then(result => {
                if (!(result.code && result.message)) return result;
                if (result.code === 'success') return result.data;
                let error = new Error();
                Object.assign(error, result);
                throw error;
            });
    }
}

export default resultConverter;