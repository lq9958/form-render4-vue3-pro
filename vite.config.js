import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, './src/package/form-render4-vue3-pro/index.js'),
      name: 'form-render4-vue3-pro',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    }
  },
  plugins: [vue()],
})
