<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <!-- start message-tip -->
    <message-tip
      :is-show="isShowMessageTip"
      :message-text="messageTipText"
      :duration="messageTipDuration"
      :type="messageTipType"
      @off="offMessageTip"
      :is-show-close-btn="messageTipIsShowCloseBtn"
    >
    </message-tip>
    <!-- end message-tip -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// 全局消息弹框
import messageTip from "./components/message-tip/message-tip";
export default {
  name: "App",
  components: {
    messageTip
  },
  computed: {
    ...mapGetters({
      isShowMessageTip: "isShowMessageTip", //是否显示messageTip
      messageTipText: "messageTipText", //消息提示内容
      messageTipDuration: "messageTipDuration", //messageTip动画持续时间
      messageTipType: "messageTipType", // messageTip 图标提示类型
      messageTipIsShowCloseBtn: "messageTipIsShowCloseBtn" // 是否显示messageTip关闭按钮
    })
  },
  mounted() {},
  methods: {
    ...mapActions({
      hideMessageTip: "hideMessageTip"
    }),
    offMessageTip() {
      this.$store.dispatch("hideMessageTip");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
