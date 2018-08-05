import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'


/*登录*/
export function login(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'user/login', params).then(data => {
            resolve(data)
        })
    })
}


/*退出*/
export function signOut(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'user/signOut', params).then(data => {
            resolve(data)
        })
    })
}