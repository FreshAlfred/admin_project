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
    <el-button type="primary" size="default" @click="" icon="Plus">
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
          <el-button type="primary" size="small" @click="" icon="User">
            分配权限
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
      @current-change="getHasRole"
      @size-change="sizeChange"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqAllRoleList } from '@/api/acl/role'
import type { RoleResponseData, Records } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
let settingStore = useLayoutSettingStore()
let pageNo = ref(1)
let pageSize = ref(1)
let total = ref(100)
let keyword = ref('')
let allRoleArr = ref<Records>([])
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  console.log(result)
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
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
