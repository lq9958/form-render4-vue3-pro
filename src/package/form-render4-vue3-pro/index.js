import FormRender4Vue3Pro from './src/form-render4-vue3-pro.vue'

FormRender4Vue3Pro.install = (app, options = { warning: true }) => {
  app.config.globalProperties.$formRender4vue3Option = options
  app.component('form-render4-vue3-pro', FormRender4Vue3Pro)
}

export default FormRender4Vue3Pro
