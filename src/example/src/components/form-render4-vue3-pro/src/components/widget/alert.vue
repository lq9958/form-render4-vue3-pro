<template>
  <a-alert v-bind="attrs" style="margin: 8px 0">{{ attrs.content }}</a-alert>
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
