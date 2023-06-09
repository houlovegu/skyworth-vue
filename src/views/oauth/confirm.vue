<template
  ><div v-loading="isLoading" class="container">
    <div class="container-bg"></div>
    <div class="nav-top">
      <div>{{ $config.pageTitle }}</div>
    </div>
    <div class="sign-box">
      <h1 class="title">Authorization confirmation</h1>
      <div class="input-box">
        <div><b>应用ID：</b><span>{{client_id}}</span></div>
		<div><b>请求授权：</b><span>{{scope}}</span></div>
      </div>
      
      <div class="input-box">
        <span class="btn" @click="signFn()">Agree</span>
      </div>
      <div class="input-box">
        <span class="btn" @click="cancel()">Cancel</span>
      </div>
    </div>
  </div>
</template>
<script>
// const Qs = require("qs");
export default {
  name: "Confirm",
  data() {
    return {
        state: "",
        client_id: "",
        client_secret: "",
        redirect_uri: "",
        scope: "",
        isLoading: false
    };
  },
  created() {
    // console.log(this.$route);
    // 授权成功则调用后端接口
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    // this.client_id = this.getUrlQuery('client_id')
    this.client_id = this.$route.query.client_id
    // this.client_secret = this.getUrlQuery('client_secret')
    this.scope = this.$route.query.scope
  },
  mounted() {
  },
  methods: {
    // getUrlQuery(key) {
    //   const query = location.search && location.search.slice(1)
    //   return Qs.parse(query)[key]
    // },
    signFn() {
        // 显示loading
        this.isLoading = true;
        // let data = new FormData();
        // data.append("email", this.email);
        // data.append("password", this.password);

        // 如果方法是query，则直接 const data = {email: '', password:''}
        // ajax方法在src/services/ajax文件中
        // 请求地址配置在src/services/api文件中
        let data = {
            params: {
                code: this.code,
                state: this.state,
                // clientId: this.client_id,
            }
        }
        this.$ajax
        .getData(this.$api.getOauthCallbackUrl.url, data)
        .then(res => {
            if (res.code == 200) {
                window.location.href = res.data.url+"?token="+res.data.token
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
    },
    cancel() {
        this.$router.push({
            name: "Login",
        });
    }
    }
}


</script>
<style lang="css" scoped>

</style>
