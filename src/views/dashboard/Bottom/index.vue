<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from './Category'
import Search from './Search'
export default {
  name: 'Bottom',
  components: {
    Category,
    Search
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-row {
  margin-top: 20px;
}
</style>
