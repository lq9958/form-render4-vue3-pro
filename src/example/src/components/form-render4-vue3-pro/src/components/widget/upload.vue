<template>
  <a-space>
    <a-upload v-model="formData[filedName]" v-bind="attrs"></a-upload>
  </a-space>
</template>

<script setup>
import { inject } from "vue";

const formData = inject("form-render-data");
const props = defineProps({
  schema: Object,
});
const { schema } = props;
const filedName = schema.field;
const attrs = schema.props || {};
</script>

<script>
export default {
  name: "FormRenderUpload",
};
</script>
