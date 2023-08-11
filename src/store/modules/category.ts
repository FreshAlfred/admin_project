// 商品分类全局组件小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
    }
  },
  actions: {
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
