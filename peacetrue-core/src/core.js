let Core = {
    /**
     * js类型
     * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#Data_types">参考文档</a>
     */
    types: ['undefined', 'null', 'boolean', 'number', 'bigint', 'string', 'symbol', 'object'],
    primitiveTypes: ['undefined', 'null', 'boolean', 'number', 'bigint', 'string', 'symbol'],
    /**
     * 获取值的类型
     * @param {*} value
     * @return {string}
     */
    getType(value) {
        let type = Object.prototype.toString.call(value);
        /\[object (\w+)]/.test(type);
        return RegExp.$1.toLowerCase();
    },
    /**
     * 是否原始类型或其封装类型
     * @param {*} [value]
     * @return {boolean}
     */
    isPrimitiveOrWrapper(value) {
        return Core.primitiveTypes.filter(item => item === Core.getType(value)).length > 0;
    },
    /**
     * 是否简单类型，不可遍历的类型
     * @param {*} value
     * @return {boolean}
     */
    isSimpleType(value) {
        return Core.isPrimitiveOrWrapper(value)
            || value instanceof Function
            || value instanceof Date
            || value instanceof RegExp;
    },
    /**
     * 获取对象的值
     * @param {object} object
     * @param {string} path 属性路径
     * @return {*}
     */
    getValue(object, path) {
        //TODO 如何实现可选的jsonpath依赖在node中, eval快还是jsonpath快？
        let jsonpath = require('jsonpath');
        return jsonpath
            ? jsonpath.value(object, `$.${path}`)
            : Core._getValue(object, path);
    },
    /** 通过eval获取对象值 */
    _getValue(object, path) {
        try {
            return eval("object." + path);
        } catch (e) {
            if (console && console.warn) console.warn(`can't eval ${path} on object `, object);
            return undefined;
        }
    },
    /**
     * 格式化
     * @param {String} message
     * @param {Object|Array} value
     * @return {String}
     */
    format(message, value) {
        if (Core.isSimpleType(value)) value = [value];
        return Array.isArray(value)
            ? message.replace(/{(\d+)}/g, (matched, index) => value[index])
            //TODO 提供精确匹配属性路径的正则表达式
            : message.replace(/{(.*?)}/g, (matched, name) => Core.getValue(value, name));
    },
    /**
     * 是否null或者undefined
     * @param {*} value
     * @return {boolean}
     */
    isNullOrUndefined(value) {
        return value === undefined || value === null;
    },
    /**
     * 是否为空
     * @param {*} value
     * @return {boolean}
     */
    isEmpty(value) {
        if (Core.isNullOrUndefined(value)) return true;
        let type = Core.getType(value);
        if (type === 'string') return value === '';
        if (type === 'array') return value.length === 0;
        return false;
    },
    /**
     * 对数组进行分组
     * @param {Array} array 待分组的数组
     * @param {Function} keyMapper key转换器，接收两个参数 element, index
     * @param {Function} valueMapper value转换器，接收两个参数 element, index
     * @return {Object}
     */
    groupBy(array,
            keyMapper = (element, index) => element,
            valueMapper = (element, index) => index) {
        let groupBy = {};
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            let key = keyMapper(element, i);
            if (!(key in groupBy)) groupBy[key] = [];
            groupBy[key].push(valueMapper(element, i));
        }
        return groupBy;
    }
};

module.exports = Core;
