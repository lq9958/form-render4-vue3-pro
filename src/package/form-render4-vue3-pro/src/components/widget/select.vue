<template>
  <a-select v-model="formData[`${filedName}`]" v-bind="attrs">
    <a-option
      v-for="item in options"
      :key="getKey(schema, optionData, item)"
      :value="getValue(schema, optionData, item)"
      :label="getLabel(schema, optionData, item)"
    ></a-option>
  </a-select>
</template>

<script setup>
  import { inject, ref, onMounted, reactive, watch } from 'vue';
  import { getOptions, getKey, getLabel, getValue } from '../../utils';

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
    name: 'FormRenderSelect',
  };
</script>
