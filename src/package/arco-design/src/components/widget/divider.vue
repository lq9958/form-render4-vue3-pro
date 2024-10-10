<template>
  <a-divider v-bind="attrs">{{ attrs.content }}</a-divider>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  schema: Object,
})
const schema = reactive(props.schema)

const attrs = schema.props || {}
</script>

<script>
export default {
  name: 'FormRenderDivider',
}
</script>
