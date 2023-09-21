<template>
  <el-card>
    <div class="box-card">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好,{{ userStore.username }}</h3>
        <p class="subTitle">欢迎来到Alfred后台管理系统</p>
      </div>
    </div>
  </el-card>
  <div class="bottom_svg">
    <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
  </div>
  <div class="test_box"></div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
@mixin test {
  background-color: black;
}
.test_box {
  width: 100px;
  height: 100px;
  background-color: orange;
  &:hover {
    background-color: skyblue;
  }
}
.box-card {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subTitle {
      font-style: italic;
      color: skyblue;
      font-size: 20px;
    }
  }
}

.bottom_svg {
  display: flex;
  justify-content: center;
}
</style>
