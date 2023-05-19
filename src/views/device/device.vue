<template>
  <div id="device">
    <div class="search-box">
      <el-input
        v-model="deviceNo"
        placeholder="设备编号"
        style="width:300px"
        clearable
        prefix-icon="el-icon-search"
      />
      <el-button type="primary" @click="getDeviceList()">查询</el-button>
    </div>
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
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="left"
        label="设备ID"
        prop="id"
        width="180px"
        min-width="200px"
      >
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="设备名称"
        prop="uid"
        width="180px"
        min-width="200px"
      >
        <template #default="{ row }">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="注册Token"
        prop="registryToken"
        width="auto"
        min-width="200px"
      >
        <template #default="{ row }">
          <span>{{ row.registryToken }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
        prop="operation"
        width="80px"
        min-width="80px"
      >
        <template #default="{ row }">
          <el-button type="primary" icon="el-icon-s-promotion" @click="messagePage(row.uid)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageLengthArr"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      style="margin-top: 10px !important"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: "device",
  data() {
    return {
      deviceNo: "",
      listLoading: false,
      tableData: [],
      currentPage: 1, //当前页
      pageLengthArr: this.$config.pageLengthArr,
      pageSize: this.$config.pageSize,
      totalCount: 0 // 列表总数量
    };
  },
  created() {
    this.getDeviceList();
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
    messagePage(uid) {
      this.$router.push({ path: "/message", query: {uid: uid}});
    },
    getDeviceList() {
      this.listLoading = true;
      const data = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        deviceNo: this.deviceNo
      };
      this.$ajax
        .postData(this.$api.getDeviceListUrl.url, data)
        .then(res => {
          console.log(res);
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
    }
  }
};
</script>
<style lang="css" scoped>
.search-box {
  text-align: left;
  margin: 0 0 10px;
}
</style>
