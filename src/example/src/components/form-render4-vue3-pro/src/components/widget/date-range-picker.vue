<template>
  <a-range-picker
    v-model="formData[filedName]"
    v-bind="attrs"
    :style="{
      width: '100%',
    }"
  ></a-range-picker>
</template>

<script setup>
import { inject, reactive } from 'vue'

const formData = inject('form-render-data')
const props = defineProps({
  schema: Object,
})

const schema = reactive(props.schema)
const filedName = schema.field
const attrs = schema.props || {}
</script>

<script>
export default {
  name: 'FormRenderDateRangePicker',
}
</script>
