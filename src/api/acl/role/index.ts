import request from '@/utils/request'
import { RoleResponseData, RoleData, MenuResponseData } from './type'

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

export const reqAllRoleList = (
  page: number,
  limit: number,
  roleName: string,
) => {
  return request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`,
  )
}

export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

export const reqAllMenuList = (roleId: number) => {
  return request.get<any, MenuResponseData>(API.ALLPERMISSION + roleId)
}

export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
}

export const reqDeleteRole = (roleId: number) => {
  return request.delete<any, any>(API.DELETEROLE_URL + roleId)
}
