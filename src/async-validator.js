let Core = require('./core');

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
        }
    },
    messages: {
        requires: 'one of {opts} is required',
        depend: '{field} depending on {opts.field} is required',
    },
};

function join(name) {
    return {
        validator(rule, value, callback, source, options) {
            let valid = Rules.rules[name].apply(this, arguments);
            let error = undefined;
            if (!valid) {
                let message = rule.message || options.messages[name] || Rules.messages[name];
                let opts = rule[name];
                error = new Error(Core.format(message, {field: rule.field, opts: opts}));
            }
            callback(error);
        },
    };
}

//join rule, supported message placeholder
Object.assign(Rules, {
    requires: {type: 'object', ...join('requires')},
    depend: join('depend')
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
        }
    }
});

module.exports = Rules;