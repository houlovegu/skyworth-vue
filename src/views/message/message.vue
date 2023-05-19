<template>
  <div id="message">
    <el-form
      size="mini"
      :model="messageForm"
      ref="messageForm"
      label-width="80px"
      style="width: 500px;"
    >
      <el-form-item
        prop="deviceList"
        :rules="[{ required: true, message: '设备编号不能为空' }]"
        label="设备编号"
      >
        <el-select
          multiple
          collapse-tags
          v-model="messageForm.deviceList"
          filterable
          placeholder="请选择"
          clearable
          :disabled="$route.query.uid ? true : false"
          :popper-append-to-body="false"
        >
          <el-option
            width="auto"
            v-for="item in options"
            :key="item.uid"
            :label="item.uid"
            :value="item.uid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="title"
        :rules="[{ required: true, message: '主题不能为空' }]"
        label="消息主题"
      >
        <el-input
          maxlength="20"
          show-word-limit
          clearable
          v-model="messageForm.title"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="body"
        :rules="[{ required: true, message: '消息不能为空' }]"
        label="消息内容"
      >
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
          v-model="messageForm.body"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-input width="auto" clearable v-model="messageForm.image">
          <el-button
            slot="append"
            icon="el-icon-upload"
            @click="uploadFn()"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即发送</el-button>
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
    <input
      ref="upFile"
      class="upload-input"
      type="file"
      accept="image/png,image/gif,image/jpeg"
      style="display: none;"
      @change="handleChange"
    />
  </div>
</template>
<script>
export default {
  name: "message",
  data() {
    return {
      options: [],
      fileList: [],
      messageForm: {
        deviceList: [],
        title: "",
        body: "",
        image: ""
      }
    };
  },
  created() {
    this.getDeviceNoList();
    if (this.$route.query && this.$route.query.uid) {
      this.messageForm.deviceList.push(this.$route.query.uid);
    }
  },
  methods: {
    uploadFn() {
      this.$refs.upFile.dispatchEvent(new MouseEvent("click"));
    },
    fileName(name) {
      return name.replace(/.png|.jpg|.gif|.jpeg/gi, "");
    },
    handleChange() {
      
      const files = this.$refs.upFile.files;
      // console.log(files);
      const file = files[0];
      // console.log(file);
      // const file = files.slice(0, 1);
      const isJPG = file.type === 'image/jpeg' ||'image/gif' || 'image/jpg'||'image/pjpeg'||'image/x-png'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        this.$store.dispatch("showMessageTip", {
                  type: "error",
                  text: "上传头像图片只能是 JPG 格式!"
                });
      }
      if (!isLt2M) {
        // this.$message.error('上传头像图片大小不能超过 2MB!');
        this.$store.dispatch("showMessageTip", {
                  type: "error",
                  text: "上传头像图片大小不能超过 2MB!"
                });
      }
      
      
      // 这里是拿到的file、可以在这里调上传图片的接口
      
      let formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", this.fileName(file.name));
      this.$ajax
        .postData(this.$api.getUploadUrl.url, formData, {
          token: false,
          params: {},
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          // console.log(res);
          // 调上传的接口拿到的结果 这里自己写吧
          this.messageForm.image = res.data
        })
        .catch(err => {});
    },
    onSubmit() {
      this.$refs.messageForm.validate(async valid => {
        if (valid) {
          var url = this.$api.getFcmSingleSendUrl.url;
          if (this.messageForm.deviceList.length > 1) {
            url = this.$api.getFcmBatchSendUrl.url;
          }
          const data = {
            notification: {
              title: this.messageForm.title,
              body: this.messageForm.body,
              image: this.messageForm.image
            },
            uid: this.messageForm.deviceList
          };
          this.$ajax
            .postData(url, data)
            .then(res => {
              if (res.code == 200) {
                // if (res.data)
                this.$store.dispatch("showMessageTip", {
                  type: "info",
                  text: "Successful Send Message"
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
    resetForm() {
      this.$refs.messageForm.resetFields();
    },
    getDeviceNoList() {
      this.listLoading = true;
      this.$ajax
        .postData(this.$api.getDeviceNoListUrl.url)
        .then(res => {
          if (res.code == 200) {
            this.options = res.data;
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    }
  }
};
</script>
<style scoped>
#message {
  text-align: left;
}
</style>
