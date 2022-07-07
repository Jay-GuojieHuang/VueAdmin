<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :is-show="isShow" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id">添加SPU </el-button>
      <el-table :data="records" style="width: 100%; margin-top: 10px" border="">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="spuName" label="SPU名称" width="width" />
        <el-table-column prop="description" label="SPU描述" width="width" />
        <el-table-column prop="prop" label="操作" width="width">
          <template>
            <hint-button title="新增" type="success" icon="el-icon-plus" size="mini" />
            <hint-button title="修改" type="warning" icon="el-icon-edit" size="mini" />
            <hint-button title="查看" type="info" icon="el-icon-info" size="mini" />
            <hint-button title="删除" type="danger" icon="el-icon-delete" size="mini" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:10px"
        align="center"
        layout="prev, pager, next, jumper,->, total, sizes"
        :total="total"
        :page-size="3"
        :page-sizes="[3,5,8]"
        :current-page="page"
        @current-change="curChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      isShow: false,
      page: 1,
      limit: 3,
      records: [], // spu数据列表
      total: 0 // 分页器总页数
    }
  },
  methods: {
    getCategoryId(cForm) {
      // const { category1Id, category2Id } = cForm
      this.category1Id = cForm.category1Id
      this.category2Id = cForm.category2Id
      this.category3Id = cForm.category3Id
      if (this.category3Id) {
        this.getSpuList()
      } else {
        this.records = []
      }
    },
    // 获取spu列表数据的方法
    async getSpuList() {
      const { page, limit, category3Id } = this
      const res = await this.$API.spu.reqSpuList(page, limit, category3Id)
      if (res.code === 200) {
        this.total = res.data.total
        this.records = res.data.records
      }
    },
    curChange(pager) {
      this.page = pager
      this.getSpuList()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    }
  }
}
</script>

<style>
</style>
