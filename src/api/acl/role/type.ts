export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: string
}

export type Records = RoleData[]
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
// 菜单按钮数据
export interface MenuData {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: number | null
  level: number
  children: []
  select: boolean
}
