import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
// import FormRender4Vue3 from 'form-render4-vue3-pro'
import FormRender4Vue3 from '@/components/form-render4-vue3-pro'

console.log(FormRender4Vue3)

const app = createApp(App)
app.use(FormRender4Vue3)
app.use(ArcoVue, {})
app.mount('#app')
