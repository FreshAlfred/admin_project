<template>
  <el-card class="box-card">
    <!-- 卡片顶部按钮 -->
    <el-button @click="addTrademark" type="primary" size="default" icon="Plus">
      添加品牌
    </el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="品牌名称" label-width="100px">
        <template #="{ row, $index }">
          <pre style="color: brown">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" label-width="100px">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="updateTrademark(row)" icon="Edit"></el-button>
          <el-popconfirm @confirm="removeTrademark(row.id)" :title="`确定删除${row.tmName}吗?`" width="250px" icon="Delete">
            <template #reference>
              <el-button type="primary" size="small" @click="" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getHasTrademark" @size-change="sizeChange" v-model:current-page="pageNo"
      v-model:page-size="pageSize" :page-sizes="[1, 5, 10, 20, 50]" :background="background"
      layout="prev, pager, next, jumper, -> , sizes, total" :total="total" />
  </el-card>
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark
} from '@/api/product/trademark'
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let background = ref<boolean>(true)

let trademarkArr = ref<Records>([])
let total = ref<number>(0)

let dialogFormVisible = ref<boolean>(false)

// 收集数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref();
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
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

const sizeChange = () => {
  getHasTrademark()
}

const addTrademark = () => {
  dialogFormVisible.value = true
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = 0,
    nextTick(() => {
      formRef.value.clearValidate()
    })
}
const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  // 表单校验,如果校验通过,则提交
  await formRef.value.validate();
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }
  dialogFormVisible.value = false
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传头像图片大小不能超过 4MB!')
    }
  } else {
    ElMessage.error('上传头像图片只能是 JPG/PNG/GIF格式!')
    return false
  }
}
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  // response就是返回数据的路径
  response,
) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
const updateTrademark = (row: TradeMark) => {
  formRef.value.clearValidate('logoUrl')
  dialogFormVisible.value = true
  // trademarkParams.logoUrl = row.logoUrl;
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.id = row.id;
  Object.assign(trademarkParams, row)

}
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数需要大于1位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  // 这里的value是上传图片的url
  if (value) {
    callback()
  } else {
    callback(new Error('请上传图片'))
  }
}
// 表单校验规则对象
const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [
    { required: true, validator: validatorLogoUrl },
  ]
}


const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
