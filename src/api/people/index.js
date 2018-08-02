import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*查询全部*/
export function query(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'people/query', params).then(data => {
            resolve(data)
        })
    })
}



/*新增*/
export function add(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'people/add', params).then(data => {
            resolve(data)
        })
    })
}

