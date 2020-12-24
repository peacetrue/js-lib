import { fromArray, values } from './object';

/**
 * 将数组中的元素从数组转为对象
 *
 * 例如：
 * ```typescript
 * let persons = [
 * ['张三', 18],
 * ['李四', 19],
 * ];
 * elementToObject(persons, ['name', 'age']) =
 * [
 * {name: '张三', age: 18},
 * {name: '李四', age: 19},
 * ]
 * ```
 * @param rows 元素都是数组的数组
 * @param propertyNames 对象属性名数组
 * @return 元素都是对象的数组
 * @since 0.0.1
 */
export function elementToObject(
  rows: Array<Array<any>>,
  propertyNames: Array<string>
): Array<Record<string, any>> {
  return rows.map(row => fromArray(propertyNames, row));
}

/**
 * 将数组中的元素从对象转为数组
 *
 * 例如：
 * ```typescript
 * let persons = [
 * {name: '张三', age: 18},
 * {name: '李四', age: 19},
 * ];
 * elementToArray(persons, ['name', 'age']) =
 * [
 * ['张三', 18],
 * ['李四', 19],
 * ]
 * ```
 * @param rows 元素都是对象的数组
 * @param propertyNames 对象属性名数组
 * @return 元素都是数组的数组
 * @since 0.0.1
 */
export function elementToArray(
  rows: Array<Record<string, any>>,
  propertyNames: Array<string>
): Array<Array<any>> {
  return rows.map(row => values(row, propertyNames));
}

/**
 * 沿顶角翻转二维数组(表格)，通俗说成行列转换
 *
 * 例如：
 * ```typescript
 * let persons = [
 *  ['姓名', '年龄'],
 *  ['张三', 18],
 *  ['李四', 19],
 * ];
 * let pivotedPersons = [
 *  ['姓名', '张三', '李四'],
 *  ['年龄', 18, 19],
 * ];
 * pivotMatrix(persons) = pivotedPersons
 * ```
 * @param rows 二维数组
 * @return 翻转后的二维数组
 * @since 0.0.1
 */
export function pivotMatrix(rows: Array<Array<any>>): Array<Array<any>> {
  let pivotedRows: Array<Array<any>> = [];
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i];
    for (let j = 0; j < cells.length; j++) {
      if (!pivotedRows[j]) pivotedRows[j] = [];
      pivotedRows[j][i] = cells[j];
    }
  }
  return pivotedRows;
}
