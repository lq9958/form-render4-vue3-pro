<template>
  <a-input v-model="formData[filedName]" v-bind="attrs">
    <!-- <template v-if="slot && slot.prefix" #prefix>
      {{ renderExtra(slot.prefix.type,slot.prefix.content) }}
    </template>
    <template v-if="slot && slot.suffix" #suffix>
      {{ renderExtra(slot.suffix.type,slot.suffix.content) }}
    </template> -->
  </a-input>
</template>

<script setup>
import { inject, reactive } from 'vue'

const formData = inject('form-render-data')
const props = defineProps({
  schema: Object,
})

const schema = reactive(props.schema)
// 仅支持文本和arco-design自带图标的前后缀
/**
 * slot {
 *   prefix:{
 *      type: 'text | icon'，
 *      content: 'text | icon-name'
 * },
 *   suffix:{
 *      type: 'text | icon'，
 *      content: 'text | icon-name'},
 * }
 */
// const slot = schema.slot
const filedName = schema.field
const attrs = schema.props || {}

// const renderExtra = (type, content) => {
//   if (type === 'text') {
//     return h('span', content)
//   } else if (type === 'icon') {
//     return h(`icon-${content}`)
//   }
// }
</script>

<script>
export default {
  name: 'FormRenderInput',
}
</script>
