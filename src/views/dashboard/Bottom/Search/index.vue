<template>
  <el-card>
    <div slot="header" class="header">
      <span>线上热门搜索</span>
      <i class="el-icon-more" />
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineChart />
        </el-col>
        <el-col :span="12">
          <LineChart />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-table :data="dataTable" style="width: 100%" border>
            <el-table-column prop="prop" label="排名" width="50" />
            <el-table-column prop="prop" label="搜索关键字" width="width" />
            <el-table-column prop="prop" label="用户数" sortable width="width" />
            <el-table-column prop="prop" label="周涨幅" sortable width="width" />
          </el-table>
          <el-pagination layout="prev, pager, next" :total="50" align="right" style="margin-top: 10px" />
        </el-col></el-row>

    </div>
  </el-card>
</template>

<script>
import LineChart from './LineChart'
export default {
  name: 'Search',
  components: {
    LineChart
  },
  data() {
    return {
      dataTable: [{}]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  /* padding-bottom: 10px; */
}

::v-deep .el-card__body {
  padding-top: 0;
  padding-bottom: 5px;
  // background-color: black;
}
</style>
