<template>
  <el-card class="box-card">
    <!-- 卡片顶部按钮 -->
    <el-button @click="addTrademark" type="primary" size="default" icon="Plus">
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
      @current-change="getHasTrademark"
      @size-change="sizeChange"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[1, 5, 10, 20, 50]"
      :background="background"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
  </el-card>
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <el-form style="width: 80%">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input
          placeholder="请输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
import { reqHasTrademark } from '@/api/product/trademark'
import { ref, onMounted, reactive } from 'vue'
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
}
const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = () => {
  dialogFormVisible.value = false
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
