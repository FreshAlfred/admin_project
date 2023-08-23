<template>
  <el-form label-width="auto">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请你输入SPU名称"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option
          v-for="(item, index) in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :before-upload="handlerUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrNameAndValuename"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择的有${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          :value="`${item.id}:${item.name}`"
          v-for="(item, $index) in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        :disabled="!saleAttrNameAndValuename.length"
        style="margin-left: 10px"
        icon="Plus"
        type="primary"
        size="default"
        @click="addSaleAttr"
      >
        添加属性值
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名称"
          prop="saleAttrName"
          width="120px"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              class="mx-1"
              style="margin: 0 5px"
              closable
              :type="row.type"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag === true"
              placeholder="请输入销售属性值"
              size="small"
              style="width: 100px"
            ></el-input>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdit(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" size="default" :disabled="saleAttr.length>0?false:true" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu
} from '@/api/product/spu'
import type {
  HasSaleAttr,
  SpuSaleAttr,
  SpuImage,
  Trademark,
  AllTrademark,
  SpuHasImg,
  SaleAttrValue,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

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
  spuImageList: [],
})
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  let result: AllTrademark = await reqAllTrademark()
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTrademark.value = result.data
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
}
defineExpose({
  initHasSpuData,
})
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const handleRemove = (file: any) => {
  console.log(1)
}
const handlerUpload = (file: any) => {
  if (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传头像图片大小不能超过 4MB!')
    }
  } else {
    ElMessage.error('上传头像图片只能是 JPG/PNG/GIF格式!')
    return false
  }
}
// 计算当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})
// 收集还未选择的销售属性的id、name
let saleAttrNameAndValuename = ref<string>('')

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] =
    saleAttrNameAndValuename.value.split(':')
  let newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrNameAndValuename.value = ''
}
const toEdit = (row: SpuSaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
const toLook = (row: SpuSaleAttr) => {
  // 整理收集到的属性id、名字
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue,
  }
  if (saleAttrValue?.trim() == '') {
    ElMessage.error('请输入销售属性值')
    return
  }
  // 判断属性值是否存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.error('属性值不能重复')
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

const save = async () => {
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imageName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  SpuParams.value.spuSaleAttrList = saleAttr.value;
  let result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id?'更新成功':'添加成功',
    })
    $emit('changeScene', 0)
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id?'更新失败':'添加失败',
    })
  }
}
</script>

<style scoped></style>
