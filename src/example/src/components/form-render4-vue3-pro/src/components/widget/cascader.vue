<template>
  <a-cascader
    v-model="formData[filedName]"
    :options="options"
    v-bind="attrs"
    :style="{
      width: '100%',
    }"
  ></a-cascader>
</template>

<script setup>
import { inject, reactive, watch, onMounted } from 'vue'
import useOptionData from '../hooks'

const props = defineProps({
  schema: Object,
})
const schema = reactive(props.schema)

const { optionData, getOptions, options } = useOptionData(schema)
const formData = inject('form-render-data')

const filedName = schema.field
const attrs = schema.props || {}

onMounted(() => {
  getOptions()
})

watch(optionData, () => {
  getOptions()
})
</script>

<script>
export default {
  name: 'FormRenderCascader',
}
</script>
