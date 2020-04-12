// 断言库 chai.js
let Validator = require('async-validator');
let Rules = require('../src/async-validator');

let source = {
    goods: {name: 1, price: null, color: null}
};
let descriptor = {
    goods: {
        type: 'object', required: true,
        fields: {
            price: Rules.simplified.depend('name')
        }
    },
};

let validator = new Validator(descriptor);
let promise = validator.validate(source)
    .catch(options => {
        console.info('error:', options, options.fields)
    });

// // 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
// describe('Rules', function () {
//     it('requires', () => {
//         promise.catch(({errors, fields}) => {
//             expect(errors).to.equal([]);
//         });
//     });
// });
