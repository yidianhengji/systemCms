import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'


/*查询全部*/
export function queryList(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'shop/queryList', params).then(data => {
            resolve(data)
        })
    })
}


/*新增*/
export function add(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'shop/add', params).then(data => {
            resolve(data)
        })
    })
}


/*修改*/
export function update(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'shop/update', params).then(data => {
            resolve(data)
        })
    })
}


/*查询单个*/
export function queryOne(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'shop/queryOne', params).then(data => {
            resolve(data)
        })
    })
}