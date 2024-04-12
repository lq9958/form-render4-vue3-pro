import { inject, computed, ref, reactive } from 'vue';
import { requestData } from '../../utils/request'


/**
* @since v3.0.0 新增远程数据源，组件会根据schema中数据来源类型来决定获取数据的方式
*/

export default (schema) => {
  const optionData = inject('form-render-option-data')
  // 全局schema
  const globalSchema = inject('form-render-schema')
  const formData = inject('form-render-data')
  const datasource = reactive(schema.datasource || {})

  const options = ref([])

  const optionLabel = computed(() => {
    if (!Object.hasOwn(schema, 'datasource')) {
      if (!optionData[schema.field].label) {
        console.warn(`[Form-Render4-Vue3-Pro ${schema.field}]: have no provide a label option field, default use 'label'.`)
      }
      return optionData[schema.field].label || 'label'
    } else {
      if (
        datasource.type === 'remote' ||
        datasource.type === 'provide'
      ) {
        if (!datasource?.options?.label) {
          console.warn(`[Form-Render4-Vue3-Pro ${schema.field}]: have no provide a label option field, default use 'label'.`)
        }
        return datasource?.options?.label || 'label'
      }
      if (!optionData[schema.field].label) {
        console.warn(`[Form-Render4-Vue3-Pro ${schema.field}]: have no provide a label option field, default use 'label'.`)
      }
      return optionData[schema.field].label || 'label'
    }

  })

  const optionValue = computed(() => {
    if (!Object.hasOwn(schema, 'datasource')) {
      if (!optionData[schema.field].value) {
        console.warn(`[Form-Render4-Vue3-Pro ${schema.field}]: have no provide a value option field, default use 'value'.`)
      }
      return optionData[schema.field].value || 'value'
    } else {
      if (
        datasource.type === 'remote' ||
        datasource.type === 'provide'
      ) {
        if (datasource?.options?.value) {
          console.warn(`[Form-Render4-Vue3-Pro ${schema.field}]: have no provide a value option field, default use 'value'.`)
        }
        return datasource?.options?.value || 'value'
      }
      if (optionData[schema.field].value) {
        console.warn(`[Form-Render4-Vue3-Pro ${schema.field}]: have no provide a value option field, default use 'value'.`)
      }
      return optionData[schema.field].value || 'value'
    }
  })

  // 该方法只适用于本地数据源或者自定义数据源
  const setOptions = async () => {
    // 兼容2.x版本，未提供datasource
    if (!Object.hasOwn(schema, 'datasource')) {
      options.value = optionData[schema.field].list || []
      return
    }
    if (datasource.type === 'remote') {
      datasource.params.forEach((param) => {
        const reg = /^\${(.*)}$/
        if (param.value) {
          const matchRet = param.value.match(reg)
          if (matchRet) {
            param.value = formData[matchRet[1]]
          }
        }
      })
      options.value = await requestData(
        datasource.url,
        datasource.method,
        datasource.params,
        datasource.dataPath
      )
    } else if (datasource.type === "provide") {
      options.value = datasource.data || []
    } else {
      options.value = optionData[schema.field].list || []
    }
  }


  return {
    globalSchema,
    optionData,
    optionLabel,
    optionValue,
    setOptions,
    options
  }
}
