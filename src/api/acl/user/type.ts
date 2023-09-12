export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  phone?: string
  name?: string
  roleName?: string
}

export type Records = User[]

export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}


export interface RoleData {
  id?: number,
  createTime?: string,
  updateTime?: string,
  roleName: string,
  remark: string
}

export type AllRole = RoleData[]

export interface RoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole,
    allRolesList: AllRole
  }
}

export interface SetRoleData {
  userId: number,
  roleIdList: number[]
}