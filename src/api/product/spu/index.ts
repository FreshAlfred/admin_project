import request from '@/utils/request'
import type {
  HasSaleAttrResponseData,
  HasSpuResponseData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  SkuData,
  SkuInfoData,
} from './type'
enum API {
  HASSPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  ALLIMAGEOFSPU = '/admin/product/spuImageList/',
  SPUHASSALEATTR = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR = '/admin/product/baseSaleAttrList',
  // 追加和修改SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 追加新增SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  SKUINFO_URL = '/admin/product/findBySpuId/',
  DELETESUP_URL = '/admin/product/deleteSpu/',
}

export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

export const reqAllTrademark = () =>
  request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.ALLIMAGEOFSPU + spuId)

export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR + spuId)

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR)

export const reqAddOrUpdateSpu = (data: any) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)

export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)

export const reqSpuDelete = (spuId: number | string) =>
  request.delete<any, any>(API.DELETESUP_URL + spuId)
