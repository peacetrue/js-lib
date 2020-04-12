//see https://github.com/jquense/yup#mixedtestoptions-object-schema

let basicCharacter = () => {
    return {
        name: 'basicCharacter',
        test: value => /^[a-zA-Z0-9_]*$/.test(value),
        message: '${path} 只能包含数字英文字母或下划线',
        params: {},
        exclusive: false,
    };
};

export default basicCharacter;