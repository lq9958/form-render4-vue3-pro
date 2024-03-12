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
import { inject, ref, onMounted, computed, reactive, watch } from 'vue'

const formData = inject('form-render-data')
const optionData = inject('form-render-option-data')
const props = defineProps({
  schema: Object,
})

const schema = reactive(props.schema)
const filedName = ref(schema.field)

const options = ref(null)
const haveExtraData = computed(() => {
  return !!optionData[schema.field]
})

const getOptions = () => {
  if (!haveExtraData.value) {
    if (!schema.data) {
      console.warn(
        '[Form-Render4-Vue3-Pro]: select component must provide a option list.'
      )
    } else {
      options.value = schema.data.list
    }
  } else if (optionData[schema.field].list) {
    options.value = optionData[schema.field].list
  } else {
    console.warn(
      '[Form-Render4-Vue3-Pro]: select component must provide a option list.'
    )
  }
}
onMounted(() => {
  getOptions()
})

watch(optionData, () => {
  getOptions()
})

// 组件首先尝试使用额外的数据源中提供的label、value和key来获取值
// 如果未提供，会尝试在schema中查找 data字段中的label、value和key的值
// 如果数据中均未提供label、value和key组件将抛出异常
const getLabel = (option) => {
  if (!haveExtraData.value) {
    if (schema.data.label) {
      return option[schema.data.label]
    }
    if (option.label) return option.label
    console.warn(
      '[Form-Render4-Vue3-Pro]: You must provide a `label` property to get label.'
    )
  } else {
    const lablKey = optionData[schema.field].label
    if (lablKey) {
      return option[lablKey]
    }
    // eslint-disable-next-line no-prototype-builtins
    if (option.hasOwnProperty('label')) {
      return option.label
    }
    console.warn(
      '[Form-Render4-Vue3-Pro]: You must provide a `label` property to get label.'
    )
  }
}

const getValue = (option) => {
  if (!haveExtraData.value) {
    if (schema.data.value) {
      return option[schema.data.value]
    }
    if (option.value) return option.value
    console.warn(
      '[Form-Render4-Vue3-Pro]: You must provide a `value` property to get value.'
    )
  } else {
    const valueKey = optionData[schema.field].value
    if (valueKey) {
      return option[valueKey]
    }
    // eslint-disable-next-line no-prototype-builtins
    if (option.hasOwnProperty('value')) {
      return option.value
    }
    console.warn(
      '[Form-Render4-Vue3-Pro]: You must provide a `value` property to get value.'
    )
  }
}

const getKey = (option) => {
  if (!haveExtraData.value) {
    if (schema.data.key) {
      return option[schema.data.key]
    }
    // eslint-disable-next-line no-prototype-builtins
    if (option.hasOwnProperty('id')) return 'id'
    console.warn(
      '[Form-Render4-Vue3-Pro]: You must provide a `key` property to get value.'
    )
  } else if (optionData[schema.field].key) {
    return optionData[schema.field].key
  } else if (option.id) return 'id'
  else
    console.warn(
      '[Form-Render4-Vue3-Pro]: You must provide a `key` property to get value.'
    )
}

const attrs = schema.props || {}
</script>

<script>
export default {
  name: 'FormRenderSelect',
}
</script>
