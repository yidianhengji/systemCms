import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*分页查询权限组*/
export function roleQuery(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/query', params).then(data => {
            resolve(data)
        })
    })
}


/*新增权限组*/
export function roleAdd(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/add', params).then(data => {
            resolve(data)
        })
    })
}


/*修改权限组*/
export function roleUpdate(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/update', params).then(data => {
            resolve(data)
        })
    })
}


/*单个查询权限组*/
export function roleQueryOne(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/queryOne', params).then(data => {
            resolve(data)
        })
    })
}


/*删除权限组*/
export function roleDel(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/role/del', params).then(data => {
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


/*根据权限组id查询已有的菜单*/
export function queryByRoleId(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/menus/queryByRoleId', params).then(data => {
            resolve(data)
        })
    })
}


/*给权限组赋权限*/
export function givePermiss(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/rolepower/givePermiss', params).then(data => {
            resolve(data)
        })
    })
}


/*查询所有管理员*/
export function userQueryAll(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/user/queryAll', params).then(data => {
            resolve(data)
        })
    })
}


/*新增管理员*/
export function userQueryRegister(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/user/register', params).then(data => {
            resolve(data)
        })
    })
}


/*修改管理员*/
export function userQueryUpdate(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/user/update', params).then(data => {
            resolve(data)
        })
    })
}


/*单个查询*/
export function userQueryQueryOne(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'permiss/user/queryOne', params).then(data => {
            resolve(data)
        })
    })
}