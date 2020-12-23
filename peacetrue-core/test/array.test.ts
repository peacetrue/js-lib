import { elementToArray, elementToObject, pivotMatrix } from '../src/array';

describe('array', () => {
  it('elementToObject', () => {
    let persons = [
      ['张三', 18],
      ['李四', 19],
    ];
    let exceptedPersons = [
      { name: '张三', age: 18 },
      { name: '李四', age: 19 },
    ];
    expect(elementToObject(persons, ['name', 'age'])).toEqual(exceptedPersons);
  });

  it('elementToArray', () => {
    let persons = [
      { name: '张三', age: 18 },
      { name: '李四', age: 19 },
    ];
    let exceptedPersons = [
      ['张三', 18],
      ['李四', 19],
    ];
    expect(elementToArray(persons, ['name', 'age'])).toEqual(exceptedPersons);
  });

  it('矩阵沿顶角翻转', () => {
    let persons = [
      ['姓名', '年龄'],
      ['张三', 18],
      ['李四', 19],
    ];
    let pivotedPersons = [
      ['姓名', '张三', '李四'],
      ['年龄', 18, 19],
    ];
    expect(pivotMatrix(persons)).toEqual(pivotedPersons);
  });
});
