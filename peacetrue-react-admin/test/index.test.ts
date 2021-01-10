import { TransformDataReducer } from '../src';

describe('index', () => {
  it('TransformDataBuilder', () => {
    let noChange = (data: any) => data;
    let transformData = TransformDataReducer([noChange]);

    let data = { name: '张三' };
    expect(transformData(data)).toEqual(data);

    let append = (data: any) => ({ name: `${data.name}和李四` });
    transformData = TransformDataReducer([noChange, append]);
    expect(transformData(data)).toEqual({ name: '张三和李四' });

    let promise = (data: any) => Promise.resolve(data);
    transformData = TransformDataReducer([noChange, append, promise]);
    transformData(data).then((value: any) => {
      expect(value).toEqual({ name: '张三和李四' });
    });

    transformData = TransformDataReducer([noChange, append, promise, noChange]);
    transformData(data).then((value: any) => {
      expect(value).toEqual({ name: '张三和李四' });
    });

    data = TransformDataReducer([
      data => data,
      data => ({ name: `${data.name}和李四` }),
    ])({ name: '张三' }); //={name: '张三和李四'}
    expect(data).toEqual({ name: '张三和李四' });
  });
});
