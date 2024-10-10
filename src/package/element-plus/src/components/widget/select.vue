<template>
  <el-select v-model="formData[filedName]" v-bind="attrs">
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item[optionLabel]"
      :value="item[optionValue]"
    ></el-option>
  </el-select>
</template>

<script setup>
import { inject, ref, reactive, watch } from 'vue'
import useOptionData from '../hooks'
import { getEventBus } from '../../utils/eventemitter'
import { composeWatcher } from '../../utils/watcher'

const emitter = getEventBus()
const props = defineProps({
  schema: Object,
})
const schema = reactive(props.schema)
const attrs = schema.props || {}

const formData = inject('form-render-data')
const {
  setOptions,
  optionData,
  options,
  optionLabel,
  optionValue,
  globalSchema,
} = useOptionData(schema)

const filedName = ref(schema.field)
setOptions()

emitter.on(`${filedName.value}`, () => {
  formData[filedName.value] = ''
  setOptions()
})
watch(optionData, () => {
  setOptions()
})
composeWatcher(filedName.value, schema.watcher, globalSchema, formData)
</script>

<script>
export default {
  name: 'FormRenderSelect',
}
</script>
