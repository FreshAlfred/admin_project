<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入搜索职位" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="search"
          :disabled="!keyword"
        >
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" size="default" @click="addRole" icon="Plus">
      添加职位
    </el-button>
    <el-table border style="margin: 10px 0" :data="allRoleArr">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click="setPermission"
            icon="User"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="updateRole(row)"
            icon="Edit"
          >
            编辑
          </el-button>
          <el-button type="primary" size="small" @click="" icon="Delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      @current-change="getHasRole"
      @size-change="sizeChange"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    :title="roleParams.id ? '更新职位' : '添加职位'"
  >
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input
          placeholder="请您输入职位名称"
          v-model="roleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!-- 抽屉组件，分配职位权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree></el-tree>
    </template>
    <template #footer>
      <el-button size="default" @click="drawer = false">取消</el-button>
      <el-button type="primary" size="default" @click="">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqAllRoleList, reqAddOrUpdateRole } from '@/api/acl/role'
import type { RoleResponseData, Records, RoleData } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
let settingStore = useLayoutSettingStore()
let pageNo = ref(1)
let pageSize = ref(5)
let total = ref(100)
let keyword = ref('')
let allRoleArr = ref<Records>([])
let dialogVisible = ref<boolean>(false)
let form = ref<any>()
let roleParams = reactive<RoleData>({
  roleName: '',
})
let drawer = ref<boolean>(false)
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )

  if (result.code == 200) {
    allRoleArr.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  getHasRole()
})
const sizeChange = () => {
  getHasRole()
}
const search = () => {
  getHasRole()
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
const addRole = () => {
  dialogVisible.value = true
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  nextTick(() => {
    form.value.clearValidate()
  })
}
const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    form.value.clearValidate()
  })
}

const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位！'))
  }
}
// 职位的校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}

const save = async () => {
  await form.value.validate()
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    dialogVisible.value = false
    getHasRole(roleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新失败' : '添加失败',
    })
    dialogVisible.value = false
  }
}
const setPermission = () => {
  drawer.value = true
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
