# Form-Render4-Vue3-Pro

> form-render4-vue3-pro 是基于 vue3 + arco-design 的表单生成组件，组件包含了日常使用的表单组件，意在解决项目日常开发中表单代码重复书写的问题，提高开发效率。目前该项目还在增加更多的特性。

[Playground](https://lq9958.github.io/)

## 新增特性

2023-5-6

- ✅ 新增自定义表单选项组件

---

- ✅ 支持 form-item 中的嵌套
- ✅ 数据项和 schema 分离

## 数据项说明

组件的 item 项目前的优先级为 optionData > schema.data 组件会优先在 optionData 中查找该字段的数据源。如果未提供，组件将尝试在 schema 的 data 字段中获取数据源，如果均为提供组件将会抛出异常。

## 如何使用

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
  <div>
    <form-render4-vue3
      :schema="schema"
      v-model="formData"
      :option-data="optionData"
    />
  </div>
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
    label: 'label',
    value: 'value',
  },
})
const schema = reactive({
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
      type: 'input',
      title: '年龄',
      field: 'age',
      value: '',
      props: {
        type: 'number',
        placeholder: '输入年龄',
      },
    },
    {
      type: 'number',
      title: '工作时长(年)',
      field: 'experience',
      value: '',
      props: {
        step: 0.5,
      },
    },
    {
      type: 'select',
      title: '现居地',
      field: 'address',
      value: '',
      props: {
        placeholder: '选择现居地',
      },
      data: {
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
        label: 'label',
        value: 'value',
      },
    },
    {
      type: 'radio',
      title: '性别',
      field: 'gender',
      value: '',
      data: {
        list: [
          {
            label: '男',
            value: 'man',
          },
          {
            label: '女',
            value: 'woman',
          },
          {
            label: '男女',
            value: 'woman&man',
          },
        ],
        label: 'label',
        value: 'value',
      },
    },
    {
      type: 'checkbox',
      title: '爱好',
      field: 'likes',
      value: '',
      data: {
        list: [
          {
            label: '唱',
            value: 'song',
          },
          {
            label: '跳',
            value: 'dance',
          },
          {
            label: 'rap',
            value: 'rap',
          },
          {
            label: '篮球',
            value: 'basketball',
          },
        ],
        label: 'label',
        value: 'value',
      },
    },
    {
      type: 'slider',
      title: '身高',
      field: 'height',
      value: '',
      props: {
        min: 100,
        max: 200,
      },
    },
    {
      type: 'switch',
      title: '信息公开',
      field: 'public',
      value: '',
    },
  ],
  props: {
    layout: 'horizontal',
    labelAlign: 'left',
  },
})
</script>
```

## Schema 字段描述

| 字段名称 | 类型   | Description                                | 是否必须 |
| -------- | ------ | ------------------------------------------ | -------- |
| fields   | Array  | 生成表单项的数组                           | Yes      |
| rules    | Object | 使用方式参考 arco-design from 表单 rules   | No       |
| props    | -      | 使用方式参考 arco-design from 表单原生属性 | No       |

### fields 字段描述

| 字段名称 | 类型   | Description                                                                | 是否必须 |
| -------- | ------ | -------------------------------------------------------------------------- | -------- |
| type     | String | 指定生成对应 arco-design 的组件，对应关系见下表 type                       | Yes      |
| title    | String | 表单项的名称                                                               | Yes      |
| field    | String | 表单项字段                                                                 | Yes      |
| value    | any    | 该表表单项的值                                                             | No       |
| props    | Object | 生成最终组件的 props 项，对应 arco-design 组件的 props                     | No       |
| data     | Object | 如果是生成下拉组件、多选框、单选时，提供该字段用于生成选项数据（不是必须） | No       |

## 当前支持的组件

| type         | 对应的 arco-design 组件名 |
| ------------ | ------------------------- |
| input        | a-input                   |
| input-number | a-input-number            |
| checkbox     | a-checkbox                |
| radio        | a-radio                   |
| switch       | a-switch                  |
| slider       | a-slider                  |
| textarea     | a-textarea                |
| rate         | a-rate                    |
| 拼命开发中   | ...                       |
