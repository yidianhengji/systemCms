import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'


/*新增社区*/
export function communityAdd(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'community/add', params).then(data => {
            resolve(data)
        })
    })
}



/*查询社区*/
export function communityQuery(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'community/query', params).then(data => {
            resolve(data)
        })
    })
}