import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'

/*查询所有建议投诉*/
export function query(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'complaint/query', params).then(data => {
      resolve(data)
    })
  })
}

/*新增建议投诉*/
export function add(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'complaint/add', params).then(data => {
      resolve(data)
    })
  })
}

/*修改建议投诉*/
export function update(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'complaint/update', params).then(data => {
      resolve(data)
    })
  })
}

/*单个查询建议投诉*/
export function queryOne(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'complaint/queryOne', params).then(data => {
      resolve(data)
    })
  })
}

export function del(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'complaint/del', params).then(data => {
      resolve(data)
    })
  })
}
