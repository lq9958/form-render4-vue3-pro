<template>
  <div class="simple-form">
    <div class="form-container">
      <form-render4-vue3-pro
        v-if="showForm"
        ref="formRenderInstance"
        v-model="formData"
        :schema="formSchema"
        :option-data="optionData"
      >
        <template #slot>
          <a-image
            width="200"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          />
        </template>
        <template #footer>
          <a-space>
            <a-button type="primary" @click="validateForm">校验</a-button>
            <a-button @click="resetFormData">重置</a-button>
          </a-space>
        </template>
      </form-render4-vue3-pro>
      <a-link v-else status="danger">json 格式不正确~</a-link>
      <a-divider />
      <div>
        <a-space>
          隐藏表单项：<a-switch
            v-model="showFormItem"
            @change="changeFormItemDisplayState"
          ></a-switch>
        </a-space>
      </div>
      <a-space align="center">
        <div class="form-data">
          表单数据：
          <pre>
           <div>{{ JSON.stringify(formData, null, 2) }}</div>
          </pre>
        </div>
      </a-space>
    </div>
    <div class="editor-container">
      <codemirror
        class="json-editor"
        v-model="code"
        :style="{ height: '100%' }"
        @change="handleEditorChange"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="4"
        :extensions="extensions"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { SIMPLEFORM, SIMPLEFORMDATA } from '@/data/form-schema'
import useApp from '@/hooks/useApp'

const { context } = useApp()
const code = ref(JSON.stringify(SIMPLEFORM, null, 4))
const extensions = [json(), oneDark]

const formData = reactive(SIMPLEFORMDATA)
let formSchema = reactive(SIMPLEFORM)

const showForm = ref(true)
const timer = ref(null)
const handleEditorChange = (value) => {
  timer.value && clearTimeout(timer.value)
  try {
    showForm.value = false
    formSchema = reactive(JSON.parse(value))
    timer.value = setTimeout(() => {
      showForm.value = true
    }, 500)
  } catch (e) {
    showForm.value = false
  }
}

const formRenderInstance = ref(null)
const validateForm = async () => {
  if (formRenderInstance.value) {
    let ret = await formRenderInstance.value.validate()
    if (ret) {
      console.log(context)
      context.$message.success('校验成功！')
    }
  }
}

const staticData = [
  {
    value: 'song',
    label: '唱',
  },
  {
    value: 'dance',
    label: '跳',
  },
  {
    value: 'rap',
    label: 'rap',
  },
  {
    value: 'basketball',
    label: '篮球',
  },
]
const optionData = reactive({
  radio: {
    list: [
      {
        value: 'song',
        label: '唱',
      },
      {
        value: 'dance',
        label: '跳',
      },
      {
        value: 'rap',
        label: 'rap',
      },
      {
        value: 'basketball',
        label: '篮球',
      },
    ],
  },
  like: {
    list: [
      {
        value: 'song',
        label: '唱',
      },
      {
        value: 'dance',
        label: '跳',
      },
      {
        value: 'rap',
        label: 'rap',
      },
      {
        value: 'basketball',
        label: '篮球',
      },
    ],
  },
  like2: {
    list: [
      {
        value: 'song',
        label: '唱',
      },
      {
        value: 'dance',
        label: '跳',
      },
      {
        value: 'rap',
        label: 'rap',
      },
      {
        value: 'basketball',
        label: '篮球',
      },
    ],
  },
  checkbox: {
    list: staticData,
  },
  cascader: {
    list: [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
            children: [
              {
                value: 'jinrongjie',
                label: 'Jinrongjie',
              },
              {
                value: 'tianqiao',
                label: 'Tianqiao',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ],
  },
  treeselect: {
    list: [
      {
        key: 'node1',
        title: 'node1',
        children: [
          {
            key: 'node2',
            title: 'node2',
          },
        ],
      },
      {
        key: 'node3',
        title: 'node3',
        children: [
          {
            key: 'node4',
            title: 'node4',
          },
          {
            key: 'node5',
            title: 'node5',
          },
        ],
      },
    ],
  },
  transfer: {
    list: staticData,
  },
})

const resetFormData = () => {
  formRenderInstance.value && formRenderInstance.value.reset()
}
const changeFormItemDisplayState = (value, _) => {
  formSchema.fields.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(item, 'show')) {
      item.show = !value
    }
  })
}

const showFormItem = ref(false)
</script>

<style lang="scss">
.simple-form {
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  .form-container {
    flex: 1;
    height: 100%;
    margin: 0px 10px;
    padding: 5px;
    border: 1px solid #ccc;
    overflow: auto;
    .form-data {
      padding: 10px 5px;
    }
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
</style>
