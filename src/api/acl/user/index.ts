import request from '@/utils/request'
import type { UserResponseData } from '@/types'

enum API {
  ALLUSER_URL = '/admin/acl/user/',
}

export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
