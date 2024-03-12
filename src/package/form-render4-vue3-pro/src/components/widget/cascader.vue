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
import { inject, reactive, watch, ref, computed, onMounted } from 'vue'

// 获取options
const formData = inject('form-render-data')
const optionData = inject('form-render-option-data')
const props = defineProps({
  schema: Object,
})

const schema = reactive(props.schema)
const filedName = schema.field
const attrs = schema.props || {}

const options = ref(null)
const haveExtraData = computed(() => {
  return !!optionData[schema.field]
})

const getOptions = () => {
  if (!haveExtraData.value) {
    if (!schema.data) {
      console.warn(
        '[Form-Render4-Vue3-Pro]: tree select component must provide a option list.'
      )
    } else {
      options.value = schema.data.list
    }
  } else if (optionData[schema.field].list) {
    options.value = optionData[schema.field].list
  } else {
    console.warn(
      '[Form-Render4-Vue3-Pro]: tree select component must provide a option list.'
    )
  }
}
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
