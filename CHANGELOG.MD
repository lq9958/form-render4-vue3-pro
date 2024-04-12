## v3.0.3 (2024-04-12)

### Bug Fix

- 🐛 修复切换表单项显示状态时，出现幽灵元素的问题


## v3.0.1 (2024-04-09)

### Feature

- 🍬 新增颜色选择器组件


## v3.0.0 (2024-04-01)

### Feature

- 🍬 表单项新增`datasource`字段，用于表单异步数据的加载
- 🍬 表单项新增`watcher`字段，用于表单字段的联动，处理因字段值的变更导致其他字段的`隐藏`、`显示`、`启用`、`禁用`...等状态的变更，详情可前往`form-desiger`查看

## v2.2.0 (2024-03-22)

### Break Change

- 为方便可视化生成表单，嵌套表单的表单项不再从`children.item`中获取，而是直接取`children`的值作为嵌套表单的表单项。

## v2.1.3 (2024-03-20)

### Bug Fix

- 🐛 修复`alert`组件无法设置提示内容的问题。

## v2.1.2 (2024-03-18)

### Feature

- 新增 `alert`内置组件

## v2.1.0 (2024-03-15)

### Break Change

- 抽离表单项 props 中关于 `a-form-item`的配置字段至新增的`config`字段中，方便可视化配置。

## v2.0.1 (2024-03-15)

### Code Optimization

- 删除了内置组件中重复代码

### Feature

- 新增 `divider`内置组件，组件文本可在`props.content`字段中设置。
- 表单项可单独设置 span，当设置了表单 column 属性时，优先使用 column 作为表单项的 span，当表单不存在 column 或者 column 的值为 0 时，则使用表单项的 span 值。

## 🎊🎊🎊 v2.0.0 (2024-03-12)

### Feature

- 新增 `transfer`、`upload`、`time-picker`、`verification-code`、`tree-select`、`date-range-picker`、`date-picker`、`cascader`等 8 个内置组件
- 表单 schema 新增`gutter`字段，用以调整表单项之间的间隔

## v1.3.0 (2023-08-29)

## Style

- 🌼 调整组件 layout 为 inline 时，组件 item 的样式

## v1.3.0 (2023-08-23)

### ❗❗Break Change（Important）❗❗

- 😅 自 v1.3.0 起，组件不再支持在 Schema 中装载数据，数据和表单配置完全分离。

### Bug Fix

- 🐛 修复 option-data 中未提供 label,value 字段时报错的问题

## v1.2.7 (2023-08-22)

### Feature

- 🍬 新增清除校验规则方法

## v1.2.4 (2023-06-15)

### Feature

- 🍬`schema`新增`show`属性，可以更加灵活的控制表单项的渲染

### Bug Fix

- 🐛 修复表单初次渲染时 form-item 渲染缓慢导致白屏的问题

## v1.2.3 (2023-05-12)

### Feature

- 🍬 更新组件中的错误提示，提示更加人性化

## v1.2.2 (2023-05-10)

### Bug Fix

- 🐛 修复 watch 监听无响应的问题

## v1.2.1 (2023-05-10)

### Bug Fix

- 🐛 修复 option-data 数据变化时，组件无响应的问题

## v1.2.0 (2023-05-10)

### Bug Fix

- 🐛 修复 schema 中无 column 字段时无法渲染表单的问题
- 🐛 修复 input 组件显示异常的问题

### Feature

- 🍬 使用 span 代替 form-item schema 中 column 字段
