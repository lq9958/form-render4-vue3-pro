## v1.3.0 (2023-08-23)
### ❗❗Break Change（Important）❗❗
- 😅自v1.3.0起，组件不再支持在Schema中装载数据，数据和表单配置完全分离。

### Bug Fix
- 🐛 修复option-data中未提供label,value字段时报错的问题

## v1.2.7 (2023-08-22)

### Feature
- 🍬新增清除校验规则方法

## v1.2.4 (2023-06-15)

### Feature
- 🍬`schema`新增`show`属性，可以更加灵活的控制表单项的渲染

### Bug Fix

- 🐛 修复表单初次渲染时form-item渲染缓慢导致白屏的问题


## v1.2.3 (2023-05-12)

### Feature
- 🍬更新组件中的错误提示，提示更加人性化


## v1.2.2 (2023-05-10)

### Bug Fix

- 🐛 修复watch监听无响应的问题


## v1.2.1 (2023-05-10)

### Bug Fix
- 🐛 修复option-data数据变化时，组件无响应的问题

## v1.2.0 (2023-05-10)

### Bug Fix

- 🐛 修复 schema 中无 column 字段时无法渲染表单的问题
- 🐛 修复 input 组件显示异常的问题

### Feature

- 🍬 使用 span 代替 form-item schema 中 column 字段
