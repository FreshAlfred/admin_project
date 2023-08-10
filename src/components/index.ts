import SvgIcon from '@/components/SvgIcon/index.vue';
import Category from '@/components/Category/index.vue';
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents = {
  SvgIcon, Category
}

export default {
  install(app: App) {
    // 必须是install方法
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
