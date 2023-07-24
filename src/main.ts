import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引用element-plus插件

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

import 'virtual:svg-icons-register'

import globleComponent from '@/components'
console.log(globleComponent)

app.mount('#app')
