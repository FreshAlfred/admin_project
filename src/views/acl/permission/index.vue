<template>
  <el-table
    :data="allPermissionArr"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, $index }">
        <el-button
          type="primary"
          size="small"
          @click="addPermission(row)"
          :disabled="row.level === 4"
        >
          {{ row.level <= 2 ? '添加菜单' : '添加功能' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="updatePermission(row)"
          :disabled="row.level === 1"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`您确定要删除${row.name}吗?`"
          @confirm="deletePermission(row.id)"
          width="260"
        >
          <template #reference>
            <el-button type="primary" size="small" :disabled="row.level === 1">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '修改菜单' : '添加菜单'"
  >
    <el-form>
      <el-form-item label="名称">
        <el-input
          placeholder="请输入菜单名称~"
          v-model="menuData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input
          placeholder="请输入菜单权限值~"
          v-model="menuData.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="default" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdatePermission,
  reqDeletePermission,
} from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PermissionList,
  Permission,
  MenuParamas,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

let dialogVisible = ref<boolean>(false)
let allPermissionArr = ref<PermissionList>([])
let menuData = reactive<MenuParamas>({
  name: '',
  code: '',
  pid: 0,
  level: 0,
})
onMounted(() => {
  getHasPermission()
})
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    allPermissionArr.value = result.data
  }
}
const addPermission = (row: Permission) => {
  Object.assign(menuData, {
    name: '',
    code: '',
    pid: 0,
    level: 0,
    id: 0,
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id as number
}

const updatePermission = (row: Permission) => {
  Object.assign(menuData, row)
  dialogVisible.value = true
}
const save = async () => {
  let result: any = await reqAddOrUpdatePermission(menuData)
  if (result.code === 200) {
    dialogVisible.value = false
    ElMessage.success(menuData.id ? '修改成功' : '添加成功')
    getHasPermission()
  } else {
    ElMessage.error(menuData.id ? '修改失败' : '添加失败')
  }
}
const deletePermission = async (id: number) => {
  let result = await reqDeletePermission(id)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getHasPermission()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped></style>
