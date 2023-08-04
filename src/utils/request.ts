// 进行axios的二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    let message = ''
    let status = err.response.status
    switch (status) {
      case 401:
        message = '登录过期,请重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求的资源不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(err)
  },
)
export default request
