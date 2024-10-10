<template>
  <el-checkbox-group v-model="formData[filedName]" v-bind="attrs">
    <el-checkbox
      v-for="(item, index) in options"
      :key="index"
      :value="item[optionValue]"
      :label="item[optionLabel]"
    >
      {{ item[optionLabel] }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup>
import { inject, ref, reactive, watch } from 'vue';
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
const {
  optionData,
  setOptions,
  options,
  optionLabel,
  optionValue,
  globalSchema,
} = useOptionData(schema);

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
  name: 'FormRenderRadio',
};
</script>
