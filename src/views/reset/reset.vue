<template
  ><div class="container">
    <div class="bg-img"></div>
    <div class="container-bg"></div>
    <div class="nav-top">
      <div>{{ $config.pageTitle }}</div>
      <div>
        <span class="btn">
          <router-link to="/login">Sign In</router-link>
        </span>
      </div>
    </div>
    <div class="sign-box">
      <h1 class="title">Reset</h1>
      <div class="input-box">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="reset-form"
          label-position="left"
        >
          <el-form-item prop="email">
            <el-input
              v-model.trim="form.email"
              placeholder="Please enter your email address"
              tabindex="1"
              type="email"
              name="reset-email"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              placeholder="Please enter your password"
              type="password"
              name="reset-password"
              tabindex="2"
            />
          </el-form-item>
          <el-form-item prop="conPassword">
            <el-input
              v-model.trim="form.conPassword"
              placeholder="Please confirm your password"
              type="password"
              name="reset-con-password"
              tabindex="3"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              v-model.trim="form.captcha"
              placeholder="Captcha"
              type="text"
              name="reset-captcha"
              tabindex="4"
              @keyup.enter.native="resetFn"
            />
            <img v-if="captchaImg" :src="captchaImg" alt="" class="code-img" />
          </el-form-item>
        </el-form>
      </div>
      <div class="input-box">
        <span class="btn" @click="resetFn()">Reset</span>
      </div>
    </div>
  </div>
</template>
<script>
import { isEmail, isMiddlePassword } from "@/config/validate.js";
import { getCaptcha } from "@/services/request";
export default {
  name: "Reset",
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value && !isEmail(value))
        callback(new Error("Please enter the correct email address"));
      else callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (!isMiddlePassword(value))
        callback(
          new Error(
            "The password contains 8~32 digits (two of numbers, letters, symbols)"
          )
        );
      else callback();
    };
    const confirmPassword = (rule, value, callback) => {
      if (!isMiddlePassword(value)) {
        callback(
          new Error(
            "Confirm password contains 8~32 digits (two of numbers, letters, symbols)"
          )
        );
      } else {
        if (value == this.form.password) {
          callback();
        } else {
          callback("Confirm password must be consistent with password");
        }
      }
    };
    return {
      form: {
        email: "",
        captcha: "",
        conPassword: "",
        password: ""
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
        ],
        conPassword: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: confirmPassword
          }
        ],
        captcha: [
          {
            required: true,
            trigger: ["blur", "change"],
            placeholder: "Please enter the captcha"
          }
        ]
      },
      captchaImg: "" // 这个是验证码图片的位置
      // timestamp: ""
    };
  },
  created() {
    this.getCaptchaUrl();
  },
  methods: {
    getCaptchaUrl() {
      this.captchaImg = "";
      // 这里可以调get方法获取图片url
      getCaptcha().then(res => {
        if (res.status == 200) {
          // let url = window.URL.createObjectURL(new Blob([res.data],{type: "image/png"}))
          this.captchaImg = window.URL.createObjectURL(res.data);
        }
      });
      // this.$ajax
      //   .getData(
      //     this.$api.getCaptchaUrl.url,
      //     {
      //       params: {},
      //       headers: {}
      //     },
      //     {
      //       responseType: true
      //     }
      //   )
      //   .then(res => {
      //     console.log(res)
      //     // if (res.status == 200) {
      //     //   console.log(res)
      //     this.captchaImg = window.URL.createObjectURL(new Blob([res],{type: "image/png"}))
      //     // this.captchaImg = window.URL.createObjectURL(res);
      //     console.log(this.captchaImg)
      //     // this.captchaImg = res.data.url || "";
      //     // }
      //   })
      //   .catch(err => {});
    },
    resetFn() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 验证通过后调接口
          const data = {
            email: this.form.email,
            password: this.$md5(this.form.password),
            code: this.form.captcha
          };
          this.$ajax
            .postData(this.$api.reset.url, data)
            .then(res => {
              if (res.code == 200) {
                this.$store.dispatch("showMessageTip", {
                  type: "info",
                  text: "Password reset succeeded"
                });
                this.$router.push({ path: "/login" });
              }
              // 隐藏loading
              this.$jquery("#appLoading").hide(100);
            })
            .catch(err => {
              // 隐藏loading
              this.$jquery("#appLoading").hide(100);
            });
        }
      });
    }
  }
};
</script>
<style lang="css" scoped></style>
