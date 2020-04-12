let Core = require('./core.js');
let Axios = require('peacetrue-core/src/axios');

//basic rule, can't support message placeholder
let Rules = {
    rules: {
        requires(rule, value, callback, source, options) {
            if (Core.isEmpty(value)) return true;
            return rule.requires.filter(name => !Core.isEmpty(value[name])).length > 0;
        },
        depend(rule, value, callback, source, options) {
            if (!rule.depend.supplier(source)) return true;
            return !Core.isEmpty(value);
        },
        unique(rule, value, callback, source, options) {
            //{url:String,params:{},original:{}}
            let unique = rule.unique;
            let params = {[rule.field]: value};

            unique.params
            && Object.keys(unique.params).forEach(key => {
                let value = rule.unique.params[key];
                params[key] = value instanceof Function ? value() : value;
            });

            let original = unique.original;
            if (original) {
                if (Core.getType(original) !== 'object') original = {[rule.field]: original};
                if (Object.keys(params).filter(key => params[key] !== original[key]).length === 0) return true;
            }

            return Axios
                .get(unique.url, {params: params})
                .then(t => Promise.resolve(unique.format ? unique.format(t) : t),
                    // t => throw new Error(`请求出错(${t})`));
                    t => Promise.reject(t));
            //TODO 不能再promise回调中抛出异常
        }
    },
    messages: {
        requires: 'one of {opts} is required',
        depend: '{field} depending on {opts.field} is required',
        unique: "{field} with value '{value}' already exists",
    },
};

function join(name) {
    return {
        validator(rule, value, callback, source, options) {
            let result = Rules.rules[name].apply(this, arguments);
            if (!(result instanceof Promise)) result = Promise.resolve(result);
            result.then(isValid => {
                if (isValid) return callback();
                let message = rule.message || options.messages[name] || Rules.messages[name];
                callback(new Error(Core.format(message, {field: rule.field, value: value, opts: rule[name]})));
            })
        },
    };
}

//join rule, supported message placeholder
Object.assign(Rules, {
    requires: {type: 'object', ...join('requires')},
    depend: join('depend'),
    unique: join('unique'),
});

//Simplified use
Object.assign(Rules, {
    simplified: {
        requires(names) {
            return {requires: names, ...Rules.requires};
        },
        depend(field, supplier) {
            supplier = supplier || (value => !Core.isEmpty(Core.getValue(value, field)));
            return {depend: {field: field, supplier}, ...Rules.depend};
        },
        unique(url, params, original, format = result => result) {
            return {unique: {url, params, original, format}, ...Rules.unique};
        }
    }
});

module.exports = Rules;