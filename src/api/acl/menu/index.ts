import request from '@/utils/request'
import type { PermissionResponseData } from './type'

enum API {
  ALLPERMISSION = 'admin/acl/permission',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION)
