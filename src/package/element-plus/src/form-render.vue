<template>
  <div class="form-render">
    <el-form
      ref="formInstance"
      :model="formData"
      v-bind="formProps"
    >
      <el-row v-if="formProps.inline" :gutter="gutter">
        <template v-for="field in fields" :key="field.field">
          <el-col :span="computedSpan(field)" v-if="shouldDisplay(field)" :style="{'margin-bottom':gutter+'px'}">
            <form-render-item :style="{width: '100%'}" :schema="field" >
              <template #[field.field]  v-if="haveSlot(field)" >
                <slot :name="field.field" />
              </template>
            </form-render-item>
          </el-col>
        </template>
        <el-col :span="24 / column">
          <el-form-item>
            <div class="submit_group_btn" v-if="haveSlot({ field: 'footer' })">
              <slot name="footer" ></slot>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-else>
          <div v-for="field in fields" :key="field.field">
            <form-render-item v-if="shouldDisplay(field)" :style="{width: '100%'}" :schema="field" >
              <template #[field.field] v-if="haveSlot(field)" >
                <slot :name="field.field" />
              </template>
            </form-render-item>
          </div>
          <el-form-item v-if="haveSlot({ field: 'footer' })">
            <div class="submit_group_btn" >
              <slot name="footer"></slot>
            </div>
          </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup>
import { watch, ref, provide, reactive, useSlots, computed } from 'vue'
import FormRenderItem from './components/form-render-item.vue'

const slots = useSlots()
provide('form-render-slots', slots)

const props = defineProps({
  modelValue: { type: Object },
  schema: { type: Object },
  optionData: { type: Object },
})

const formData = reactive(props.modelValue)
const schema = reactive(props.schema)
watch(formData, (val) => {
  emit('update:modelValue', val)
})
provide('form-render-data', formData)
provide('form-render-schema', schema)
provide('form-render-option-data', props.optionData || {})
const emit = defineEmits(['update:modelValue'])

const fields = ref(schema.fields)
const formProps = ref(schema.props)
// fix: 修复schema无clomun属性时无法渲染表单的问题
const column = computed(() => schema.column || 1)

/**
 * @since 2.0.0 新增guuter属性，用于控制表单栅栏间隔
 */
const gutter = computed(() => schema.gutter || 8)

watch(
  () => props.schema,
  (newVal) => {
    fields.value = newVal.fields
    formProps.value = newVal.props
  },
)

const formInstance = ref(null)
const validate = () => {
  return new Promise((resolve, reject) => {
    if (formInstance.value) {
      formInstance.value.validate((err) => {
        if (!err) {
          resolve(true)
        } else {
          reject(err)
        }
      })
    }
  })
}

const computedSpan = (field) => {
  // 优先使用formItem的span值
  if(field.span) {
    return field.span
  }else if(Object.hasOwn(schema, 'column')) {
   return  24 / schema.column
  }
  return 24

}

const reset = (fieldList) => {
  // eslint-disable-next-line no-unused-expressions
  formInstance.value && formInstance.value.resetFields(fieldList)
}

const haveSlot = (schema) => {
  if (!slots) return false
  return schema.field in slots
}

// feat: schema 新增show字段方便更加灵活控制表单项的渲染
const shouldDisplay = (schema) => {
  if (Object.prototype.hasOwnProperty.call(schema, 'show')) {
    return schema.show
  }
  return true
}

defineExpose({
  validate,
  reset,
})
</script>

<script>
export default {
  name: 'FormRender4Vue3Pro',
}
</script>

<style scoped>
.form-render {
  width: 100%;
}
.submit_group_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
