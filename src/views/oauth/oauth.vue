


<template
  ><div v-loading="isLoading" class="container">
    <div class="container-bg"></div>
    <div class="nav-top">
      <div>{{ $config.pageTitle }}</div>
      <!-- <div>
        <span class="btn">
          <router-link to="/register">Sign Up</router-link>
        </span>
      </div> -->
    </div>
    <div class="sign-box">
      <h1 class="title">OAuth Sign In</h1>
      <div class="input-box">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <el-form-item prop="email">
            <el-input
              v-model.trim="form.email"
              placeholder="Please enter your email address"
              tabindex="1"
              type="email"
              name="login-email"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              placeholder="Please enter your password"
              type="password"
              name="login-password"
              tabindex="2"
              @keyup.enter.native="signFn"
            />
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="input-box forget">
        <router-link to="/reset">Forget your password?</router-link>
      </div> -->
      <div class="input-box">
        <span class="btn" @click="signFn()">Sign In</span>
      </div>
      <div class="input-box">
        <span id="LoginWithAmazon" class="btn-th" @click="lwaFn('amazon')">Amazon</span>
        <span id="LoginWithGoogle" class="btn-th" @click="lwaFn('google')">Google</span>
      </div>
    </div>
  </div>
</template>
<script>
import { isMiddlePassword, isEmail } from "@/config/validate";
const Qs = require("qs");
export default {
  name: "Oauth",
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value && !isEmail(value))
        callback(new Error("Please enter the correct email address"));
      else callback();
    };
    const validatePassword = (rule, value, callback) => {
      // if (!isMiddlePassword(value))
      //   callback(
      //     new Error(
      //       "The password contains 8~32 digits (two of numbers, letters, symbols)"
      //     )
      //   );
      // else callback();
      callback();
    };
    return {
        state: "",
        client_id: "",
        client_secret: "",
        redirect_uri: "",
        scope: "",
        form: {
            email: "",
            password: "",
        },
      rules: {
        email: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: validateEmail
          }
        ],
        password: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: validatePassword
          }
        ]
      },
      isLoading: false
    };
  },
  created() {
    // 授权成功则调用后端接口
    this.state = this.getUrlQuery('state')
    // this.client_id = this.getUrlQuery('client_id')
    this.client_id = this.$route.query.client_id
    // this.client_secret = this.getUrlQuery('client_secret')
    this.client_secret = this.$route.query.client_secret
    // this.redirect_uri = this.getUrlQuery('redirect_uri')
    this.redirect_uri = this.$route.query.redirect_uri
    this.scope = this.$route.query.scope
    // if (token) {
    //   this.$common.setOtherInfo("token", token);
    //   this.loginByToken(token)
    // }
  },
  mounted() {
  },
  methods: {
    getUrlQuery(key) {
      const query = location.search && location.search.slice(1)
      return Qs.parse(query)[key]
    },
    signFn() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 显示loading
          this.isLoading = true;
          // let data = new FormData();
          // data.append("email", this.email);
          // data.append("password", this.password);

          // 如果方法是query，则直接 const data = {email: '', password:''}
          // ajax方法在src/services/ajax文件中
          // 请求地址配置在src/services/api文件中
          const data = {
            email: this.form.email,
            password: this.$md5(this.form.password),
            state: this.state,
            clientId: this.client_id,
            clientSecret: this.client_secret,
            redirectUri: this.redirect_uri,
            scope: this.scope,
          };
          this.$ajax
            .postData(this.$api.getOauthLoginUserUrl.url, data)
            .then(res => {
              if (res.code == 200) {
                // this.$router.push({ path: "/index" });
                // window.location.href = res.data.url+"?state="+this.state;
                this.$router.push({
                  name: 'Confirm',
                  query: {
                    state: this.state,
                    code: res.data.code,
                    client_id: res.data.client_id,
                    scope: res.data.scope
                  }
                });
              } else {
                this.$store.dispatch("showMessageTip", {
                  type: "error",
                  text: res.msg
                });
              }
              this.isLoading = false;
            })
            .catch(err => {
              this.isLoading = false;
            });
        }
      });
    },
    lwaFn(loginType) {
      // 调用amazon api接口
      // amazon.Login.authorize(
      //   {
      //     scope: "profile",
      //     // scope_data: {
      //     //   profile: { essential: false }
      //     // },
      //     response_type: "code",
      //     pkce: true
      //   },
      //   window.location.href
      // );

      this.$common.setLocal("loginType", loginType)
      this.$ajax
        .getData(this.$api.getAuthLoginUrl.url+loginType)
        .then(res => {
          // console.log(res)
          if (res.code == 200) {
          //   // if (res.data)
          //   //   this.$common.setOtherInfo("token", res.data); // 将token存到缓存中
          //   // 登录成功
          //   // 可以在此写跳转到首页
          //   // this.$router.push({ path: "/index" });
            window.location.href = res.data
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
      // this.$ajax
      //   .getData(this.$api.getUnifyLoginUrl.url+"?loginType="+loginType)
      //   .then(res => {
      //     if (res.code == 200) {
      //       // if (res.data)
      //       //   this.$common.setOtherInfo("token", res.data); // 将token存到缓存中
      //       // 登录成功
      //       // 可以在此写跳转到首页
      //       // this.$router.push({ path: "/index" });
      //       window.location.href = res.data
      //     }
      //     this.isLoading = false;
      //   })
      //   .catch(err => {
      //     this.isLoading = false;
      //   });
    },
    loginByToken(token) {
      // const data = {
      //   token: token,
      // };
      this.$ajax
            .getData(this.$api.getLoginUserUrl.url)
            .then(res => {
              if (res.code == 200) {
                if (res.data) this.$common.setOtherInfo("user", res.data); //
                // 登录成功
                // 可以在此写跳转到首页
                this.$router.push({ path: "/index" });
              } else if (res.code == 403) {
                this.$store.dispatch("showMessageTip", {
                  type: "error",
                  text: res.msg
                });
              }
              this.isLoading = false;
            })
            .catch(err => {
              this.isLoading = false;
            });
        }

    },
};
</script>
<style lang="css" scoped>
#LoginWithAmazon {
  position: relative;
  left: -100px;
}
#LoginWithGoogle {
  position: relative;
  top: -40px;
  left: 120px;
}
</style>
