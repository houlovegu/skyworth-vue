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
      <h1 class="title">Sign Up</h1>
      <div class="input-box">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="register-form"
          label-position="left"
        >
          <el-form-item prop="email">
            <el-input
              v-model.trim="form.email"
              placeholder="Please enter your email address"
              tabindex="1"
              type="email"
              name="register-email"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              placeholder="Please enter your password"
              type="password"
              name="register-password"
              tabindex="2"
            />
          </el-form-item>
          <el-form-item prop="conPassword">
            <el-input
              v-model.trim="form.conPassword"
              placeholder="Please confirm your password"
              type="password"
              name="register-con-password"
              tabindex="2"
              @keyup.enter.native="registerFn"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="input-box">
        <span class="btn" @click="registerFn()">Sign Up</span>
      </div>
    </div>
  </div>
</template>
<script>
import { isMiddlePassword, isEmail } from "@/config/validate";
export default {
  name: "Register",
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
        password: "",
        conPassword: ""
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
        ]
      }
    };
  },
  created() {},
  methods: {
    registerFn() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 显示loading
          this.$loading({});
          const data = {
            email: this.form.email,
            password: this.$md5(this.form.password)
          };
          this.$ajax
            .postData(this.$api.register.url, data)
            .then(res => {
              if (res.code == 200) {
                this.$store.dispatch("showMessageTip", {
                  type: "info",
                  text: "Successful registration"
                });
                // 注册成功
                // 重定向到登录页
                this.$router.push({ path: "/login" });
              }
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                this.$loading({}).close();
              });
            })
            .catch(err => {
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                this.$loading({}).close();
              });
            });
        }
      });
    }
  }
};
</script>
<style lang="css" scoped></style>
