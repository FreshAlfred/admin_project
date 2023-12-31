export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Permission {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: PermissionList
  select: boolean
}

export type PermissionList = Permission[]

export interface PermissionResponseData extends ResponseData {
  data: PermissionList
}

export interface MenuParamas {
  id?: number
  code: string
  name: string
  level: number
  pid: number
}
