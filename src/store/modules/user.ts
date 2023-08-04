// 创建用户相关的小仓库
import { reqLogin, reqUserInfo } from '@/api/user'

import { defineStore } from 'pinia'
import { routes } from '@/router'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: routes,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async userInfo() {
      let result = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN();
    }
  },
  getters: {},
})

export default useUserStore
