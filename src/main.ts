import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引用element-plus插件

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

import 'virtual:svg-icons-register'

import globleComponent from '@/components'
// 安装自定义插件
app.use(globleComponent)
import '@/style/index.scss'

axios({
  method: 'post',
  url: '/api/user/login',
  data:
  {
      username: 'admin',
      password: '123456',
  }
})

app.mount('#app')
