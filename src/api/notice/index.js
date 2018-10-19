import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'

/*查询全部*/
export function query(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/queryAll', params).then(data => {
      resolve(data)
    })
  })
}

export function update(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/update', params).then(data => {
      resolve(data)
    })
  })
}

export function queryOne(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/queryOne', params).then(data => {
      resolve(data)
    })
  })
}

export function add(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'notices/add', params).then(data => {
      resolve(data)
    })
  })
}
