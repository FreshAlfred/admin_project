<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入搜索职位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="">搜索</el-button>
        <el-button type="primary" size="default" @click="">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" size="default" @click="" icon="Plus">
      添加职位
    </el-button>
    <el-table border style="margin: 10px 0">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center"></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作"
        width="260px"
        align="center"
      ></el-table-column>
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
import { ref } from 'vue'

let pageNo = ref(1)
let pageSize = ref(5)
let total = ref(100)
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
