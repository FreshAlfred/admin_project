<template>
  <el-card class="box-card">
    <!-- 卡片顶部按钮 -->
    <el-button type="primary" size="default" @click="" icon="Plus">
      添加品牌
    </el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌名称">
        <template #="{ row, $index }">
          <pre style="color: brown">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click=""
            icon="Edit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            @click=""
            icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[1, 5, 10, 20, 50]"
      :background="background"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { reqHasTrademark } from '@/api/product/trademark'
import { ref, onMounted } from 'vue'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let background = ref<boolean>(true)

let trademarkArr = ref<Records>([])

let total = ref<number>(0)
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped></style>
