import request from '@/utils/request'
import type {HasSaleAttrResponseData,HasSpuResponseData, AllTrademark, SpuImage, SaleAttrResponseData} from './type'
enum API {
    HASSPU_URL = '/admin/product/',
    ALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
    ALLIMAGEOFSPU = '/admin/product/spuImageList/',
    SPUHASSALEATTR = '/admin/product/spuSaleAttrList/',
    ALLSALEATTR = '/admin/product/baseSaleAttrList'
}

export const reqHasSpu = (page: number, limit: number, category3Id: number | string) =>
    request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

export const reqAllTrademark = () => request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) => request.get<any, SpuImage>(API.ALLIMAGEOFSPU + spuId)

export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR + spuId)

export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR)
