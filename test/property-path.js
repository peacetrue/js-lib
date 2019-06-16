let expect = require('chai').expect;
let PropertyPath = require('../src/property-path');

describe('PropertyPath.toString', function () {
    it('with array', () => {
        expect(new PropertyPath('roles', 0, 'name').toString()).to.equal('roles[0].name');
    });
});

describe('PropertyPath.getValue', function () {
    let user = {
        name: 'mi',
        password: '123',
        roles: [
            {name: 'admin'}
        ]
    };
    it('with array', () => {
        expect(new PropertyPath('roles', 0, 'name').getValue(user)).to.equal(user.roles[0].name);
    });
});