// 登录接口需要携带的ts类型

export interface loginForm {
  username: string
  password: string
}
interface dataType {
  token?: string,
  message?: string
}

export interface loginResponseData {
  code: number
  data: dataType
}

// 服务器返回用户信息的类型
interface userinfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userinfo
}

export interface userInfoResponseData {
  code: number
  data: user
}
