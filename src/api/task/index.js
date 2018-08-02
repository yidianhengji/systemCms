import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'



/*查询任务列表*/
export function taskQuery(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'task/query', params).then(data => {
            resolve(data)
        })
    })
}



/*新增任务*/
export function taskAdd(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'task/add', params).then(data => {
            resolve(data)
        })
    })
}



/*删除任务*/
export function taskDel(params) {
    return new Promise((resolve, reject) => {
        axiosTokenGet.get(backen + 'task/del', { params: params }).then(data => {
            resolve(data)
        })
    })
}



/*查询活动列表*/
export function activityQuery(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'activity/query', params).then(data => {
            resolve(data)
        })
    })
}



/*新增活动*/
export function activityAdd(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'activity/add', params).then(data => {
            resolve(data)
        })
    })
}



/*删除活动*/
export function activityDel(params) {
    return new Promise((resolve, reject) => {
        axiosTokenGet.get(backen + 'activity/del', { params: params }).then(data => {
            resolve(data)
        })
    })
}