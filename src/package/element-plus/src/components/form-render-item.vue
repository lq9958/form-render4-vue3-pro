<template>
  <div class="form-render-item" style="width: 100%">
    <!-- 表单项外元素 -->
    <component
      v-if="noWrapper.includes(type) && isShowFormItem(schema)"
      :is="componentMap[type]"
      :schema="schema"
    />
    <!-- 表单项 -->
    <el-form-item
      v-else
      :style="{width: '100%'}"
      :prop="schema.field"
      :label="schema.title"
      v-bind="schema.config || {}"
    >
      <template v-if="haveSlot(schema)">
        <slot  :name="schema.field" :data="formData"/>
      </template>
      <component v-else :is="componentMap[type]" :schema="schema" />
    </el-form-item>
  </div>
</template>

<script setup>
import { computed, reactive, ref, inject,useSlots } from 'vue'
// fix: 表单渲染白屏问题
import FormRenderInput from './widget/input.vue'
import FormRenderInputNumber from './widget/input-number.vue'
import FormRenderSelect from './widget/select.vue'
import FormRenderSlider from './widget/slider.vue'
import FormRenderCheckbox from './widget/checkbox.vue'
import FormRenderRadio from './widget/radio.vue'
import FormRenderRate from './widget/rate.vue'
import FormRenderSwitch from './widget/switch.vue'
// @since 2.0.0 新增内置组件
import FormRenderCascader from './widget/cascader.vue'
import FormRenderDatePicker from './widget/datepicker.vue'
import FormRenderTreeSelect from './widget/tree-select.vue'
import FormRenderTimePicker from './widget/timepicker.vue'
import FormRenderTransfer from './widget/transfer.vue'
import FormRenderDivider from './widget/divider.vue'
import FormRenderAlert from './widget/alert.vue'
import FormRenderColorPicker from './widget/color-picker.vue'
import FormRenderTimeSelect from './widget/time-select.vue'

const slots = useSlots()
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
  cascader: FormRenderCascader,
  'date-picker': FormRenderDatePicker,
  'tree-select': FormRenderTreeSelect,
  'time-picker': FormRenderTimePicker,
  transfer: FormRenderTransfer,
  divider: FormRenderDivider,
  alert: FormRenderAlert,
  'color-picker': FormRenderColorPicker,
  'time-select': FormRenderTimeSelect,
}

const props = defineProps({
  schema: Object,
})

// const globalSchema = inject('form-render-schema')
const formData = inject('form-render-data');
const schema = reactive(props.schema)

const type = computed(() => schema.type)

const isShowFormItem = (schema) => {
  if (!Object.hasOwn(schema, 'show')) {
    return true
  } else {
    return schema.show
  }
}

const haveSlot = (schema) => {
  if (!slots) return false
  console.log(schema,slots,schema.field in slots)
  return schema.field in slots
}

</script>

<script>
export default {
  name: 'FormRenderItem',
}
</script>
