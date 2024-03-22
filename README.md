<p align="center"><a href="https://github.com/lq9958/form-render4-vue3-pro" target="_blank" rel="noopener noreferrer"><img width="150" src="https://s1.ax1x.com/2023/05/06/p9a7EZ9.png" alt="form-render4-vue3-pro logo"></a></p>

<h1 align="center">Form-Render4-Vue3-Pro</h1>

> form-render4-vue3-pro 是基于 vue3 + arco-design 的表单生成组件，组件包含了日常使用的表单组件，意在解决项目日常开发中表单代码重复书写的问题，提高开发效率。目前该项目还在增加更多的特性。

[在线演示](https://lq9958.github.io/)

## [💎 更新日志(v2.0.0 发布啦！！！)](./CHANGELOG.MD)

## 数据项说明

~~组件的 item 项目前的优先级为 optionData > schema.data 组件会优先在 optionData 中查找该字段的数据源。如果未提供，组件将尝试在 schema 的 data 字段中获取数据源，如果均为提供组件将会抛出异常。~~

自 v1.3.0 起，不再支持在 Schema 中装载数据，组件只会在 option-data 中查找需要的字段。

## 🌈 如何使用

### 安装

```
npm install form-render4-vue3-pro --save
```

```javascript
// main.js
import { createApp } from 'vue'
import FormRender4Vue3 from 'form-render4-vue3-pro'
import App from './App.vue'

const app = createApp(App)
app.use(FormRender4Vue3)
app.mount('#app')
```

```vue
<template>
  <!-- 你的组件 -->
  <form-render4-vue3-pro
    :schema="schema"
    v-model="formData"
    :option-data="optionData"
  />
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({})
const optionData = reactive({
  address: {
    list: [
      {
        label: '北京',
        value: 'beijing',
      },
      {
        label: '上海',
        value: 'shanghai',
      },
      {
        label: '深圳',
        value: 'shenzhen',
      },
      {
        label: '成都',
        value: 'chengdu',
      },
    ],
    key: 'value',
  },
})
const schema = reactive({
  props: {
    layout: 'horizontal',
    labelAlign: 'left',
  },
  fields: [
    {
      type: 'input',
      title: '姓名',
      field: 'name',
      value: '',
      props: {
        placeholder: '输入姓名',
      },
    },
    {
      type: 'select',
      title: '地址',
      field: 'address',
      value: '',
      props: {
        placeholder: '选择地址',
      },
    },
  ],
})
</script>
```

## API

### <from-render4-vue3> Props

| 参数名              | 类型   | 描述                                                                         | 是否必须 |
| ------------------- | ------ | ---------------------------------------------------------------------------- | -------- |
| modelValue(v-model) | Object | 表单数据对象                                                                 | Yes      |
| schema              | Object | 生成表单的 JSON 对象                                                         | Yes      |
| optionData          | Object | `select、checkbox、radio、tree-select、cascader、transfer`等组件选项的数据源 | No       |

### <from-render4-vue3> Methods

| 方法名        | 描述                 | 参数       | 返回值  |
| ------------- | -------------------- | ---------- | ------- |
| validate      | 校验表单全部数据     | -          | Promise |
| clearValidate | 清除校验表单校验数据 | -          | -       |
| reset         | 重置表单字段         | -/string[] | void    |

### <form-render4-vue3> Slots

| 插槽名 | 描述 | 参数 |     |
| ------ | ---- | ---- | --- |
| footer | 页脚 | -    | -   |

## Schema 字段描述

| 字段名称 | 类型   | Description                                | 是否必须 |
| -------- | ------ | ------------------------------------------ | -------- |
| fields   | Array  | 生成表单项的数组                           | Yes      |
| rules    | Object | 使用方式参考 arco-design from 表单 rules   | No       |
| props    | -      | 使用方式参考 arco-design from 表单原生属性 | No       |
| column   | Number | 生成表单项的列数                           | Yes      |
| gutter   | Number | 表单项之间的间隔                           | No       |

### fields 字段描述

| 字段名称 | 类型    | Description                                                                                            | 是否必须 |
| -------- | ------- | ------------------------------------------------------------------------------------------------------ | -------- |
| type     | String  | 指定生成对应 arco-design 的组件，对应关系见下表 type                                                   | Yes      |
| gutter   | Number  | 用与表单项之间的间隔 ，该项不设置会自动取全局的 gutter                                                 | No       |
| title    | String  | 表单项的名称                                                                                           | Yes      |
| field    | String  | 表单项绑定的字段                                                                                       | Yes      |
| value    | any     | 该表表单项的值                                                                                         | No       |
| props    | Object  | 生成最终组件的 props 项，对应 arco-design 组件的 props                                                 | No       |
| span     | Number  | 该表单项独占的栅格数（默认为 24）                                                                      | No       |
| show     | Boolean | 控制表单项显示与否，默认为：true                                                                       | No       |
| config   | Object  | `a-form-item`组件配置对象，字段参考[`a-form-item`](https://arco.design/vue/component/form#API)组件属性 | No       |
| children | Array   | 嵌套表单项                                                                                             | No       |

## 当前支持的组件

| type              | 对应的 arco-design 组件名        |
| ----------------- | -------------------------------- |
| form-item         | 表单项，复杂表单布局可能会使用到 |
| input             | a-input                          |
| input-number      | a-input-number                   |
| checkbox          | a-checkbox                       |
| radio             | a-radio                          |
| switch            | a-switch                         |
| slider            | a-slider                         |
| textarea          | a-textarea                       |
| rate              | a-rate                           |
| upload            | a-upload                         |
| time-picker       | a-time-picker                    |
| verification-code | a-verification-code              |
| tree-select       | a-tree-select                    |
| date-range-picker | a-date-range-picker              |
| date-picker       | a-date-picker                    |
| cascader          | a-cascader                       |
| transfer          | a-transfer                       |
| divider           | a-divider                        |
| alert             | a-alert                          |
