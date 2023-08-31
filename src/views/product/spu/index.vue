<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
  </div>
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button type="primary" size="default" @click="addSpu" icon="Plus" :disabled="!categoryStore.c3Id">
        添加SPU
      </el-button>
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="addSku(row)" icon="Plus" title="添加SKU"></el-button>
            <el-button type="primary" size="small" @click="changeSpu(row)" icon="Edit" title="修改SPU"></el-button>
            <el-button type="primary" size="small" @click="findSku(row)" icon="View" title="查看SKU列表"></el-button>
            <el-popconfirm :title="`确认删除${row.spuName}吗?`" width="200px" @confirm="deleteSpu(row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @size-change="changeSize" @current-change="getHasSpu" v-model:current-page="pageNo"
        v-model:page-size="pageSize" :page-sizes="[3, 5, 10]" :background="true"
        layout="prev, pager, next, jumper, -> , sizes, total" :total="total" />
    </div>
    <SpuForm ref="spuForm" v-show="scene === 1" @changeScene="changeScene"></SpuForm>
    <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene"></SkuForm>
    <!-- dialog对话框 -->
    <el-dialog title="SKU列表" v-model="dialogShow">
      <el-table border :data="skuArr">
        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格" prop="price"></el-table-column>
        <el-table-column label="SKU重量" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template #="{row, $index}">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import type { HasSpuResponseData, Records, SkuInfoData, SkuData } from '@/api/product/spu/type'
import type { SpuData } from '@/api/product/spu/type'
import { reqHasSpu, reqSkuList, reqSpuDelete } from '@/api/product/spu'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
// 获取子组件实例
let spuForm = ref<any>()
let sku = ref<any>()
// 存储SKU全部数据
let skuArr = ref<SkuData[]>([])

let dialogShow = ref<boolean>(false)
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
  } else if (obj.params === 'update') {
    getHasSpu(pageNo.value)
  } else {
    return
  }
}

// 添加SKU的回调函数
const addSku = (row: SpuData) => {
  scene.value = 2
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

// 查看SKU列表数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList((row.id as number))
  if (result.code == 200) {
    skuArr.value = result.data
    dialogShow.value = true
  }
}

const deleteSpu = async (row: SpuData) => {
  let result = await reqSpuDelete(row.id as number)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasSpu(records.value.length>1? pageNo.value : pageNo.value-1)
  } else {
    ElMessage.error('删除失败')
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
