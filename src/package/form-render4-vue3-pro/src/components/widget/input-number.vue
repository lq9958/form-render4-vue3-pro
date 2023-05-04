<template>
  <a-input-number v-model="formData[filedName]" v-bind="attrs"></a-input-number>
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
  name: 'FormRenderInputNumber',
}
</script>
