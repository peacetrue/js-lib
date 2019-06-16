// 断言库 chai.js
let expect = require('chai').expect;
let Core = require('../src/core');

// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('Core.getType', function () {
    it('undefined', () => {
        expect(Core.getType(undefined)).to.equal('undefined');
    });
    it('null', () => {
        expect(Core.getType(null)).to.equal('null');
    });

    it('boolean', () => {
        expect(Core.getType(true)).to.equal('boolean');
        expect(Core.getType(new Boolean(true))).to.equal('boolean');
    });

    it('number', () => {
        expect(Core.getType(1)).to.equal('number');
        expect(Core.getType(new Number(1))).to.equal('number');
    });

    it('bigint-primitive', () => {
        expect(Core.getType(9007199254740992n)).to.equal('bigint');
    });

    //TODO how to handle bigint in number
    // it('bigint-wrapper', () => {
    //     expect(Core.getType(new Number(9007199254740992n))).to.equal('bigint');
    // });

    it('string', () => {
        expect(Core.getType('')).to.equal('string');
        expect(Core.getType(new String(''))).to.equal('string');
    });

    it('symbol', () => {
        expect(Core.getType(Symbol('22'))).to.equal('symbol');
    });

    it('function', () => {
        expect(Core.getType(function () {})).to.equal('function');
        expect((function(){}) instanceof Function).to.equal(true);
    });
});


// // 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
// describe('isPrimitiveOrWrapper', function () {
//     it('string primitive', () => {
//         expect(Core.isPrimitiveOrWrapper('')).to.equal(true);
//     });
//     it('string wrapper', () => {
//         expect(Core.isPrimitiveOrWrapper(new String(''))).to.equal(true);
//     });
// });

