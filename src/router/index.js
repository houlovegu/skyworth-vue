// HOME
const home = resolve => {
  require.ensure(["../views/home/home.vue"], () => {
    resolve(require("../views/home/home.vue"));
  });
};

// index
const index = resolve => {
  require.ensure(["../views/index/index.vue"], () => {
    resolve(require("../views/index/index.vue"));
  });
};

// user
const user = resolve => {
  require.ensure(["../views/user/user.vue"], () => {
    resolve(require("../views/user/user.vue"));
  });
};

// login
const login = resolve => {
  require.ensure(["../views/login/login.vue"], () => {
    resolve(require("../views/login/login.vue"));
  });
};

// register
const register = resolve => {
  require.ensure(["../views/register/register.vue"], () => {
    resolve(require("../views/register/register.vue"));
  });
};

// reset
const reset = resolve => {
  require.ensure(["../views/reset/reset.vue"], () => {
    resolve(require("../views/reset/reset.vue"));
  });
};

// device
const device = resolve => {
  require.ensure(["../views/device/device.vue"], () => {
    resolve(require("../views/device/device.vue"));
  });
};

// thirdClient
const thirdClient = resolve => {
  require.ensure(["../views/thirdClient/list.vue"], () => {
    resolve(require("../views/thirdClient/list.vue"));
  });
};

// message
const message = resolve => {
  require.ensure(["../views/message/message.vue"], () => {
    resolve(require("../views/message/message.vue"));
  });
};

// oauth
const oauth = resolve => {
  require.ensure(["../views/oauth/oauth.vue"], () => {
    resolve(require("../views/oauth/oauth.vue"));
  });
};

// auth-confirm
const confirm = resolve => {
  require.ensure(["../views/oauth/confirm.vue"], () => {
    resolve(require("../views/oauth/confirm.vue"));
  });
};

// 公共路由
const constantRoutes = [
  {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login'),
      meta: {
          title: '登录',
      },
      hidden: true
  },
];

export const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/home",
    name: "Home",
    component: home,
    meta: {
      title: "Dashboard",
      content: "一些页面描述---有助于google搜索",
      path: "home",
      auth: true,
      keepAlive: false
    },
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: index,
        meta: {
          title: "Index",
          content: "一些页面描述---有助于google搜索",
          path: "index",
          auth: true,
          keepAlive: false
        }
      },
      {
        path: "/user",
        name: "User",
        component: user,
        meta: {
          title: "User",
          content: "一些页面描述---有助于google搜索",
          path: "user",
          auth: true,
          keepAlive: false
        }
      },
      // {
      //   path: "/device",
      //   name: "Device",
      //   component: device,
      //   meta: {
      //     title: "Device",
      //     content: "一些页面描述---有助于google搜索",
      //     path: "device",
      //     auth: true,
      //     keepAlive: false
      //   }
      // },
      // {
      //   path: "/message",
      //   name: "Message",
      //   component: message,
      //   meta: {
      //     title: "Message",
      //     content: "一些页面描述---有助于google搜索",
      //     path: "message",
      //     auth: true,
      //     keepAlive: false
      //   }
      // },
      // {
      //   path: "/thirdClient",
      //   name: "ThirdClient",
      //   component: thirdClient,
      //   meta: {
      //     title: "ThirdClient",
      //     content: "一些页面描述---有助于google搜索",
      //     path: "thirdClient",
      //     auth: true,
      //     keepAlive: false
      //   }
      // },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: login,
    meta: {
      title: "Sign In",
      content: "一些页面描述---有助于google搜索",
      path: "login",
      auth: true,
      keepAlive: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: register,
    meta: {
      title: "Sign Up",
      content: "一些页面描述---有助于google搜索",
      path: "register",
      auth: true,
      keepAlive: false
    }
  },
  {
    path: "/reset",
    name: "Reset",
    component: reset,
    meta: {
      title: "Reset",
      content: "一些页面描述---有助于google搜索",
      path: "reset",
      auth: true,
      keepAlive: false
    }
  },
  {
    path: "*",
    redirect: "/index"
  }
];
export default routes;
