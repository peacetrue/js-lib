# JavaScript 工具类库

虽然知道已经有很多工具类库，但还是决定自己造轮子，因为有时候查找使用比自己开发更麻烦。

API 接口文档参考。


## 问题

`tsdx lint` 时有一些错误：

```
1:9  error  Replace `fromArray,·values` with `·fromArray,·values·`  prettier/prettier
24:3  error  Delete `··`                                             prettier/prettier
25:1  error  Delete `··`                                             prettier/prettier
```

原因是 idea 的格式化使用 4 个空格做缩进，prettier 使用 2 个空格，调整配置将 prettier 的缩进改为 4 个空格。

