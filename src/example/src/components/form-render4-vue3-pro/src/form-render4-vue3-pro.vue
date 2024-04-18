<template>
  <div class="form-render">
    <a-form
      ref="formInstance"
      :model="formData"
      v-bind="formProps"
      :style="schema.props.layout === 'inline' ? { display: 'block' } : {}"
    >
      <a-row :gutter="gutter">
        <template v-for="field in fields" :key="field.field">
          <a-col :span="computedSpan(field)" v-if="shouldDisplay(field)">
            <div v-if="haveSolt(field)" class="form-render-item">
              <a-form-item
                :field="field.field"
                :label="field.title"
                v-bind="field.config || {}"
              >
                <slot :name="field.field" :data="formData"> </slot>
              </a-form-item>
            </div>
            <form-render-item v-else :schema="field" />
          </a-col>
        </template>

        <a-col :span="24 / column">
          <a-form-item no-style>
            <div class="submit_group_btn" v-if="haveSolt({ field: 'footer' })">
              <slot name="footer"></slot>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup>
import { watch, ref, provide, reactive, useSlots, computed } from 'vue'
import FormRenderItem from './components/form-render-item.vue'

const slots = useSlots()
const props = defineProps({
  modelValue: { type: Object },
  schema: { type: Object },
  optionData: { type: Object },
})
console.log(props)
const formData = reactive(props.modelValue)
const schema = reactive(props.schema)
watch(formData, (val) => {
  emit('update:modelValue', val)
})
provide('form-render-data', formData)
provide('form-render-schema', schema)
provide('form-render-option-data', props.optionData || {})
const emit = defineEmits(['update:modelValue'])

const fields = ref(schema.fields)
const formProps = ref(schema.props)
// fix: 修复schema无clomun属性时无法渲染表单的问题
const column = ref(schema.column || 1)

// @since 2.0.0 新增guuter属性，用于控制表单栅栏间隔
const gutter = ref(schema.gutter || 8)
watch(
  () => props.schema,
  (newVal) => {
    fields.value = newVal.fields
    formProps.value = newVal.props
  },
)

const formInstance = ref(null)
const validate = () => {
  return new Promise((resolve, reject) => {
    if (formInstance.value) {
      formInstance.value.validate((err) => {
        if (!err) {
          resolve(true)
        } else {
          reject(err)
        }
      })
    }
  })
}

const computedSpan = (field) => {
  // 如果schema没有column属性，或者column属性值为0时，则使用filed的span值
  const useSpan = !Object.hasOwn(schema, 'column') || schema.column === 0
  return useSpan ? field.span || 24 : 24 / schema.column
}

const reset = (fieldlist) => {
  // eslint-disable-next-line no-unused-expressions
  formInstance.value && formInstance.value.resetFields(fieldlist)
}

const haveSolt = (schema) => {
  if (!slots) return false
  return schema.field in slots
}

// feat: schema 新增show字段方便更加灵活控制表单项的渲染
const shouldDisplay = (schema) => {
  if (Object.prototype.hasOwnProperty.call(schema, 'show')) {
    return schema.show
  }
  return true
}

defineExpose({
  validate,
  reset,
})
</script>

<script>
export default {
  name: 'FormRender4Vue3Pro',
}
</script>

<style scoped>
.form-render {
  width: 100%;
}
.submit_group_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
