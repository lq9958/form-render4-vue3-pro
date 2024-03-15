<template>
  <a-transfer
    v-model="formData[filedName]"
    :data="options"
    v-bind="attrs"
    :style="{
      width: '100%',
    }"
  ></a-transfer>
</template>

<script setup>
import { inject, reactive, watch, onMounted } from 'vue'
import useOptionData from '../hooks'

// 获取options
const props = defineProps({
  schema: Object,
})
const schema = reactive(props.schema)

const formData = inject('form-render-data')
const { optionData, getOptions, options } = useOptionData(schema)

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
  name: 'FormRenderTransfer',
}
</script>
