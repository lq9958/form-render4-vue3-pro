<template>
  <a-select v-model="formData[`${filedName}`]" v-bind="attrs">
    <a-option
      v-for="item in options"
      :key="getKey(item)"
      :label="getLabel(item)"
      :value="getValue(item)"
    ></a-option>
  </a-select>
</template>

<script setup>
import { inject, ref, onMounted, reactive, watch } from 'vue'
import useOptionData from '../hooks'

const props = defineProps({
  schema: Object,
})
const schema = reactive(props.schema)

const { optionData, getOptions, options, getKey, getLabel, getValue } =
  useOptionData(schema)
const formData = inject('form-render-data')

const filedName = ref(schema.field)

onMounted(() => {
  getOptions()
})

watch(optionData, () => {
  getOptions()
})

const attrs = schema.props || {}
</script>

<script>
export default {
  name: 'FormRenderSelect',
}
</script>
