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
};

module.exports = Core;
