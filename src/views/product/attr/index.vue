<template>
  <div>
    <Category :scene="scene"></Category>
  </div>
  <el-card style="margin: 10px 0">
    <div v-show="scene == 0">
      <el-button @click="addAttr" type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag style="margin: 5px" v-for="(item, index) in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="updateAttr(row)" icon="Edit"></el-button>
            <el-popconfirm :title="`确定删除${row.attrName}吗?`" @confirm="deleteAttr(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" @click="addAttrValue" icon="Plus" :disabled="!attrParams.attrName">
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px" :data="attrParams.attrValueList">
        <el-table-column width="80px" type="index" align="center" label="序号"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input :ref="(vc: any) => inputArr[$index] = vc" size="small" v-if="row.flag" @blur="toLook(row, $index)"
              placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Delete" @click="attrParams.attrValueList.splice($index, 1)">

            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length <= 0">
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
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
let inputArr = ref<any>([])
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

const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
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
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
