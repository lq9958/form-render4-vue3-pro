<template>
  <a-form-item
    :field="schema.field"
    :label="schema.title"
    v-bind="schema.props"
  >
    <div v-if="isFormItem">
      <a-row :span="24">
        <a-col v-for="child in children" :key="child.field" :span="span">
          <form-render-item :schema="child"></form-render-item>
        </a-col>
      </a-row>
    </div>
    <component
      :is="renderComponent"
      v-else
      :schema="schema"
      v-bind="schema.props"
    />
  </a-form-item>
</template>

<script setup>
  import { defineAsyncComponent, computed, reactive, ref, inject } from 'vue';

  const props = defineProps({
    schema: Object,
  });

  const schema = reactive(props.schema);
  const isFormItem = computed(() => schema.type === 'form-item');

  // v1.2.0 form-tiem配置新增span项，原本column不变
  const computedSpan = () => {
    if (isFormItem.value) {
      if (schema.children.span) {
        return schema.children.span;
      }
      return 24;
    }
    return 24;
  }
  const span = computedSpan();
  const children = isFormItem.value ? schema.children.items : [];

  const type = ref(schema.type);
  console.log('current',schema)
  const renderComponent = defineAsyncComponent(() =>
    import(`./widget/${type.value}.vue`)
  );
</script>

<script>
  export default {
    name: 'FormRenderItem',
  };
</script>
