<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>hello</h1>
          <h2>欢迎来到Alfred甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="login"
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
let $route = useRoute()
let router = useRouter()
let loading = ref(false)
let loginForms = ref()
const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    let redirect = $route.query.redirect as string
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
let loginForm = reactive({
  username: 'admin',
  password: '123456',
})
const validatorUsername = (rules: any, value: any, callback: any) => {
  // rulers为校验对象, value为校验的值
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('账号5~10位'))
  }
}
const validatorPassword = (rules: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码6~10位'))
  }
}

const rules = {
  username: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: '长度在 6 到 10 个字符',
    //   trigger: 'change',
    // },
    { trigger: 'change', validator: validatorUsername },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: '长度在 6 到 10 个字符',
    //   trigger: 'change',
    // },
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
