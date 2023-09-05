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
    <el-button type="primary" size="default" @click="">添加用户</el-button>
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
          <el-button type="primary" size="small" @click="" icon="User">
            分配角色
          </el-button>
          <el-button type="primary" size="small" @click="" icon="Edit">
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
      @current-change="getHasUser"
      @size-change="handler(row)"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqUserInfo } from '@/api/acl/user'
import type { UserResponseData, Records } from '@/api/acl/user/type'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
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
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
