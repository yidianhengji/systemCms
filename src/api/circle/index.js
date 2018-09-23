import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'

/*查询所有圈子*/
export function query(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'circle/query', params).then(data => {
      resolve(data)
    })
  })
}

/*新增圈子*/
export function add(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'circle/add', params).then(data => {
      resolve(data)
    })
  })
}

/*修改圈子*/
export function update(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'circle/update', params).then(data => {
      resolve(data)
    })
  })
}

/*单个查询圈子*/
export function queryOne(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'circle/queryOne', params).then(data => {
      resolve(data)
    })
  })
}

/*删除圈子*/
export function del(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'circle/del', params).then(data => {
      resolve(data)
    })
  })
}
