/**
 * 从对象中获取指定属性数组的值，属性值数组排列顺序与指定属性排列顺序相同
 *
 * 例如：
 * ```typescript
 * values({name: '张三', sex: '男', age: 18}, ['age', 'name']) = [18, '张三'];
 * ```
 *
 * @param object 想要获取哪个对象的属性值
 * @param propertyNames 想要获取哪些属性的值
 * @return 想要的属性值数组
 * @since 0.0.1
 */
export function values(
  object: Record<string, any>,
  propertyNames: Array<string>
): Array<any> {
  return propertyNames.map(key => object[key]);
}

/**
 * 通过属性名数组和一个固定属性值构建对象
 *
 * 例如：
 * ```
 * fromArray(['name', 'sex', 'age'], true) = { name: true, sex: true, age: true, }
 * ```
 *
 * @param names 属性名数组
 * @param value 固定属性值
 * @return 想要构建的对象
 * @since 0.0.1
 */
export function fromArray(
  names: Array<string>,
  value: any
): Record<string, any> {
  return Object.fromEntries(names.map(name => [name, value]));
}

/**
 * 通过属性名数组和属性值数组构建对象
 *
 * //TODO 此方法名尚未能准确表达含义，力求简洁
 *
 * 例如：
 * ```
 * fromArrayPair(['name', 'sex', 'age'], ['张三', '男', 18]) = {name: '张三', sex: '男', age: 18}
 * ```
 *
 * @param names 属性名数组
 * @param values 属性值数组
 * @return 想要构建的对象
 * @since 0.0.1
 */
export function fromArrayPair(
  names: Array<string>,
  values: Array<any>
): Record<string, any> {
  return Object.fromEntries(names.map((name, index) => [name, values[index]]));
}

export type PropertyNameType = keyof any;

/**
 * 转换属性值
 *
 * 例如：
 * ```
 * convertPropertyValue({name: '张三', sex: '男', age: 18}, (name, value) => name + value) = {name: 'name张三', sex: 'sex男', age: 'age18'}
 * ```
 *
 * @param data 待转换的对象
 * @param converter 转换器
 * @param matcher 匹配器
 * @return 转换后的对象
 * @since 0.0.1
 */
export function convertPropertyValue(
  data: Record<string, any>,
  converter: (name: string, value: any) => any,
  matcher: (name: string, value: any) => boolean = () => true
) {
  data = { ...data };
  for (let name in data) {
    if (!data.hasOwnProperty(name)) continue;
    let value = data[name];
    if (matcher(name, value)) data[name] = converter(name, value);
  }
  return data;
}
