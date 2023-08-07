// 统一管理用户相关接口

import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'
//  mock
// import type { loginForm, loginResponseData, userInfoResponseData } from './type'
// enum API {
//   LOGIN_URL = '/user/login',
//   USERINFO_URL = '/user/info',
// }

// export const reqLogin = (data: loginForm) =>
//   request.post<any, loginResponseData>(API.LOGIN_URL, data)
// export const reqUserInfo = () =>
//   request.get<any, userInfoResponseData>(API.USERINFO_URL)
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
