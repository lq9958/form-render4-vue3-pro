<template>
  <a-select v-model="formData[filedName]" v-bind="attrs">
    <a-option
      v-for="(item, index) in options"
      :key="index"
      :label="item[optionLabel]"
      :value="item[optionValue]"
    ></a-option>
  </a-select>
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
  optionData,
  setOptions,
  options,
  optionLabel,
  optionValue,
  globalSchema,
} = useOptionData(schema)

const filedName = ref(schema.field)

setOptions()
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
