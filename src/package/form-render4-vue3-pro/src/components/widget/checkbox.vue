<template>
  <a-checkbox-group v-model="formData[filedName]" v-bind="attrs">
    <a-checkbox
      v-for="item in options"
      :key="getKey(schema, optionData, item)"
      :value="getValue(schema, optionData, item)"
      :label="getLabel(schema, optionData, item)"
      >{{ getLabel(schema, optionData, item) }}</a-checkbox
    >
  </a-checkbox-group>
</template>

<script setup>
  import { inject, ref, onMounted, reactive, watch } from 'vue';
  import { getKey, getLabel, getOptions, getValue } from '../../utils';

  const formData = inject('form-render-data');
  const optionData = inject('form-render-option-data');
  const props = defineProps({
    schema: Object,
  });

  const schema = reactive(props.schema);
  const filedName = ref(schema.field);

  const options = ref(null);

  onMounted(() => {
    options.value = getOptions(schema, optionData);
  });

  watch(optionData, () => {
    options.value = getOptions(schema, optionData);
  });

  const attrs = schema.props || {};
</script>

<script>
  export default {
    name: 'FormRenderCheckbox',
  };
</script>
