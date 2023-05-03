<template>
  <div class="app-content">
    <div class="app-title">Form-Render4-Vue3-Pro</div>
    <a-tabs v-model="activeName">
      <a-tab-pane title="普通表单" key="simple">
        <simple-form></simple-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SimpleForm from '@/views/simple.vue'

const activeName = ref('simple')
</script>

<style scoped lang="scss">
.app-content {
  width: 100%;
  height: 100vh;
  .app-title {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: 700;
  }
  // .a-tabs > .a-tab-pane {
  //   width: 100%;
  //   height: calc(100vh - 200px);
  // }
}
</style>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
