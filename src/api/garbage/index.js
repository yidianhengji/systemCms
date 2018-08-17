import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'


/*新增*/
export function add(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'garbage/add', params).then(data => {
            resolve(data)
        })
    })
}


/*修改*/
export function update(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'garbage/update', params).then(data => {
            resolve(data)
        })
    })
}


/*查询*/
export function queryOne(params) {
    return new Promise((resolve, reject) => {
        axiosToken.get(backen + 'garbage/queryOne', {params: params}).then(data => {
            resolve(data)
        })
    })
}
