// 创建用户相关的小仓库
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'

import { defineStore } from 'pinia'
import { routes } from '@/router'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'

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
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
