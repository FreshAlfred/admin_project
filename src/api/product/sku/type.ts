export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Attr {
  attrId: number | string
  valueId: number | string
}
export interface saleAttr {
  saleAttrId: number | string
  saleAttrValueId: number | string
}
export interface SkuData {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
  skuDefaultImg: string
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: number
    maxLimit: number
    searchCount: boolean
    pages: number
  }
}
