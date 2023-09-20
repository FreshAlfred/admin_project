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
          @click="addPermission"
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
        <el-button
          type="primary"
          size="small"
          @click=""
          :disabled="row.level === 1"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="添加菜单">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入菜单名称~"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请输入菜单权限值~"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="default" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqAllPermission } from '@/api/acl/menu'
import type {
  PermissionResponseData,
  PermissionList,
  Permission,
} from '@/api/acl/menu/type'

let dialogVisible = ref<boolean>(false)
let allPermissionArr = ref<PermissionList>([])
onMounted(() => {
  getHasPermission()
})
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    allPermissionArr.value = result.data
  }
}
const addPermission = () => {
  dialogVisible.value = true
}

const updatePermission = (row: Permission) => {
  dialogVisible.value = true
}
</script>

<style scoped></style>
