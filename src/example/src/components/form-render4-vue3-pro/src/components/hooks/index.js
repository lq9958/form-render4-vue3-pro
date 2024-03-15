import { inject, computed, ref } from 'vue';

export default (schema) => {
  /**
 * 自1.3.0起，组件只会在option-data中查找需要的字段
 * 不再支持schema中装填数据
 *
 * 如果在option-data中未提供key
 * 组件会尝试使用option中的id字段作为key
 * 如果option中没有id字段组件将抛出警告
 *
 * 同理：value和label一样，未提供时会自动使用option中对应的字段
 * 如果option中没有组将抛出警告
 */

  const optionData = inject('form-render-option-data')
  const options = ref([])
  const haveExtraData = computed(() => {
    return !!optionData[schema.field]
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
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `label` property to get label.'
      )
    } else {
      const lablKey = optionData[schema.field].label
      if (lablKey) {
        return option[lablKey]
      }
      if (option.label) {
        return option.label
      }
      throw new Error(
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
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `value` property to get value.'
      )
    } else {
      const valueKey = optionData[schema.field].value
      if (valueKey) {
        return option[valueKey]
      }
      if (option.value) {
        return option.value
      }
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `value` property to get value.'
      )
    }
  }

  const getKey = (option) => {
    if (!haveExtraData.value) {
      if (schema.data.key) {
        return option[schema.data.key]
      }
      if (option.id) return 'id'
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `key` property to get value.'
      )
    } else if (optionData[schema.field].key) {
      return optionData[schema.field].key
    } else if (option.id) return 'id'
    else
      throw new Error(
        '[Form-Render4-Vue3-Pro]: You must provide a `key` property to get value.'
      )
  }

  const getOptions = () => {
    if (!haveExtraData.value) {
      if (!schema.data) {
        throw new Error(
          `[Form-Render4-Vue3-Pro]: field '${filedName}' maybe have no provide an option data.`
        )
      } else {
        options.value = schema.data.list
      }
    } else if (optionData[schema.field].list) {
      options.value = optionData[schema.field].list
    } else {
      throw new Error(
        `[Form-Render4-Vue3-Pro]: field '${filedName}' maybe have no provide an option data.`
      )
    }
  }


  return {
    optionData,
    haveExtraData,
    getLabel,
    getValue,
    getKey,
    getOptions,
    options
  }
}