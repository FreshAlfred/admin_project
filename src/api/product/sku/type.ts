export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Attr {
  attrId: number | string
  valueId: number | string
  attrName?: string
  id?: number
}
export interface saleAttr {
  saleAttrId: number | string
  saleAttrValueId: number | string
  id?: number
  saleAttrValueName?: string
}
export interface SkuData {
  category3Id?: number | string
  spuId?: number | string
  tmId?: number | string
  skuName?: string
  price?: number | string
  weight?: number | string
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
  skuImageList?: [
    {
      id?: number
      skuId?: number
      imgUrl?: string
    },
  ]
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

// 获取SKU商详情
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
