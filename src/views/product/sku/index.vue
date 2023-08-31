<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuArr">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        width="150px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        width="150px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="默认图片" width="150px">
        <template #="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        prop="weight"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        width="150px"
      ></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click=""
            icon="Top"
          ></el-button>
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
            icon="InfoFilled"
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
      :page-sizes="[3, 5, 10]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSkuList } from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
onMounted(() => {
  getHasSku()
})
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
const handler = (pageSizes: number) => {
  pageSize.value = pageSizes
  getHasSku()
}
</script>

<style scoped></style>
