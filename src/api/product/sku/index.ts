// SKU接口管理

import request from '@/utils/request'
import type { SkuResponseData,SkuInfoData } from './type'
enum API {
  SKU_URL = '/admin/product/list/',
  SAVE_URL = '/admin/product/onSale/',
  CANCEL_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETE_URL = '/admin/product/deleteSku/'
}

export const reqSkuList = (pageNum: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${pageNum}/${limit}`)

export const reqSaveSku = (skuId: number) => request.get<any, any>(API.SAVE_URL + skuId)
export const reqCancelSku = (skuId: number) => request.get<any, any>(API.CANCEL_URL + skuId)
export const reqDeleteSku = (skuId: number) => request.delete<any, any>(API.DELETE_URL + skuId)
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)