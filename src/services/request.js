import axios from 'axios'
axios.defaults.timeout = 15000 // 超时时间设置
axios.defaults.withCredentials = true // 是否跨域
axios.defaults.baseURL='http://localhost:8002'

// Content-Type 响应头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 获取验证码接口
export const getCaptcha = params => {
    return axios.get(`/auth/getCaptcha?dateStr=`+params,{responseType: 'blob'})
  }