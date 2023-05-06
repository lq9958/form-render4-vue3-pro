<template>
  <a-form-item
    :field="schema.field"
    :label="schema.title"
    v-bind="schema.props"
  >
    <div v-if="isFormItem">
      <a-row :span="24">
        <a-col v-for="child in children" :key="child.field" :span="24 / column">
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

  const formData = inject('form-render-data');
  const props = defineProps({
    schema: Object,
  });

  const schema = reactive(props.schema);
  const isFormItem = computed(() => schema.type === 'form-item');

  const column = isFormItem.value && schema.children.column;
  const children = isFormItem.value ? schema.children.items : [];

  const type = ref(schema.type);
  const renderComponent = defineAsyncComponent(() =>
    import(`./widget/${type.value}.vue`)
  );
</script>

<script>
  export default {
    name: 'FormRenderItem',
  };
</script>
