// 定义小仓库数据state类型
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}


export interface CategoryState {
  c1Id: string | number,
  c1Arr: CategoryObj[]
}