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
            @click="updateSale(row)"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            @click="updateSku"
            icon="Edit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            @click="findSku(row)"
            icon="InfoFilled"
          ></el-button>
          <el-popconfirm
            :title="`确定删除${row.skuName}吗?`"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.attrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  reqSkuList,
  reqSaveSku,
  reqCancelSku,
  reqSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku'
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let skuInfo = ref<SkuData>({})
// 控制抽屉组件
let drawer = ref<boolean>(false)

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

const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    await reqCancelSku(row.id as number)
    ElMessage.success('下架成功')
    getHasSku(pageNo.value)
  } else if (row.isSale === 0) {
    await reqSaveSku(row.id as number)
    ElMessage.success('上架成功')
    getHasSku(pageNo.value)
  }
}

const updateSku = () => {
  ElMessage.success('程序猿在努力更新中....')
}

const findSku = async (row: SkuData) => {
  drawer.value = true
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  skuInfo.value = result.data
}

const deleteSku = async (row: SkuData) => {
  let result = await reqDeleteSku(row.id as number)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
