import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'

/*查询全部*/
export function query(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/query', params).then(data => {
      resolve(data)
    })
  })
}
