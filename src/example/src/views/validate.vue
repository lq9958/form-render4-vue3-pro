<template>
  <div class="simple-form">
    <div class="form-container">
      <form-render4-vue3
        v-if="showForm"
        ref="formInstance"
        :schema="formState.schema"
        :modal="formState.formData"
        :on-change="handleFormDataChange"
      >
        <template #footer>
          <a-buton type="primary">校验 </a-buton>
        </template>
      </form-render4-vue3>
      <el-text v-else class="mx-1" type="danger">JSON 格式有误</el-text>
      <div class="form-data">表单数据：{{ formState.formData }}</div>
    </div>
    <div class="editor-container">
      <el-scrollbar>
        <codemirror
          v-model="code"
          @update:modelValue="handleEditorChange"
          class="json-editor"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="4"
          :extensions="extensions"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { VALIDATEFORM, SIMPLEFORMDATA } from '../data/form-schema'

const code = ref(JSON.stringify(VALIDATEFORM, null, 4))
const extensions = [json(), oneDark]

const showForm = ref(true)
const formState = reactive({
  formData: SIMPLEFORMDATA,
  schema: VALIDATEFORM,
})

watch(formState, (newVal) => {
  console.log(newVal)
})

const handleEditorChange = (value) => {
  try {
    formState.schema = JSON.parse(value)
    showForm.value = true
  } catch (e) {
    console.log(e)
    showForm.value = false
  }
}

const handleFormDataChange = ({ field, value }) => {
  formState.formData[field] = value
}

const formInstance = ref(null)
const validateForm = () => {
  if (!formInstance) return
  formInstance.value.validate(({ isVali, errorField }) => {
    if (!isVali) {
      ElMessage({
        message: '表单校验不通过',
        type: 'error',
      })
    }
  })
}
</script>

<style lang="scss">
.simple-form {
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  .form-container {
    flex: 1;
    height: 100%;
    margin: 10px;
    padding: 5px;
    border: 1px solid #ccc;
  }
  .editor-container {
    flex: 1;
    height: 100%;
    background-color: #282c34;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 1rem;
    line-height: 1.5;
  }
}

.json-editor {
  height: 100%;
}
</style>
