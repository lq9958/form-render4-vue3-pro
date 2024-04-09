<template>
  <a-cascader
    v-model="formData[filedName]"
    :options="options"
    v-bind="attrs"
    :style="{
      width: '100%',
    }"
  ></a-cascader>
</template>

<script setup>
import { inject, reactive, watch, ref } from 'vue';
import useOptionData from '../hooks';
import { getEventBus } from '../../utils/eventemitter';
import { composeWatcher } from '../../utils/watcher';

const emitter = getEventBus();
const props = defineProps({
  schema: Object,
});
const schema = reactive(props.schema);
const attrs = schema.props || {};
const formData = inject('form-render-data');

const { optionData, setOptions, options, globalSchema } = useOptionData(schema);

const filedName = ref(schema.field);

setOptions();

emitter.on(`${filedName.value}`, () => {
  formData[filedName.value] = '';
  setOptions();
});
watch(optionData, () => {
  setOptions();
});

composeWatcher(filedName.value, schema.watcher, globalSchema, formData);
</script>

<script>
export default {
  name: 'FormRenderCascader',
};
</script>
