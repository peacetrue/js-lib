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
        expect(Core.getType(function () {
        })).to.equal('function');
        expect((function () {
        }) instanceof Function).to.equal(true);
    });
});

describe('Core.getValue', function () {
    let object = {roles: [{name: 'admin'}]};
    it('eval right', () => {
        expect(Core.getValue(object, 'roles[0].name')).to.equal('admin');
    });
    it('eval error', () => {
        expect(Core.getValue(object, 'roles[3].name')).to.equal(undefined);
    });
});


describe('Core.format', function () {
    it('array', () => {
        expect(Core.format('hi! {0} want do {1}', ['小明', '上学'])).to.equal('hi! 小明 want do 上学');
    });

    it('object', () => {
        expect(Core.format('hi! {name} want do {something}', {
            name: '小明',
            something: '上学'
        })).to.equal('hi! 小明 want do 上学');
    });

    it('object', () => {
        expect(Core.format('hi! {person.name} want do {person.something}', {
            person: {
                name: '小明',
                something: '上学'
            }
        })).to.equal('hi! 小明 want do 上学');
    });
});

describe('Core.pivotMatrix', function () {
    it('array', () => {
        let arr = [
            ["姓名", "年龄"],
            ["张三", 18],
            ["李四", 19],
        ];
        let exceptArr = [
            ["姓名", "张三", "李四"],
            ["年龄", 18, 19],
        ];
        expect(Core.pivotMatrix(arr)).to.equal(exceptArr);
    });
});
