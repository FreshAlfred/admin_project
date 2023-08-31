<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="SkuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="SkuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input
        placeholder="重量(g)"
        type="number"
        v-model="SkuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="SkuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              :value="`${item.id}:${item1.id}`"
              v-for="(item1, index1) in item.attrValueList"
              :key="item1.id"
              :label="item1.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="(item, index) in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${item1.id}`"
              v-for="(item1, index1) in item.spuSaleAttrValueList"
              :key="item1.id"
              :label="item1.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, index }">
            <el-button type="primary" size="small" @click="handler(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-column>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-column>
  </el-form>
</template>

<script setup lang="ts">
// 引入添加sku请求的api
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
let attrArr = ref<any>([])
let imgArr = ref<any>([])
let saleArr = ref<any>([])
let $emit = defineEmits(['changeScene'])
// 收集SKU数据
let SkuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  // v-model收集
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [
    // {
    //   attrId: '',
    //   valueId: '',
    // }
  ],
  skuSaleAttrValueList: [
    // {
    //   saleAttrId: '',
    //   saleAttrValueId: '',
    // }
  ],
  skuDefaultImg: '',
})
// 获取table组件的vc
let table = ref<any>()
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  // 收集数据
  SkuParams.category3Id = spu.category3Id
  SkuParams.spuId = spu.id
  SkuParams.tmId = spu.tmId

  // 获取平台属性
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result1: any = await reqSpuHasSaleAttr(spu.id)
  let result2: any = await reqSpuImageList(spu.id)
  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}

defineExpose({
  initSkuData,
})
//设置默认图片的回调
const handler = (row: any) => {
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  SkuParams.skuDefaultImg = row.imgUrl
}

const save = async () => {
  // 整理参数
  let attrArrs = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  SkuParams.skuAttrValueList = attrArrs
  SkuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )
  // 发请求
  let result: any = await reqAddSku(SkuParams)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '添加SKU成功' })
    //切换场景
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({ type: 'error', message: '添加SKU失败' })
  }
  // 成功失败
}
</script>

<style scoped></style>
