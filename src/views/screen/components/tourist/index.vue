<template>
  <div class="tourist_container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>9999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('21550人')
let charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: {
      text: '水球图',
    },
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.4, 0.2, 0.1],
        waveAnimation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        radius: '100%',
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'skyblue',
            borderColor: '#294D99',
            borderWidth: 8,
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.tourist_container {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    padding: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    padding: 10px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 260px;
  }
}
</style>
