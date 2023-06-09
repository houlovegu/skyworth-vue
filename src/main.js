// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import { routes } from "./router";
import {constantRoutes} from "./router";
import config from "@/config/index.js";
import { ajax } from "@/services/ajax";
import api from "@/services/api.js";
import $ from "jquery";
import Vuex from "vuex";
import store from "./vuex/index";
import common from "@/views/common/common.js";
import {
  Loading,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  InputNumber,
  Pagination,
  Button,
  Icon,
  Select,
  Option,
  Upload,
  Dialog,
  Radio,
  RadioButton,
  RadioGroup,
  Divider,
  Row,
  Tooltip,
} from "element-ui";

import md5 from "js-md5";

import "element-ui/lib/theme-chalk/index.css";
import vuex from "./vuex/index";

require("./views/common/common.css");

Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$ajax = ajax; // ajax方法
Vue.prototype.$api = api; // 接口文件
Vue.prototype.$jquery = $; // jquery
Vue.prototype.$store = store;
Vue.prototype.$common = common; // 公共方法
Vue.prototype.$loading = Loading.service;
Vue.prototype.$md5 = md5;

Vue.use(VueRouter); // 加载路由
Vue.use(Vuex); // 加载全局状态管理
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Option);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(InputNumber);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Tooltip);



// 实例化路由
const router = new VueRouter({
  mode: 'history', // 去掉hash模式
  routes
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
