import { backen } from '@/path/path'
import axiosToken from '@/util/mutipartAxios'


/*查询用户列表*/
export function uploadFile(params) {
    return new Promise((resolve, reject) => {
        let param = new FormData();
        if(params.length==undefined){
            param.append('file', params);
        }else {
            for(var i=0;i<params.length;i++){
                param.append('file', params[i]);
            }
        }
        axiosToken.post(backen + 'file/upload', param).then(data => {
            resolve(data)
        })
    })
}


