<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
  </div>
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        size="default"
        @click="addSpu"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
      >
        添加SPU
      </el-button>
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              @click="addSku"
              icon="Plus"
              title="添加SKU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              @click="changeSpu(row)"
              icon="Edit"
              title="修改SPU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              @click=""
              icon="View"
              title="查看SKU列表"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              @click=""
              icon="Delete"
              title="删除SPU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="changeSize"
        @current-change="getHasSpu"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10]"
        :background="true"
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="total"
      />
    </div>
    <SpuForm
      ref="spuForm"
      v-show="scene === 1"
      @changeScene="changeScene"
    ></SpuForm>
    <SkuForm v-show="scene === 2" @changeScene="changeScene"></SkuForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
import type { SpuData } from '@/api/product/spu/type'
import { reqHasSpu } from '@/api/product/spu'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
// 获取子组件实例
let spuForm = ref<any>()
// 监听三级ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (categoryStore.c3Id === '') {
      records = ref<Records>([])
      return
    }
    getHasSpu()
  },
)
// 获取某个三级分类下全部的SPU
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
// 分页器下拉菜单变化时触发
const changeSize = () => {
  getHasSpu()
}
const addSpu = () => {
  scene.value = 1
  spuForm.value.initAddSpu(categoryStore.c3Id)
}
const changeSpu = (row: SpuData) => {
  scene.value = 1
  // 调用子组件的实例方法获取完整的数据
  spuForm.value.initHasSpuData(row)
}
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params === 'add') {
    getHasSpu()
  } else {
    getHasSpu(pageNo.value)
  }
}

// 添加SKU的回调函数
const addSku = () => {
  scene.value = 2;
}
</script>

<style scoped></style>
