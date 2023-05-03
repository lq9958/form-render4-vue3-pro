<template>
  <a-form-item
    :field="schema.field"
    :label="schema.title"
    v-bind="schema.props"
  >
    <div v-if="isFormItem">
      <a-row :span="24">
        <a-col :span="24 / column" v-for="child in children" :key="child.field">
          <form-render-item
            :schema="child"
          ></form-render-item>
        </a-col>
      </a-row>
    </div>
    <component
      v-else
      :is="renderComponent"
      :schema="schema"
      v-bind="schema.props"
    />
  </a-form-item>
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  schema: Object,
})

const { schema } = props
const isFormItem = computed(() => schema.type === 'form-item')

const column = isFormItem.value && schema.children.column
const children = isFormItem.value ? schema.children.items : []

const type = schema.type
const renderComponent = defineAsyncComponent(() =>
  import(`./widget/${type}.vue`)
)
</script>

<script>
export default {
  name: 'FormRenderItem',
}
</script>
