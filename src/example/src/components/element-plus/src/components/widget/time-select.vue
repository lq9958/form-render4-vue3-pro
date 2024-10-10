<template>
  <el-time-select
    v-model="formData[filedName]"
    v-bind="attrs"
    :style="{
      width: '100%',
    }"
  ></el-time-select>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { composeWatcher } from '../../utils/watcher'
const formData = inject('form-render-data')
const globalSchema = inject('form-render-schema')
const props = defineProps({
  schema: Object,
})

const schema = reactive(props.schema)
const filedName = ref(schema.field)
const attrs = schema.props || {}

composeWatcher(filedName.value, schema.watcher, globalSchema, formData)
</script>

<script>
export default {
  name: 'FormRenderTimePicker',
}
</script>
