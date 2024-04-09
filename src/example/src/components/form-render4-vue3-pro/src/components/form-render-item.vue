<template>
  <!-- 表单项外元素 -->
  <component
    v-if="noWrapper.includes(type) && isShowFormItem(schema)"
    :is="componentMap[type]"
    :schema="schema"
  />
  <!-- 表单项 -->
  <a-form-item
    :field="schema.field"
    :label="schema.title"
    v-bind="schema.config || {}"
    v-else-if="isShowFormItem(schema)"
  >
    <div v-if="isFormItem">
      <a-row :gutter="gutter">
        <a-col
          v-for="child in children"
          :key="child.field"
          :span="getSpan(child)"
        >
          <form-render-item :schema="child"></form-render-item>
        </a-col>
      </a-row>
    </div>
    <component v-else :is="componentMap[type]" :schema="schema" />
  </a-form-item>
</template>

<script setup>
import { computed, reactive, ref, inject } from 'vue'
// fix: 表单渲染白屏问题
import FormRenderInput from './widget/input.vue'
import FormRenderInputNumber from './widget/input-number.vue'
import FormRenderSelect from './widget/select.vue'
import FormRenderSlider from './widget/slider.vue'
import FormRenderCheckbox from './widget/checkbox.vue'
import FormRenderRadio from './widget/radio.vue'
import FormRenderRate from './widget/rate.vue'
import FormRenderSwitch from './widget/switch.vue'
import FormRenderTextarea from './widget/textarea.vue'
// @since 2.0.0 新增内置组件
import FormRenderCascader from './widget/cascader.vue'
import FormRenderDatePicker from './widget/datepicker.vue'
import FormRenderDateRangePicker from './widget/date-range-picker.vue'
import FormRenderVerificationCode from './widget/verification-code.vue'
import FormRenderTreeSelect from './widget/tree-select.vue'
import FormRenderTimePicker from './widget/timepicker.vue'
import FormRenderUpload from './widget/upload.vue'
import FormRenderTransfer from './widget/transfer.vue'
import FormRenderDivider from './widget/divider.vue'
import FormRenderAlert from './widget/alert.vue'
import FormRenderColorPicker from './widget/color-picker.vue'

import { is } from '../utils/index.js'
// 不需要使用a-form-item包裹的组件列表
const noWrapper = ['divider', 'alert']
const componentMap = {
  input: FormRenderInput,
  'input-number': FormRenderInputNumber,
  select: FormRenderSelect,
  slider: FormRenderSlider,
  checkbox: FormRenderCheckbox,
  radio: FormRenderRadio,
  rate: FormRenderRate,
  switch: FormRenderSwitch,
  textarea: FormRenderTextarea,
  cascader: FormRenderCascader,
  'date-picker': FormRenderDatePicker,
  'date-range-picker': FormRenderDateRangePicker,
  'verification-code': FormRenderVerificationCode,
  'tree-select': FormRenderTreeSelect,
  'time-picker': FormRenderTimePicker,
  upload: FormRenderUpload,
  transfer: FormRenderTransfer,
  divider: FormRenderDivider,
  alert: FormRenderAlert,
  'color-picker': FormRenderColorPicker,
}

const props = defineProps({
  schema: Object,
})
const globalSchema = inject('form-render-schema')
const schema = reactive(props.schema)

// @since 2.0.0 新增guuter属性，用于控制表单栅栏间隔
const gutter = ref(schema.gutter || globalSchema.gutter || 8)
const type = ref(schema.type)

const isFormItem = computed(() => schema.type === 'form-item')
const getSpan = (child) => {
  // 如果当前表单项是form-item，则取子项的span值
  if (isFormItem.value) {
    if (is(child.span) === 'number') {
      return child.span
    } else {
      console.warn(
        `[Form-Render4-Vue3-Pro]: field '${
          child.field
        }' attribute 'span' value type must be number, but get a ${is(
          child.span
        )}.`
      )
    }
  }
  return 24
}

const isShowFormItem = (schema) => {
  if (!Object.hasOwn(schema, 'show')) {
    return true
  } else {
    return schema.show
  }
}

const children = isFormItem.value ? schema.children : []
</script>

<script>
export default {
  name: 'FormRenderItem',
}
</script>
