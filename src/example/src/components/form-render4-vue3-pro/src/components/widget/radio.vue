<template>
  <a-radio-group v-model="formData[filedName]" v-bind="attrs">
    <a-radio
      v-for="(item, index) in options"
      :key="index"
      :value="item[optionValue]"
      :label="item[optionLabel]"
    >
      {{ item[optionLabel] }}
    </a-radio>
  </a-radio-group>
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
const formData = inject('form-render-data')
const attrs = schema.props || {}

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
emitter.on(`${filedName.value}`, () => {
  options.value = reactive([
    {
      value: 'song',
      label: '唱111',
    },
    {
      value: 'dance',
      label: '跳222',
    },
    {
      value: 'rap',
      label: 'rap333',
    },
    {
      value: 'basketball',
      label: '篮球444',
    },
  ])
})
watch(optionData, () => {
  setOptions()
})

composeWatcher(filedName.value, schema.watcher, globalSchema, formData)
</script>

<script>
export default {
  name: 'FormRenderRadio',
}
</script>
