import { convertPropertyValue, fromArray, fromArrayPair, values } from '../src';

describe('object', () => {
  it('values', () => {
    expect(
      values({ name: '张三', sex: '男', age: 18 }, ['age', 'name'])
    ).toEqual([18, '张三']);
  });

  it('fromArray', () => {
    expect(fromArray(['name', 'sex', 'age'], true)).toEqual({
      name: true,
      sex: true,
      age: true,
    });
  });

  it('fromArrayPair', () => {
    expect(fromArrayPair(['name', 'sex', 'age'], ['张三', '男', 18])).toEqual({
      name: '张三',
      sex: '男',
      age: 18,
    });
  });

  it('convertPropertyValue', () => {
    /* tslint:disable:no-unused-variable */
    expect(
      convertPropertyValue(
        { name: '张三', sex: '男', age: 18 },
        (name, value) => name.toString() + value
      )
    ).toEqual({
      name: 'name张三',
      sex: 'sex男',
      age: 'age18',
    });
  });
});
