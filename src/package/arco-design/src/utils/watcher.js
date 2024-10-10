import { watch } from 'vue'
import { getEventBus } from './eventemitter.js'

// 切换显示和隐藏
const toggleFieldDisplayStatus = (list, fields, status) => {
  if (list.length) {
    fields.forEach(schemaItem => {
      if (schemaItem.children && schemaItem.children.length) {
        toggleFieldDisplayStatus(list, schemaItem.children, status)
      } else {
        if (list.includes(schemaItem.field)) {
          schemaItem.show = status
        }
      }
    })
  }
}

// 修改Props指定属性值
const changeFieldPropsConfigValue = (fieldList, fields, attrName, value) => {
  if (fieldList.length) {
    fields.forEach(schemaItem => {
      if (schemaItem.children && schemaItem.children.length) {
        changeFieldPropsConfigValue(fieldList, schemaItem.children, attrName, value)
      }
      else {
        if (fieldList.includes(schemaItem.field)) {
          schemaItem.props[attrName] = value
        }
      }
    })
  }
}

// 切换必填和选填
/**
 *
 * @param {Array<any>} list
 * @param {*} schema
 * @param {*} status
 */
const toggleFieldRequiredStatus = (list, fields, status) => {
  if (list.length) {
    fields.forEach(schemaItem => {
      if (schemaItem.children && schemaItem.children.length) {
        toggleFieldRequiredStatus(list, schemaItem.children, status)
      } else {
        if (list.includes(schemaItem.field)) {
          schemaItem.config.rules[0].required = status
        }
      }
    })

  }
}

// 更新字段值
const updateFieldValue = (list, formModal) => {
  list.forEach(field => {
    Object.keys(formModal).forEach(key => {
      if (field.key === key) {
        switch (field.type) {
          case 'string':
            formModal[key] = field.value
            break
          case 'number':
            formModal[key] = Number(field.value)
            break
          case 'boolean':
            formModal[key] = field.value === 'true'
            break
          default:
            formModal[key] = eval(field.value)
            break
        }
      }
    })
  })
}

// 更新数据源
const updateDataSource = (list) => {
  const emitter = getEventBus()
  list.forEach(field => {
    emitter.emit(`${field}`)
  })
}

// 拼接条件串
const composeConditionStr = (watcher) => {
  let condition = ''
  const trigger = watcher.triggerType
  trigger.expression.forEach((expression, index) => {
    let code = ''
    switch (expression) {
      case 'include':
        code = `newVal.includes(${expression.conditionValue})`
        break
      case 'notinclude':
        code = `!newVal.includes(${expression.conditionValue})`
        break
      default:
        code = `newVal ${expression.expression} ${expression.conditionValue}`
        break
    }
    condition += index == trigger.expression.length - 1
      ? code
      : `${code} &&`
  })

  trigger.regExp.forEach((regexp, index) => {
    condition += index == trigger.regExp.length - 1
      ? `${regexp.replace(`\\`, '\\')}.test(newVal)`
      : `${regexp.replace(`\\`, '\\')}.test(newVal) &&`
  })
  return condition
}

/**
 * @param {string} field
 * @param {Array<{
 *  triggerType:{
 *  type:'expression' | 'regexp' | 'change',
 *  expression:Array<{
 *      expression: string;
 *      conditionValue: string;
 * }>,
 *  regExp: Array<string>
 * },
 * event:{
 *   hidden: Array<string>;
 *   show: Array<string>;
 *   disable: Array<string>;
 *   enable: Array<string>;
 *   required: Array<string>;
 *   optional: Array<string>;
 *   update: Array<{
 *    key:string,
 *    value:string,
 *    type:'string' | 'number' | 'boolean',
 *    }>;
 *   dataUpdate: Array<string>;
 * }
 * }>} watcher
 * @param {any} schema
 * @param {any} formdata
 */
const composeWatcher = (field, watcher, schema, formdata) => {
  if (!watcher?.length) return
  watcher.forEach(item => {
    const condition = composeConditionStr(item)
    watch(() => formdata[field], (newVal, oldVal) => {
      if (eval(condition)) {
        // hidden
        toggleFieldDisplayStatus(item.event.hidden, schema.fields, false)
        // show
        toggleFieldDisplayStatus(item.event.show, schema.fields, true)
        // enable
        changeFieldPropsConfigValue(item.event.enable, schema.fields, 'disabled', false)
        // disable
        changeFieldPropsConfigValue(item.event.disable, schema.fields, 'disabled', true)
        // required
        toggleFieldRequiredStatus(item.event.required, schema.fields, true)
        // optional
        toggleFieldRequiredStatus(item.event.optional, schema.fields, false)
        // update
        updateFieldValue(item.event.update, formdata)
        // dataUpdate
        updateDataSource(item.event.dataUpdate)
      }
    })
  })
}

export { composeWatcher }
