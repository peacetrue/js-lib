//see https://github.com/jquense/yup#mixedtestoptions-object-schema

let unique = ({httpClient = fetch, url = value => value}) => {
    return {
        name: 'unique',
        test: async (value) => !(await httpClient(url(value))),
        message: '${path} 必须是唯一的',
        params: {},
        exclusive: false,
    };
};

export default unique;