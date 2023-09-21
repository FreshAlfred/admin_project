import request from '@/utils/request'
import type { PermissionResponseData, MenuParamas } from './type'

enum API {
  ALLPERMISSION = '/admin/acl/permission',
  ADDPERMISSION = '/admin/acl/permission/save',
  UPDATEPERMISSION = '/admin/acl/permission/update',
  DELETEPERMISSION = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION)

export const reqAddOrUpdatePermission = (data: MenuParamas) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPERMISSION, data)
  } else {
    return request.post<any, any>(API.ADDPERMISSION, data)
  }
}

export const reqDeletePermission = (id: number) => {
  return request.delete<any, any>(API.DELETEPERMISSION + id)
}
