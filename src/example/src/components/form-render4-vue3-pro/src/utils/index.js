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

/**
 * 
 * @param {*} schema 表单schema
 * @param {*} optionData 表单option-data
 * @returns 
 */
export const getOptions = (schema, optionData) => {
  if (optionData[schema.field].list) {
    return optionData[schema.field].list;
  }
  console.warn(
    `[Form-Render4-Vue3-Pro]: Field '${schema.field}' must provide a 'list' property in Checkbox.`
  );
  return [];
};

/**
 * 
 * @param {*} schema 表单schema
 * @param {*} optionData 表单option-data
 * @param {*} option option-data中list字段的数据项
 * @returns 
 */
export const getLabel = (schema, optionData, option) => {
  if (optionData[schema.field].label) {
    return option[optionData[schema.field].label];
  }
  if (Object.hasOwn(option, 'label')) return option.label;
  console.warn(
    `[Form-Render4-Vue3-Pro]: You must provide a 'label' property to get label in field: ${schema.field}.`
  );
};

/**
 * 
 * @param {*} schema 表单schema
 * @param {*} optionData 表单option-data
 * @param {*} option option-data中list字段的数据项
 * @returns 
 */
export const getValue = (schema, optionData, option) => {
  if (optionData[schema.field].value)
    return option[optionData[schema.field].value];
  if (Object.hasOwn(option, 'value')) return option.value;
  console.warn(
    `[Form-Render4-Vue3-Pro]: You must provide a 'value' property to get value in field: ${schema.field}.`
  );
};

/**
 * 
 * @param {*} schema 表单schema
 * @param {*} optionData 表单option-data
 * @param {*} option option-data中list字段的数据项
 * @returns 
 */
export const getKey = (schema, optionData, option) => {
  if (optionData[schema.field].key) {
    return option[optionData[schema.field].key];
  }
  if (Object.hasOwn(option, 'id')) return option.id;
  console.warn(
    `[Form-Render4-Vue3-Pro]: You must provide a 'key' property to get value in field: ${schema.field}.`
  );
};

export const is = (object) => Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
export const isNumber = (object) => Object.prototype.toString.call(object).slice(8, -1) == "Number"
export const isArray = (object) => Object.prototype.toString.call(object).slice(8, -1) == "Array"
export const isObject = (object) => Object.prototype.toString.call(object).slice(8, -1) == "Object"
export const isString = (object) => Object.prototype.toString.call(object).slice(8, -1) == "String"
