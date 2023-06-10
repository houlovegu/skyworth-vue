<template>
    <el-container v-loading="isLoading" style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <!-- 默认要展开的菜单列表 -->
            <el-menu :default-openeds="[]">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {getAsyncRoutes} from "@/permission"
export default {
  name: "index",
  data() {
    const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        menuList: [],
        isLoading: false
      }
  },
  created() {
    if (this.$common.getOtherInfo("asyncRouter") == null) {
        const menus = this.getRouter();
        this.menuList = menus;
        const router = getAsyncRoutes(menus);
        this.$router.addRoutes(router);
        router.forEach(val => { 
            // 将菜单提取出来的路由加到路由表
            this.$router.options.routes.push(val)
        })
        console.log(this.$router);
        this.$common.setOtherInfo("menu", JSON.stringify(res.data));
    } else {
        this.menuList = JSON.parse(this.$common.getOtherInfo("menu"));
        const router = getAsyncRoutes(this.menuList)
        this.$router.addRoutes(router)
        router.forEach(val => { // 将菜单提取出来的路由加到路由表
            this.$router.options.routes.push(val)
        })
    }
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
        var router = null;
        this.$ajax.getData(this.$api.getRouter.url).then(res=>{
            if (res.code == 200) {
                console.log(res.data);
                router = res.data; 
            }     
        }).catch(err => {
            this.isLoading = false;
        }) 
        return router;
    }
  }
};
</script>
<style lang="css" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>