import { TransformData } from 'ra-core';

/**
 * 串联多个 TransformData 最终返回一个
 *
 * 例如：
 * ```
 * TransformDataReducer([(data) => data, (data) => ({name: `${data.name}和李四`})])({name: '张三'}) = {name: '张三和李四'}
 * ```
 *
 * @param transformDataArray TransformData 数组
 * @return TransformData 对象
 * @since 0.0.1
 */
export function TransformDataReducer(
  transformDataArray: Array<TransformData>
): TransformData {
  return data => {
    for (let transformDataArrayElement of transformDataArray) {
      if (data instanceof Promise) {
        data = data.then(value => transformDataArrayElement(value));
      } else {
        data = transformDataArrayElement(data);
      }
    }
    return data;
  };
}
