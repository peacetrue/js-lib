let expect = require('chai').expect;
let PeaceObject = require('../src/object');

let user = {
    name: 'mi',
    password: '123',
    roles: [
        {name: 'admin'}
    ]
};
PeaceObject.walkTree({
    name: 'mi',
    password: '123',
    roles: [
        {name: 'admin'}
    ]
}, PeaceObject.CONSOLE_VISITOR);
// describe('PeaceObject.walkTree', function () {
//     let user = {
//         name: 'mi',
//         password: '123',
//         roles: [
//             {name: 'admin'}
//         ]
//     };
//
//     it('with array', () => {
//         expect(new PropertyPath('roles', 0, 'name').toString()).to.equal('roles[0].name');
//     });
// });

