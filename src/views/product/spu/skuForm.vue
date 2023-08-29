<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select>
            <el-option
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
          <el-select>
            <el-option
              v-for="(item1, index1) in item.spuSaleAttrValueList"
              :key="item1.id"
              :label="item1.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr">
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
            <el-button type="primary" size="small" @click="">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-column>
      <el-button type="primary" size="default" @click="">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-column>
  </el-form>
</template>

<script setup lang="ts">
// 引入添加sku请求的api
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
import { ref } from 'vue'
let attrArr = ref<any>([])
let imgArr = ref<any>([])
let saleArr = ref<any>([])
let $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
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
</script>

<style scoped></style>
