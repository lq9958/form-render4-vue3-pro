<template>
  <div class="form-render">
    <a-form ref="formInstance" :model="formData" v-bind="formProps">
      <a-col
        v-for="field in fields"
        :key="field.field"
        :span="computedSpan(field)"
      >
        <a-form-item
          v-if="haveSolt(field)"
          :field="field.field"
          :label="field.title"
          v-bind="field.props"
        >
          <slot :name="field.field" :data="formData"> </slot>
        </a-form-item>
        <form-render-item v-else :schema="field" :form-data="formData" />
      </a-col>
      <a-col :span="24 / column">
        <a-form-item no-style>
          <slot name="footer"></slot>
        </a-form-item>
      </a-col>
    </a-form>
  </div>
</template>

<script setup>
  import { watch, ref, provide, reactive, getCurrentInstance } from 'vue';
  import FormRenderItem from './components/form-render-item.vue';

  const instance = getCurrentInstance();
  const slots = instance.ctx.$slots;

  const props = defineProps({
    modelValue: { type: Object },
    schema: { type: Object },
    optionData: { type: Object },
  });

  const formData = reactive(props.modelValue);
  watch(formData, (val) => {
    emit('update:modelValue', val);
  });
  provide('form-render-data', formData);
  provide('form-render-option-data', props.optionData || {});
  const emit = defineEmits(['update:modelValue']);

  const schema = reactive(props.schema);
  const fields = ref(schema.fields);
  const formProps = ref(schema.props);
  const column = ref(schema.column);
  watch(
    () => props.schema,
    (newVal) => {
      fields.value = newVal.fields;
      formProps.value = newVal.props;
    }
  );

  const formInstance = ref(null);
  const validate = () => {
    return new Promise((resolve, reject) => {
      if (formInstance.value) {
        formInstance.value.validate((err) => {
          if (!err) {
            resolve(true);
          } else {
            reject(err);
          }
        });
      }
    });
  };

  const computedSpan = (schema) => {
    if (schema.column) return 24 / schema.column;
    return 24 / column.value;
  };

  const reset = (fieldlist) => {
    // eslint-disable-next-line no-unused-expressions
    formInstance.value && formInstance.value.resetFields(fieldlist);
  };

  const haveSolt = (schema) => {
    return schema.field in slots;
  };

  defineExpose({
    validate,
    reset,
  });
</script>

<script>
  export default {
    name: 'FormRender4Vue3Pro',
  };
</script>

<style scoped>
  .form-render {
    width: 100%;
  }
</style>
