// SKU接口管理

import request from '@/utils/request'
import type { SkuResponseData } from './type'
enum API {
  SKU_URL = '/admin/product/list/',
}

export const reqSkuList = (pageNum: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${pageNum}/${limit}`)