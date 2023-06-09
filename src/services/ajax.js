import Axios from "axios";
import Vue from "vue";
const Qs = require("qs");

let _options = options => {
  return options || {};
};

/**
 * url添加query参数，默认带上token
 * @param token
 * @param params
 */

const addQueryString = (token = true, params) => {
  let obj = {};
  if (token) {
    obj = Object.assign({}, obj, {});
  }
  if (params) {
    obj = Object.assign({}, obj, params);
  }
  return obj;
};

let _request = (method, url, data, options) => {
  let reqestOptions = {
    method: method,
    data: data,
    url: url,
    timeout: 1000 * 60 * 10, // 接口超时时间
    paramsSerializer: function(params) {
      return Qs.stringify(params, {
        arrayFormat: "brackets"
      });
    }
  };

  if (options.headers) {
    reqestOptions.headers = options.headers;
    reqestOptions.headers.Authorization = Vue.prototype.$common.getOtherInfo("token") //这里是放token的
  } else {
    if (!options.isToken) {
      reqestOptions.headers = {};
      reqestOptions.headers = {
        Authorization: Vue.prototype.$common.getOtherInfo("token") //这里是放token的
      };
    }
  }

  if (options.blobType) {
    reqestOptions.responseType = "blob";
  }

  reqestOptions.params = Object.assign(
    {},
    reqestOptions.params,
    addQueryString(options.token, options.params)
  );
  return new Promise((resolve, reject) => {
    Axios.request(reqestOptions)
      .then(res => {
        var result = res.code ? res.code : res.status
        if (res && result != 200)
          Vue.prototype.$store.dispatch("showMessageTip", {
            type: "error",
            text: res.msg || "网络或未知错误"
          });
        if (res && res.code == 4002) Vue.prototype.$router.push("/login"); // 没有登录 直接登出
        resolve(res.data ? res.data : res);
      })
      .catch(err => {
        if (err && err.message)
          Vue.prototype.$store.dispatch("showMessageTip", {
            type: "error",
            text: err.message || "网络或未知错误"
          });
        reject(err);
      });
  });
};

/*
 * GET/POST data
 * @param url api地址
 * @param options 配置项
 * @param data 需要提交的数据
 */

const ajax = {
  getData(url, options) {
    return _request("get", url, null, _options(options));
  },
  postData(url, data, options) {
    return _request("post", url, data, _options(options));
  },
  patchData(url, data, options) {
    return _request("PATCH", url, data, _options(options));
  },
  putData(url, data, options) {
    return _request("put", url, data, _options(options));
  },
  deleteData(url, data, options) {
    return _request("delete", url, data, _options(options));
  }
};

export { ajax };
