import request from "@/utils/request";
import type {CategoryResponseData} from './type'
enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/{category1Id}',
    C3_UEL = '/admin/product/getCategory3/{category2Id}'
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (category1Id: number) => request.get<any, CategoryResponseData>(API.C2_URL + `/${category1Id}`);
export const reqC3 = (category2Id: number) => request.get<any, CategoryResponseData>(API.C3_UEL + `/${category2Id}`);