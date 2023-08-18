<template>
  <el-form label-width="auto">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option v-for="(item, index) in allTrademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>

      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload"
        list-type="picture-card"  :before-upload="handlerUpload"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;"/>
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="小米"></el-option>
        <el-option label="苹果"></el-option>
      </el-select>
      <el-button style="margin-left: 10px" icon="Plus" type="primary" size="default" @click="">
        添加属性值
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名称" prop="saleAttrName" width="120px"></el-table-column>
        <el-table-column label="销售属性值">
          
          <template #="{ row, $index }">

          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" size="default" @click="">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import { reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu';
import type { HasSaleAttr, SpuSaleAttr, SpuImage, Trademark, AllTrademark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', 0)
}
let allTrademark = ref<Trademark[]>([])
let imgList = ref<SpuImage[]>([])
let saleAttr = ref<SpuSaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
// 存储完整的SPU对象
let SpuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImgList: []
})
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  let result: AllTrademark = await reqAllTrademark();
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number);
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTrademark.value = result.data;
  imgList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  saleAttr.value = result2.data;
  allSaleAttr.value = result3.data;

}
defineExpose({
  initHasSpuData
})
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
}
const handleRemove = (file: any) => {
  console.log(1)
}
const handlerUpload = (file: any) => {
  if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
    if(file.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传头像图片大小不能超过 4MB!')
    }
  } else {
    ElMessage.error('上传头像图片只能是 JPG/PNG/GIF格式!')
    return false
  }
}
</script>

<style scoped></style>
