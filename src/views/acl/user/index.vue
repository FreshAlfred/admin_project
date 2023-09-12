<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入搜索的用户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="">搜索</el-button>
        <el-button type="primary" size="default" @click="">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button type="primary" size="default" @click="">批量删除</el-button>
    <el-table style="margin: 10px 0" :data="userArr">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="#" type="index"></el-table-column>
      <el-table-column align="center" prop="id" label="id"></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="username"
        label="用户名"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="name"
        label="用户名称"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="roleName"
        label="用户角色"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="createTime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="updateTime"
        label="更新时间"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click="setRole(row)"
            icon="User"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="updateUser(row)"
            icon="Edit"
          >
            编辑
          </el-button>
          <el-popconfirm :title="`你确定要删除${row.username}吗`" width="260px" @confirm="deleteUser(row.id)">
            <template #reference>
              <el-button type="primary" size="small" @click="" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      @current-change="getHasUser"
      @size-change="handler(row)"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '编辑用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配用户角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedChange">
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div>
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqDeleteAllUser,
  reqDeleteUser
} from '@/api/acl/user'
import type {
  UserResponseData,
  Records,
  User,
  RoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])

let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)

let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])
// 收集用户的响应式数据
let userParams = reactive<User>({
  username: '',
  password: '',
  name: '',
})
let formRef = ref<any>()
onMounted(() => {
  getHasUser()
})
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code == 200) {
    userArr.value = result.data.records
    total.value = result.data.total
  }
}
const handler = () => {
  getHasUser()
}
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    username: '',
    password: '',
    name: '',
    id: 0,
  })
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
const save = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '添加成功',
    })
    // getHasUser(userParams.id ? pageNo.value : 1)
    // 刷新会去第一页所以这行判断可以省略。
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '添加失败',
    })
  }
}
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('账号必须大于5位'))
  }
}
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('昵称必须大于5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6 && value.trim().length <= 10) {
    callback()
  } else {
    callback(new Error('密码必须6~10位'))
  }
}
// 表单校验
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
const setRole = async (row: User) => {
  Object.assign(userParams, row)
  let result: RoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    drawer1.value = true
  }
}

const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

const handleCheckedChange = (value: AllRole) => {
  let checkedCount = userRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}
const confirmClick = async () => {
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id as number),
  }
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配角色成功',
    })
    drawer1.value = false
    getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '分配角色失败',
    })
  }
}
const deleteUser = async (userId: number) => {
  let result = await reqDeleteUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length >1?pageNo.value:pageNo.value-1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
