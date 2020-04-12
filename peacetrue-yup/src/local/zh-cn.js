import printValue from 'yup/lib/util/printValue';

export let mixed = {
    default: '${path} 是无效的',
    required: '${path} 是必须的',
    oneOf: '${path} 必须是以下值中的一个: ${values}',
    notOneOf: '${path} 必须不是以下值中的一个: ${values}',
    notType: ({path, type, value, originalValue}) => {
        let isCast = originalValue != null && originalValue !== value;
        let msg =
            `${path} 必须是 \`${type}\` 类型, ` +
            `但最终的值是: \`${printValue(value, true)}\`` +
            (isCast
                ? ` (转换原始值 \`${printValue(originalValue, true)}\`).`
                : '.');

        if (value === null) {
            msg += `\n 如果将 "null" 用作空值，请确保将模式标记为 \`.nullable()\``;
        }

        return msg;
    },
    defined: '${path} 必须被定义',
};

export let string = {
    length: '${path} 必须是 ${length} 个字符',
    min: '${path} 至少 ${min} 个字符',
    max: '${path} 至多 ${max} 个字符',
    matches: '${path} 必须匹配以下规则: "${regex}"',
    email: '${path} 必须是有效的邮箱',
    url: '${path} 必须是有效的链接',
    trim: '${path} 必须是修剪过的字符串',
    lowercase: '${path} 必须是小写字符串',
    uppercase: '${path} 必须是大写字符串',
};

export let number = {
    min: '${path} 必须大于或等于 ${min}',
    max: '${path} 必须小于或等于 ${max}',
    lessThan: '${path} 必须小于 ${less}',
    moreThan: '${path} 必须大于 ${more}',
    notEqual: '${path} 必须不等于 ${notEqual}',
    positive: '${path} 必须是正数',
    negative: '${path} 必须是负数',
    integer: '${path} 必须是整数',
};

export let date = {
    min: '${path} 必须晚于 ${min}',
    max: '${path} 必须早于 ${max}',
};

export let boolean = {};

export let object = {
    noUnknown: '${path} 含有未指定的属性名: ${unknown}',
};

export let array = {
    min: '${path} 至少包含 ${min} 项',
    max: '${path} 最多包含 ${max} 项',
};

let YupZhCn = {
    mixed,
    string,
    number,
    date,
    object,
    array,
    boolean,
};

export default YupZhCn;