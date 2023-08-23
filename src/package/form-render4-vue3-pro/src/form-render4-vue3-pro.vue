<template>
  <div class="form-render">
    <a-form ref="formInstance" :model="formData" v-bind="formProps">
      <a-col
        v-for="field in fields"
        :key="field.field"
        :span="computedSpan(field)"
      >
        <template v-if="shouldDisplay(field)">
          <div v-if="haveSolt(field)" class="form-render-item">
            <a-form-item
              :field="field.field"
              :label="field.title"
              v-bind="field.props"
            >
              <slot :name="field.field" :data="formData"> </slot>
            </a-form-item>
          </div>
          <form-render-item v-else :schema="field" :form-data="formData" />
        </template>
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
  import { watch, ref, provide, reactive, useSlots } from 'vue';
  import '@arco-design/web-vue/dist/arco.css'
  import FormRenderItem from './components/form-render-item.vue';

  const slots = useSlots();
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
  // fix: 修复schema无clomun属性时无法渲染表单的问题
  const column = ref(schema.column || 1);
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

  // 清除表单校验结果
  const clearValidate = () => {
    formInstance.value.clearValidate();
  };
  const reset = (fieldlist) => {
    // eslint-disable-next-line no-unused-expressions
    formInstance.value && formInstance.value.resetFields(fieldlist);
  };

  const haveSolt = (schema) => {
    if(!slots) return false
    return schema.field in slots;
  };

  // feat: schema 新增show字段方便更加灵活控制表单项的渲染
  const shouldDisplay = (schema) => {
    if (Object.prototype.hasOwnProperty.call(schema, 'show')) {
      return schema.show;
    }
    return true;
  };
  defineExpose({
    validate,
    reset,
    clearValidate
  });
</script>

<script>
  export default {
    name: 'FormRender4Vue3Pro',
  };
</script>

<style >
  .form-render {
    width: 100%;
  }
</style>
