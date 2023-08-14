<template>
  <div>
    <Category :scene="scene"></Category>
  </div>
  <el-card style="margin: 10px 0">
    <div v-show="scene == 0">
      <el-button
        @click="addAttr"
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              @click="updateAttr"
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
    </div>
    <div v-show="scene == 1">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        @click="addAttrValue"
        icon="Plus"
        :disabled="!attrParams.attrName"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px" :data="attrParams.attrValueList">
        <el-table-column
          width="80px"
          type="index"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input
            v-if="flag" @blur="toLook"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
            ></el-input>
            <div v-else>{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { watch, ref, reactive } from 'vue'
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)
let attrParams = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})
let flag = ref<boolean>(true);
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

// 获取已有属性
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    categoryId: '',
    categoryLevel: 3,
    attrValueList: [],
  })
  scene.value = 1
  attrParams.categoryId = categoryStore.c3Id
}

const updateAttr = () => {
  scene.value = 1
}
const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
  })
}
const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    getAttr()
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
const toLook = () => {
  flag.value = false
}
</script>

<style scoped></style>
