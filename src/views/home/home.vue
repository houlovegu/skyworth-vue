<template>
  <div class="content">
    <!-- 顶部导航栏 -->
    <div class="nav-top">
      <div>
        <router-link class="page-title" to="/index">{{
          $config.pageTitle
        }}</router-link>
      </div>
      <div>
        <span class="btn" @click="signoutFn()">
          Sign Out
        </span>
      </div>
    </div>
    <!-- 左侧导航栏 -->
    <div class="left-nav">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="nav-per"
        :class="{
          sub: item.children && item.children.length > 0,
          active: $route.path == item.url
        }"
      >
        <router-link
          v-if="!item.children || item.children.length == 0"
          :to="item.url"
          >{{ item.menu_name }}</router-link
        >
        <div v-else class="sub-nav-box">
          <span
            class="flex between pointer"
            @click="item.showChildren = !item.showChildren"
          >
            <span>{{ item.menu_name }}</span>
            <i
              :class="'el-icon-arrow-' + (item.showChildren ? 'up' : 'down')"
            ></i>
          </span>
          <div
            v-for="(per, inde) in item.children"
            :key="index + '' + inde"
            class="nav-per"
            :class="{ active: $route.path == per.url }"
          >
            <router-link :to="per.url">{{ per.menu_name }}</router-link>
          </div>
        </div>
      </div>
      <!-- <div class="nav-per" :class="{ active: $route.name === 'Device' }">
        <router-link to="/device"
          ><i class="el-icon-menu"></i>Device List</router-link
        >
      </div>
      <div class="nav-per" :class="{ active: $route.name === 'Message' }">
        <router-link to="/message"
          ><i class="el-icon-message"></i>Send Message</router-link
        >
      </div>
      <div class="nav-per" :class="{ active: $route.name === 'ThirdClient' }">
        <router-link to="/thirdClient"
          ><i class="el-icon-monitor"></i>Client List</router-link
        >
      </div> -->
    </div>
    <keep-alive>
      <router-view
        class="page-content"
        v-if="!$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      navList: []
    };
  },
  created() {
    this.getRouter();
  },
  methods: {
    signoutFn() {
      // 如果调接口 请将下面的代码写在接口相应结果成功后
      this.$ajax
        .getData(this.$api.signOut.url)
        .then(res => {
          if (res.code == 200) {
            // 清除浏览器缓存token、
            this.$common.setOtherInfo("token", ""); // 将token清除
            this.$router.push("/login");
          }
        })
        .catch(err => {});
    },
    getRouter() {
      this.$ajax
        .getData(this.$api.getRouter.url)
        .then(res => {
          if (res.code == 200) {
            this.navList = res.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="css" scoped>
.page-content {
  padding-top: 50px;
  padding-left: 200px;
}

.left-nav {
  position: fixed;
  top: 80px;
  left: 0;
  width: 200px;
  bottom: 0;
  background: #0c2439;
}

.nav-per {
  line-height: 50px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  padding: 0 20px;
}

.nav-per.active,
.nav-per:hover {
  background: #05ffff;
}
.nav-per.sub span {
  color: #fff;
}
.nav-per.sub:hover {
  background: transparent;
}

.nav-per.active a,
.nav-per:hover a,
.nav-per.sub .nav-per.active a,
.nav-per.sub .nav-per:hover a {
  color: #000;
}

.nav-per a,
.nav-per.sub a {
  text-decoration: none;
  color: #fff;
  display: block;
  line-height: 50px;
}

.nav-per a i {
  font-size: 18px;
  vertical-align: text-bottom;
  margin-right: 5px;
}
</style>
