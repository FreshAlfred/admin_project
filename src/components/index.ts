import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'

const allGlobalComponents = {
  SvgIcon,
}

export default {
  install(app: App) {
    // 必须是install方法
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
  },
}
