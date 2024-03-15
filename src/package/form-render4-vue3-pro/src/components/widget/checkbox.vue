<template>
  <a-checkbox-group v-model="formData[filedName]" v-bind="attrs">
    <a-checkbox
      v-for="item in options"
      :key="getKey(item)"
      :value="getValue(item)"
      :label="getLabel(item)"
      >{{ getLabel(item) }}</a-checkbox
    >
  </a-checkbox-group>
</template>

<script setup>
import { inject, ref, onMounted, reactive, watch } from 'vue'
import useOptionData from '../hooks'

const props = defineProps({
  schema: Object,
})
const schema = reactive(props.schema)

const formData = inject('form-render-data')
const { optionData, getOptions, options, getKey, getLabel, getValue } =
  useOptionData(schema)

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
  name: 'FormRenderRadio',
}
</script>
