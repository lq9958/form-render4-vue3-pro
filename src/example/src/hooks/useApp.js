import {
  getCurrentInstance
} from 'vue'

export default function useApp() {
  const instance = getCurrentInstance()
  const context = instance.appContext.config.globalProperties
  return {
    instance,
    context
  }
}
