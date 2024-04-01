import { inject, computed, ref, reactive } from 'vue';
import { requestData } from '../../utils/request'


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
* 
* @since v3.0.0 新增远程数据源，组件会根据schema中数据来源类型来决定获取数据的方式
*/


export default (schema) => {
  const optionData = inject('form-render-option-data')
  const globalSchema = inject('form-render-schema')
  // 全局schema
  const datasource = reactive(schema.datasource || {})

  const options = ref([])

  const optionLabel = computed(() => {
    if (
      datasource.type === 'remote' ||
      datasource.type === 'provide'
    ) {
      return datasource?.option?.label || 'label'
    } else {
      return optionData[schema.field].label || 'label'
    }
  })

  const optionValue = computed(() => {
    if (
      datasource.type === 'remote' ||
      datasource.type === 'provide'
    ) {
      return datasource?.option?.value || 'value'
    } else {
      return optionData[schema.field].value || 'value'
    }
  })

  // 该方法只适用于本地数据源或者自定义数据源
  const setOptions = () => {
    if (datasource.type == 'remote') {
      datasource.params.forEach((param) => {
        const reg = /^\${(.*)}$/
        if (param.value) {
          const matchRet = param.value.match(reg)
          if (matchRet) {
            param.value = formData[matchRet[1]]
          }
        }
      })
      options.value = requestData(
        datasource.url,
        datasource.method,
        datasource.params,
        datasource.dataPath
      )
    } else if (datasource.type == "provide") {
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