<template>
     <div v-loading="isLoading" id="thirdClient">
      <div class="search-box">
        <el-input
          v-model="clientId"
          placeholder="客户端ID/名称"
          style="width:300px"
          clearable
          prefix-icon="el-icon-search"
        />
        <el-button type="primary" @click="getClientList()">查询</el-button>
        <div id="tools-right">
          <el-button
            type="primary"
            @click="addHandle"
            >新增</el-button
          >
          <el-button
            type="danger"
            class="tool-right"
            @click="handleDelBatch"
          >
            删除
          </el-button>
        </div>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="closeDialog" width="800px">
        <el-divider content-position="left">
          <span style="color: red">提示：如果有多个 SCOPE 或 重定向
            URI，请使用逗号分隔；新建客户端默认密码为 123456；</span>
        </el-divider>
        <el-form ref="addClientForm" :model="addClientForm" :rules="rules" label-width="125px">
          <el-row :gutter="20">
              <el-form-item label="客户端ID" prop="clientId">
                <el-input v-model="addClientForm.clientId" autocomplete="off" />
              </el-form-item>
              <el-form-item label="客户端名称" prop="clientName">
                <el-input v-model="addClientForm.clientName" autocomplete="off" />
              </el-form-item>
          </el-row>
          <el-row :gutter="20">
              <el-form-item label="认证方式" prop="clientAuthenticationMethods">
                <el-select v-model="addClientForm.clientAuthenticationMethods" placeholder="请选择" style="width: 450px">
                  <el-option v-for="item in AuthenticationMethodEnum" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="授权类型" prop="authorizationGrantTypes">
                <el-select v-model="addClientForm.authorizationGrantTypes" multiple collapse-tags collapse-tags-tooltip placeholder="请选择"
                  style="width: 450px">
                  <el-option v-for="item in AuthorizationGrantTypeOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
          </el-row>
          <el-row :gutter="20">
              <el-form-item label="SCOPE" prop="scopes">
                <el-input type="textarea" v-model="addClientForm.scopes" autocomplete="off" />
              </el-form-item>
              <el-form-item label="重定向URI" prop="redirectUris">
                <el-input type="textarea" v-model="addClientForm.redirectUris" autocomplete="off" />
              </el-form-item>
          </el-row>
          <el-row :gutter="20">
              <el-form-item label="授权许可" prop="requireAuthorizationConsent">
                <el-radio-group v-model="addClientForm.requireAuthorizationConsent">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="访问令牌格式" prop="accessTokenFormat">
                <el-select v-model="addClientForm.accessTokenFormat" placeholder="请选择" style="width: 450px">
                  <el-option v-for="item in accessTokenFormatOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
          </el-row>

          <el-row :gutter="20">
              <el-form-item label="访问令牌有效期" prop="accessTokenTimeToLive">
                <el-input-number v-model="addClientForm.accessTokenTimeToLive" :min="1" controls-position="right" />
              </el-form-item>
              <el-form-item label="刷新令牌有效期" prop="refreshTokenTimeToLive">
                <el-input-number v-model="addClientForm.refreshTokenTimeToLive" :min="1" controls-position="right" />
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
      <el-table-column type="selection" width="55" />
      <el-table-column prop="clientId" label="客户端ID" width="90" />
      <el-table-column
        prop="clientName"
        label="名称"
        width="110"
        show-overflow-tooltip
      />
      <el-table-column
        prop="clientAuthenticationMethods"
        label="认证方式"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column
        prop="authorizationGrantTypes"
        label="授权类型"
        min-width="220"
        show-overflow-tooltip
        #default="{ row }"
      >
        <span>{{
          handleAuthorizationGrantTypes(row.authorizationGrantTypes)
        }}</span>
      </el-table-column>
      <el-table-column
        prop="redirectUris"
        label="重定向URI"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="scopes"
        label="作用域"
        width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="requireAuthorizationConsent"
        label="授权许可"
        width="90"
        #default="{ row }"
      >
        <span v-if="row.requireAuthorizationConsent === 1">是</span>
        <span v-else>否</span>
      </el-table-column>
      <el-table-column
        prop="accessTokenFormat"
        label="访问令牌格式"
        width="110"
        #default="{ row }"
      >
        <span v-if="row.accessTokenFormat === 'self-contained'">JWT</span>
        <span v-else-if="row.accessTokenFormat === 'reference'">Opaque</span>
      </el-table-column>
      <el-table-column
        prop="accessTokenTimeToLive"
        label="访问令牌有效期(s)"
        width="150"
      />
      <el-table-column
        prop="refreshTokenTimeToLive"
        label="刷新令牌有效期(s)"
        width="150"
      />
      <el-table-column fixed="right" label="操作" width="220px" align="center">
        <template #default="scope">
          <el-tooltip content="重置密码" placement="top">
            <el-button 
              type="warning"
              @click="handleResetPass(scope.row.id)"
            ><i class="el-icon-lock"></i>重置密码</el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
            ><i class="el-icon-edit"></i>编辑</el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              type="danger"
              @click="handleDel(scope.row)"
            ><i class="el-icon-delete"></i>删除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      </el-table>
     </div>
</template>
<script>
export default {
  name: "thirdClientList",
  data() {
    return {
      title: "",
      addClientForm: {
        clientId:"",
        clientName:"",
        clientAuthenticationMethods:"",
        scopes:"",
        redirectUris:"",
        requireAuthorizationConsent:"",
        accessTokenFormat:"",
        accessTokenTimeToLive:"",
        refreshTokenTimeToLive:"",
        authorizationGrantTypes:"",
      },
      AuthenticationMethodEnum: [
      "client_secret_basic",
      "client_secret_post",
      "private_key_jwt",
      "client_secret_jwt",
      "none",
      ],
      AuthorizationGrantTypeEnum: {
        authorization_code : "授权码模式",
        client_credentials : "客户端凭证",
        refresh_token : "刷新令牌",
        password : "密码模式",
      },
      AuthorizationGrantTypeOptions: [
        {
          label: "授权码模式",
          value: "authorization_code",
        },
        {
          label: "客户端凭证",
          value: "client_credentials",
        },
        {
          label: "刷新令牌",
          value: "refresh_token",
        },
        {
          label: "密码模式",
          value: "password",
        },
      ],
      accessTokenFormatOptions: [
        {
          label: "JWT",
          value: "self-contained",
        },
        {
          label: "Opaque",
          value: "reference",
        },
      ],
      formLabelWidth: '120px',
      clientId: "",
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
        clientId: [{ required: true, message: "客户端ID不能为空", trigger: "blur" }],
        clientName: [
          { required: true, message: "客户端名称不能为空", trigger: "blur" },
        ],
        authorizationGrantTypes: [
          { required: true, message: "授权类型不能为空", trigger: "blur" },
        ],
        scopes: [{ required: true, message: "SCOPE不能为空", trigger: "blur" }],
        accessTokenTimeToLive: [
          { required: true, message: "访问令牌有效期不能为空", trigger: "blur" },
        ],
        refreshTokenTimeToLive: [
          { required: true, message: "刷新令牌有效期不能为空", trigger: "blur" },
        ],
      }
    };
  },
  created() {
    this.getClientList()
  },
  methods: {
    handleSelectionChange(data) {
      // 列表选择的数据
      console.log(data);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getDeviceList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getDeviceList();
    },
    loadData() {

    },
    handleResetQuery() {

    },
    addHandle() {
      this.dialogFormVisible = true;
      this.title = "Add Client";
    },
    handleDelBatch() {

    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.title = "Edit Client";
      this.addClientForm = row;
    },
    closeDialog() {
      this.addClientForm = {
        clientId:"",
        clientName:"",
        clientAuthenticationMethods:"",
        scopes:"",
        redirectUris:"",
        requireAuthorizationConsent:"",
        accessTokenFormat:"",
        accessTokenTimeToLive:"",
        refreshTokenTimeToLive:"",
        authorizationGrantTypes:"",
      },
      this.dialogFormVisible = false;
    },
    handleAuthorizationGrantTypes(authorizationGrantTypes) {
      if (!authorizationGrantTypes) return "";
      let authorizationGrantTypeArr = authorizationGrantTypes.split(",");
      let rst = "";
      authorizationGrantTypeArr.forEach((item) => {
        if (rst) rst += " | ";
        for(let key in this.AuthorizationGrantTypeEnum) {    // key类似于for循环中let i,都是在for中临时使用的变量
          if (item == key) {
            rst+=this.AuthorizationGrantTypeEnum[key]
          }
        }
      
      });
      return rst;
    },
    handleResetPass(){

    },
    getClientList() {
      this.listLoading = true;
      const data = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        clientId: this.clientId
      };
      this.$ajax
        .postData(this.$api.getThirdClientListUrl.url, data)
        .then(res => {
          if (res.code == 200) {
            this.tableData = null;
            this.tableData = res.data.records;
            this.totalCount = res.data.counts || res.data.records.length; // 要返回总数量，这样才能知道有几页
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    handleComfirm() {
      this.$refs.addClientForm.validate(async valid => {
        if (valid) {
          // const data = {
          //   email: this.form.email,
          //   password: this.$md5(this.form.password),
          //   code: this.form.captcha
          // };
          this.$ajax
            .postData(this.$api.getAddThirdClientUrl.url, this.addClientForm)
            .then(res => {
              if (res.code == 200) {
                this.closeDialog()
                this.getClientList()
              }
            })
            .catch(err => {
            });

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