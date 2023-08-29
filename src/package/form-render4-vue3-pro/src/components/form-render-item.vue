<template>
  <div
    :class="[globalSchema.props.layout === 'inline' ? 'form_item_inline' : '']"
  >
    <a-form-item
      :field="schema.field"
      :label="schema.title"
      v-bind="schema.props"
    >
      <div v-if="isFormItem">
        <a-row :span="24">
          <a-col v-for="child in children" :key="child.field" :span="span">
            <form-render-item :schema="child"></form-render-item>
          </a-col>
        </a-row>
      </div>
      <component
        :is="componentMap[type]"
        v-else
        :schema="schema"
        v-bind="schema.props"
      />
    </a-form-item>
  </div>
</template>

<script setup>
import { computed, reactive, ref, inject } from 'vue'
// fix: 表单渲染白屏问题
import FormRenderInput from './widget/input.vue'
import FormRenderInputNumber from './widget/input-number.vue'
import FormRenderSelect from './widget/select.vue'
import FormRenderSlider from './widget/slider.vue'
import FormRenderCheckbox from './widget/checkbox.vue'
import FormRenderRadio from './widget/radio.vue'
import FormRenderRate from './widget/rate.vue'
import FormRenderSwitch from './widget/switch.vue'
import FormRenderTextarea from './widget/textarea.vue'

const componentMap = {
  input: FormRenderInput,
  'input-number': FormRenderInputNumber,
  select: FormRenderSelect,
  slider: FormRenderSlider,
  checkbox: FormRenderCheckbox,
  radio: FormRenderRadio,
  rate: FormRenderRate,
  switch: FormRenderSwitch,
  textarea: FormRenderTextarea,
}
const props = defineProps({
  schema: Object,
})

const globalSchema = inject('global-schema')
const schema = reactive(props.schema)
const type = ref(schema.type)
const isFormItem = computed(() => schema.type === 'form-item')
const span = computed(() => {
  if (isFormItem.value) {
    if (schema.children.span) {
      return schema.children.span
    }
    return 24
  }
  return 24
})

const children = isFormItem.value ? schema.children.items : []
</script>

<script>
export default {
  name: 'FormRenderItem',
}
</script>

<style lang="less" scoped>
.form_item_inline {
  margin-bottom: 20px;
}
</style>
