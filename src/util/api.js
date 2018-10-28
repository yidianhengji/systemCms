import axios from 'axios';
import Qs from 'qs';
import Vuex from 'vuex';

/**
 * ajax 方法类
 */

const optionsForJson = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

const optionsForToken = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  transformRequest: [data => Qs.stringify(data, { arrayFormat: 'brackets' }),
  ],
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
};

const optionsForNoToken = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  transformRequest: [data => Qs.stringify(data, { arrayFormat: 'brackets' }),
  ],
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
};

const ajax = {
  axiosJson: axios.create(optionsForJson),
  axiosTokenL: axios.create(optionsForToken),
  axiosTokenNo: axios.create(optionsForNoToken),
};

/**
 * GET  带token  表单
 */
function getAndToken(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosTokenL.get(path, { params }).then((res) => {
      if (res.data.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}

/**
 * POST  带token  表单
 */
function postAndToken(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosTokenL.post(path, params).then((res) => {
      if (res.data.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}

/**
 * POST  json
 */
function postAndJson(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosJson.post(path, params).then((res) => {
      if (res.data.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}

export default {
  getAndToken,
  postAndToken,
  postAndJson,
  ajax,
};
