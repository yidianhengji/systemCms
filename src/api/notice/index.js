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


/*新增*/
export function add(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/add', params).then(data => {
      resolve(data)
    })
  })
}


/*修改*/
export function update(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/update', params).then(data => {
      resolve(data)
    })
  })
}


/*单个查询*/
export function queryOne(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/queryOne', params).then(data => {
      resolve(data)
    })
  })
}
