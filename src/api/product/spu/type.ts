export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string // 品牌id
  spuSaleAttrList: null | SpuSaleAttr[]
  spuImgList: null | SpuImage[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}

// 图片
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  name?: string
  url?: string
}

export interface SpuHasImg extends ResponseData {
  data: SpuImage[]
}

// 销售属性

export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName?: string
  saleAttrValueName?: string
  isChecked?: null
}

export type spuSaleAttrValueList = SaleAttrValue[]

export interface SpuSaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

export interface SaleAttrResponseData extends ResponseData {
  data: SpuSaleAttr[]
}

export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
