<template>
  <div class="container">
    <!-- 数据大屏展示内容 -->
    <div class="screen" ref="screen">
      <div class="top">顶部</div>
      <div class="bottom">
        <div class="bottom__left">左侧</div>
        <div class="bottom__center">中间</div>
        <div class="bottom__right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 定义缩放的比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const hh = window.innerHeight / h
  return ww < hh ? ww : hh
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    background-color: red;
    left: 50%;
    top: 50%;
    transform-origin: left top;
  }
}
</style>
