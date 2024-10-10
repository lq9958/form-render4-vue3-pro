<template>
  <div class="app-content">
    <div class="app-title">Form-Render4-Vue3-Pro</div>
    <a-tabs v-model="activeName">
      <a-tab-pane title="arco-design" key="simple">
        <simple-form></simple-form>
      </a-tab-pane>
      <a-tab-pane title="element-plus" key="simple-ele">
        <simple-form-ele></simple-form-ele>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SimpleForm from '@/views/simple.vue'
import SimpleFormEle from '@/views/simple-ele.vue'

const activeName = ref('simple-ele')
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
