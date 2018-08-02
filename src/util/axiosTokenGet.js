import * as axios from 'axios'
import Qs from 'qs'

let options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest: [function(data) {
        
        // 对 data 进行任意转换处理
        return Qs.stringify(data, { arrayFormat: 'brackets' })
        debugger
    }],
    paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
    },
}

export default axios.create(options)