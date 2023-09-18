import request from '@/utils/request'
import { RoleResponseData, RoleData } from './type'

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
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
