import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*查询所有权限组*/
export function roleQuery(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/query', params).then(data => {
            resolve(data)
        })
    })
}


/*新增权限*/
export function roleAdd(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/add', params).then(data => {
            resolve(data)
        })
    })
}


/*查询所有的菜单*/
export function queryAll(params) {
    return new Promise((resolve, reject) => {
        axiosToken.get(backen + 'permiss/menus/queryAll', params).then(data => {
            resolve(data)
        })
    })
}


/*为用户分配角色*/
export function allocationRole(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/allocationRole', params).then(data => {
            resolve(data)
        })
    })
}