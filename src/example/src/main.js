import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
// import FormRender4Vue3 from 'form-render4-vue3-pro'
import FormRender4Vue3Pro from '@/components/element-plus'
import FormRender4Vue3 from '@/components/arco-design'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(FormRender4Vue3Pro, { warning: false,name:'form-render4-vue3-pro' })
app.use(FormRender4Vue3, { warning: false, name:'form-render4-vue3'})
app.use(ArcoVue, {})
app.use(ElementPlus)
app.mount('#app')
