const Axios = require('axios');
const Qs = require('qs');

//--------------Axios
//处理参数和数据
Axios.defaults.paramsSerializer = function (params) {
    return Qs.stringify(params, {arrayFormat: 'repeat', serializeDate: (d) => d.getTime(), allowDots: true});
};

Axios.defaults.transformRequest.unshift(function (data, headers) {
    return Qs.stringify(data, {arrayFormat: 'repeat', serializeDate: (d) => d.getTime(), allowDots: true});
});


function ResultHandler(response) {
    return response;
}

ResultHandler.buildSuccessHandler = function (options) {
    let messager = options.messager;
    return function (result) {
        console.info('result:', result)
        let config = result.config, data = result.data || {};
        data.isSuccess = () => data.code === 'success';
        messager = config.messager || messager;
        if (messager) {
            if (data.isSuccess()) {
                console.info('handle success: ', result);
                config.showSuccessMessage === true && (messager.info(data.message || '操作成功'));
            } else {
                config.showFailureMessage !== false && (messager.warning(data.message || '操作失败'));
            }
        }
        return result.data;
    };
};

ResultHandler.buildSessionExpiredHandler = function (options) {
    let messager = options.messager;
    return function (result) {
        let config = result.config, data = result.data;
        if (data.code === 'sessionExpired') {
            console.info('handle sessionExpired: ', result);
            messager = config.messager || messager;
            if (messager) {
                config.showFailureMessage = false;
                messager.warning(data.message || '会话超时');
            }
        }
        return result;
    };
};


ResultHandler.buildFailureHandler = function (options) {
    let messager = options.messager;
    return function (result) {
        let config = result.config, response = result.response;
        messager = config.messager || messager;
        if (!messager) return result;
        if (response) {
            if (response.status === 404) {
                messager.error(`请求的资源'${config.url}'不存在`);
            } else if (response.status === 500) {
                messager.error('服务器内部异常');
            } else {
                messager.error(response.statusText);
            }
        } else {
            messager.error((result.message || '网络异常') + ('(可能是登录超时导致，请刷新当前页面)'), 3);
        }
        return result;
    };
};

ResultHandler.register = function (options) {
    Axios.interceptors.response.use(ResultHandler.buildSessionExpiredHandler(options), ResultHandler.buildFailureHandler(options));
    Axios.interceptors.response.use(ResultHandler.buildSuccessHandler(options), null);
};
