<template>
  <div class="top">
    <div class="top__left">
      <span class="left__btn" @click="goHome">首页</span>
    </div>
    <div class="top__center">
      <div class="top__center__title">Alfred可视化大数据平台</div>
    </div>
    <div class="top__right">
      <span class="right__btn">统计报告</span>
      <span class="right__time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'
const $router = useRouter()
let time = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
let timer = ref(0)
const goHome = () => {
  $router.push({ name: 'home' })
}
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  &__right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right__btn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #29fccf;
      font-size: 20px;
    }

    .right__time {
      color: #29fccf;
      margin-right: 10px;
      font-size: 20px;
    }
  }

  &__left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .left__btn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #29fccf;
      font-size: 20px;
    }
  }

  &__center {
    flex: 2;

    &__title {
      width: 100%;
      height: 74px;
      line-height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #29fccf;
      font-size: 30px;
    }
  }
}
</style>
