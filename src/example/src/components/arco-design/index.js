import FormRender4Vue3Pro from './src/form-render4-vue3-pro.vue'

FormRender4Vue3Pro.install = function (app, options = { warning: true ,name:'form-render4-vue3-pro'}) {
  app.config.globalProperties.$formRender4vue3Option = options
  app.component(options.name, FormRender4Vue3Pro)
}
export default FormRender4Vue3Pro
