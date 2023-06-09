const baseURL = "http://localhost:8080";

export default {
  login: {
    url: baseURL + "/auth/login", // 登录接口
    method: "post"
  },
  userInfo: {
    url: baseURL + "/user/info", // 登录接口
    method: "get"
  },
  getRouter: {
    url: baseURL + "/menu/getRouter", // 登录接口
    method: "get"
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
  getAuthLoginUrl:{
    url: baseURL + "/oauth/login/", //awslogin
    method: "get"
  },
  getUnifyLoginUrl:{
    url: baseURL + "/v1/api/loginByThird", //awslogin
    method: "get"
  },
  getLoginByCode:{
    url: baseURL + "/v1/oa", //awslogin
    method: "get"
  },
  getAddThirdClientUrl:{
    url: baseURL + "/third/oauth/add", //awslogin
    method: "post"
  },
  getThirdClientListUrl:{
    url: baseURL + "/third/oauth/list", //awslogin
    method: "post"
  },
  getLoginByTokenUrl:{
    url: baseURL + "/user/loginByToken", //awslogin
    method: "post"
  },
  getLoginUserUrl:{
    url: baseURL + "/user/info", //awslogin
    method: "get"
  },
  getOauthLoginUserUrl:{
    url: baseURL + "/oauth/login", //awslogin
    method: "get"
  },
  getOauthCallbackUrl:{
    url: baseURL + "/oauth/callback", //awslogin
    method: "get"
  }
};
