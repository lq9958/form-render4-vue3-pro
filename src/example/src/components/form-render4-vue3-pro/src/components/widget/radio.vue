<template>
  <a-radio-group v-model="formData[filedName]" v-bind="attrs">
    <a-radio
      v-for="item in options"
      :value="getValue(item)"
      :label="getLabel(item)"
      :key="getKey(item)"
      >{{ getLabel(item) }}</a-radio
    >
  </a-radio-group>
</template>

<script setup>
import { inject, ref, onMounted, computed } from 'vue'

const formData = inject('form-render-data')
const optionData = inject('form-render-option-data')
const props = defineProps({
  schema: Object,
})

const { schema } = props
const filedName = ref(schema.field)

const options = ref(null)
const haveExtraData = computed(() => {
  return !!optionData[schema.field]
})

const getOptions = () => {
  if (!haveExtraData.value) {
    if (!schema.data) {
      throw new Error(
        '[Form-Render4-Vue3-Pro]: radio component must provide a option list.'
      )
    } else {
      options.value = schema.data.list
    }
  } else {
    if (optionData[schema.field].list) {
      options.value = optionData[schema.field].list
    } else {
      throw new Error(
        '[Form-Render4-Vue3-Pro]: radio component must provide a option list.'
      )
    }
  }
}
onMounted(() => {
  getOptions()
})

// 组件首先尝试使用额外的数据源中提供的label、value和key来获取值
// 如果未提供，会尝试在schema中查找 data字段中的label、value和key的值
// 如果数据中均未提供label、value和key组件将抛出异常
const getLabel = (option) => {
  if (!haveExtraData.value) {
    if (schema.data.label) {
      return option[schema.data.label]
    } else {
      if (option.label) return option.label
      else
        throw new Error(
          '[Form-Render4-Vue3-Pro]: You must provide a `label` property to get label.'
        )
    }
  } else {
    const lablKey = optionData[schema.field].label
    if (lablKey) {
      return option[lablKey]
    } else {
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `label` property to get label.'
      )
    }
  }
}

const getValue = (option) => {
  if (!haveExtraData.value) {
    if (schema.data.value) {
      return option[schema.data.value]
    } else {
      if (option.value) return option.value
      else
        throw new Error(
          '[Form-Render4-Vue3-Pro]: You must provide a `value` property to get value.'
        )
    }
  } else {
    const valueKey = optionData[schema.field].value
    if (valueKey) {
      return option[valueKey]
    } else {
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `value` property to get value.'
      )
    }
  }
}

const getKey = (option) => {
  if (!haveExtraData.value) {
    if (schema.data.key) {
      return option[schema.data.key]
    } else {
      if (option.id) return 'id'
      else
        throw new Error(
          '[Form-Render4-Vue3-Pro]: You must provide a `key` property to get value.'
        )
    }
  } else {
    if (optionData[schema.field].key) {
      return optionData[schema.field].key
    } else {
      if (option.id) return 'id'
      else
        throw new Error(
          '[Form-Render4-Vue3-Pro]: You must provide a `key` property to get value.'
        )
    }
  }
}

const attrs = schema.props || {}
</script>

<script>
export default {
  name: "FormRenderRadio",
};
</script>