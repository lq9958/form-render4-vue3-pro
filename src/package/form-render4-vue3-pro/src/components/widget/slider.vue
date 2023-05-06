<template>
  <a-slider v-model="formData[filedName]" v-bind="attrs"></a-slider>
</template>

<script setup>
  import { inject, reactive, ref } from 'vue';

  const formData = inject('form-render-data');
  const props = defineProps({
    schema: Object,
  });

  const schema = reactive(props.schema);
  const filedName = ref(props.schema.field);
  const attrs = schema.props || {};
</script>

<script>
  export default {
    name: 'FormRenderSlider',
  };
</script>
