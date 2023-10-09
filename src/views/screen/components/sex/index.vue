<template>
  <div class="sex-box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="women">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士60%</p>
      <p>女士40%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()
// onMounted(() => {
//   let myCharts = echarts.init(charts.value)
//   myCharts.setOption({
//     series: [{
//       type: 'bar',
//       data: []
//     }]
//   })
// })
onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    series: [
      {
        type: 'bar',
        data: [10],
      },
    ],
    xAxis: {
      type: 'category',
    },
    yAxis: {},
  })
})
</script>

<style scoped lang="scss">
.sex-box {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    .man {
      margin: 20px;
      background: url(../../images/man-bg.png) no-repeat;
      width: 111px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .women {
      margin: 20px;
      background: url(../../images/woman-bg.png) no-repeat;
      width: 111px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .charts {
    height: 100px;
    background-color: red;
  }
}
</style>
