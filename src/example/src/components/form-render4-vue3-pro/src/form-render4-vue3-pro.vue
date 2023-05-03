<template>
  <div class="form-render">
    <a-form ref="formInstance" :model="formData" v-bind="formProps">
      <form-render-item
        v-for="filed in fields"
        :schema="filed"
        :form-data="formData"
        :key="filed.field"
      ></form-render-item>
      <a-form-item no-style>
        <slot name="footer"></slot>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { watch, ref, provide, reactive, nextTick } from 'vue'
import FormRenderItem from './components/form-render-item.vue'

const props = defineProps({
  modelValue: Object,
  schema: Object,
  optionData: Object,
})

const formData = props.modelValue
provide('form-render-data', formData)
provide('form-render-option-data', props.optionData || {})
const emit = defineEmits(['update:modelValue'])

const schema = reactive(props.schema)
const fields = ref(schema.fields)
const formProps = ref(schema.props)
watch(
  () => props.schema,
  (newVal) => {
    fields.value = newVal.fields
    formProps.value = newVal.props
  }
)

watch(formData, (val) => {
  emit('update:modelValue', val)
})

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

const reset = () => {
  formInstance.value && formInstance.value.resetFields()
}

defineExpose({
  validate,
  reset,
})
</script>

<script>
export default {
  name: 'FormRender',
}
</script>

<style scoped>
.form-render {
  width: 100%;
}
</style>
