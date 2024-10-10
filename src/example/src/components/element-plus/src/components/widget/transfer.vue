<template>
  <el-transfer
    v-model="formData[filedName]"
    :data="options"
    v-bind="attrs"
    :style="{
      width: '100%',
    }"
  ></el-transfer>
</template>

<script setup>
import { inject, ref, reactive, watch } from 'vue';
import useOptionData from '../hooks';
import { getEventBus } from '../../utils/eventemitter';
import { composeWatcher } from '../../utils/watcher';

const emitter = getEventBus();
// 获取options
const props = defineProps({
  schema: Object,
});
const schema = reactive(props.schema);

const formData = inject('form-render-data');
const { optionData, setOptions, options, globalSchema } = useOptionData(schema);

const filedName = ref(schema.field);
const attrs = schema.props || {};

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
  name: 'FormRenderTransfer',
};
</script>
