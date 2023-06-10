<template>
  <div v-loading="isLoading" id="uerList">
    <div class="search-box">
      <el-input
        v-model="username"
        placeholder="用户名"
        style="width:300px"
        clearable
        prefix-icon="el-icon-search"
      />
      <el-button type="primary" @click="getUserList()">查询</el-button>
      <div id="tools-right">
        <el-button type="primary" @click="addHandle">新增</el-button>
        <!-- <el-button type="danger" class="tool-right" @click="handleDelBatch">
          删除
        </el-button> -->
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :before-close="closeDialog"
      width="800px"
    >
      <el-form
        ref="addUserForm"
        :model="addUserForm"
        :rules="rules"
        label-width="125px"
      >
        <el-row :gutter="20">
          <!-- <el-form-item label="id" prop="id"> -->
            <el-input v-model="addUserForm.id" type=hidden autocomplete="off" />
          <!-- </el-form-item> -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item v-if="!isEdit" label="密码" prop="password" >
            <el-input v-model="addUserForm.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addUserForm.phone" autocomplete="off" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleComfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%; height: auto"
      stripe
      border
      size="mini"
      :row-style="{ height: '30px' }"
      class="table-mini-box top-35"
      :min-height="400"
      :max-height="800"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <!-- <el-table-column prop="id" hidden label="用户id" width="90" /> -->
      <el-table-column
        prop="username"
        label="用户名"
        width="auto"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        width="auto"
        show-overflow-tooltip
      />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleResetPass(scope.row.id)"
            >重置密码</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status==0" size="mini" type="danger" @click="handleDel(scope.row, '1')"
            >禁用</el-button
          >
          <el-button v-if="scope.row.status==1" size="mini" @click="handleDel(scope.row, '0')"
            >启用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { isMiddlePassword, isEmail } from "@/config/validate";
export default {
  name: "User",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!isMiddlePassword(value))
        callback(
          new Error(
            "The password contains 8~32 digits (two of numbers, letters, symbols)"
          )
        );
      else callback();
    };
    return {
      title: "",
      addUserForm: {
        id: "",
        username: "",
        password: "",
        phone: ""
      },
      isEdit: false,
      formLabelWidth: "120px",
      username: "",
      dialogFormVisible: false,
      showQuery: true,
      listLoading: false,
      isLoading: false,
      tableData: [],
      currentPage: 1, //当前页
      pageLengthArr: this.$config.pageLengthArr,
      pageSize: this.$config.pageSize,
      totalCount: 0, // 列表总数量
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码长度为8~32位(数字、字母、符号中的2位)", trigger: "blur", validator: validatePassword }
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleSelectionChange(data) {
      // 列表选择的数据
      console.log(data);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getUserList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getUserList();
    },
    loadData() {},
    handleResetQuery() {},
    addHandle() {
      this.dialogFormVisible = true;
      this.title = "添加用户";
    },
    handleDel(row, status) {
      const data = {
        id: row.id,
        status: status,
      };
      this.$ajax
        .postData(this.$api.getUpdateUserStatus.url, data)
        .then(res => {
          if (res.code == 200) {
            this.$store.dispatch("showMessageTip", {
                  type: "info",
                  text: "操作成功"
                });
            this.getUserList();
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // handleDelBatch() {},
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.title = "编辑用户";
      this.addUserForm = row;
      this.isEdit = true;
    },
    closeDialog() {
      (this.addUserForm = {
        username: "",
        password: "",
        phone: "",
      }),
        (this.dialogFormVisible = false);
    },
    handleResetPass() {},
    getUserList() {
      this.listLoading = true;
      const data = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        username: this.username
      };
      this.$ajax
        .postData(this.$api.getUserList.url, data)
        .then(res => {
          if (res.code == 200) {
            this.tableData = null;
            this.tableData = res.data.content;
            this.totalCount = res.data.numberOfElements || res.data.content.length; // 要返回总数量，这样才能知道有几页
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    handleComfirm() {
      this.$refs.addUserForm.validate(async valid => {
        if (valid) {
          // const data = {
          //   email: this.form.email,
          //   password: this.$md5(this.form.password),
          //   code: this.form.captcha
          // };
          this.$ajax
            .postData(this.$api.getAddUser.url, this.addUserForm)
            .then(res => {
              if (res.code == 200) {
                this.$store.dispatch("showMessageTip", {
                  type: "info",
                  text: "操作成功"
                });
                this.closeDialog();
                this.getUserList();
              } else {
                this.$store.dispatch("showMessageTip", {
                  type: "error",
                  text: res.message
                });
              }
            })
            .catch(err => {});
        }
      });
    }
  }
};
</script>
<style scoped>
#tools-right {
  float: right;
}
</style>
