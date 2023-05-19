const baseURL = "http://localhost:8002";

export default {
  login: {
    url: baseURL + "/user/login", // 登录接口
    method: "post"
  },
  signOut: {
    url: baseURL + "/user/logout", // 登出接口
    method: "get"
  },
  register: {
    url: baseURL + "/user/register", // 注册接口
    method: "post"
  },
  reset: {
    url: baseURL + "/user/reset", //忘记密码
    method: "post"
  },
  getCaptchaUrl:{
    url: baseURL + "/auth/getCaptcha", //获取验证码图片
    method: "get"
  },
  getDeviceListUrl:{
    url: baseURL + "/device/list", //获取设备列表
    method: "get"
  },
  getDeviceNoListUrl:{
    url: baseURL + "/device/uid/list", //获取设备UID列表
    method: "get"
  },
  getFcmSingleSendUrl:{
    url: baseURL + "/fcm/sendMsg", //获取设备UID列表
    method: "post"
  },
  getFcmBatchSendUrl:{
    url: baseURL + "/batch/token/sendMsg", //获取设备UID列表
    method: "post"
  },
  getUploadUrl:{
    url: baseURL + "/minio/upload", //文件上传接口
    method: "post"
  },
  getFileUrl:{
    url: baseURL + "/minio/getFileUrl", //文件路径接口
    method: "post"
  },
  getAwsLoginUrl:{
    url: baseURL + "/amazon/login", //awslogin
    method: "get"
  },
  getUnifyLoginUrl:{
    url: baseURL + "/v1/api/loginByThird", //awslogin
    method: "get"
  },
  getLoginByCode:{
    url: baseURL + "/v1/oa", //awslogin
    method: "get"
  }
};
