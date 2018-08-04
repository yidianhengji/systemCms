import * as axios from 'axios'
import Qs from 'qs'
import { getCookie, setCookie } from '@/util/cookie'

let options = {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
}

export default axios.create(options)