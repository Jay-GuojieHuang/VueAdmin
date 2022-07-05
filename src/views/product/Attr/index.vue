<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus"> 添加属性</el-button>
      <el-table style="width: 100%" border :data="attrList">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="150" />
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{row}">
            <!-- {{ row.attrValueList }} -->
            <el-tag v-for="item in row.attrValueList" :key="item.id" type="primary" style="margin: 0 10px 10px 0">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Atrr',
  data() {
    return {
      attrList: []
    }
  },
  methods: {
    getCategoryId(cForm) {
      const { category1Id, category2Id, category3Id } = cForm
      this.getAttrList(category1Id, category2Id, category3Id)
    },
    async getAttrList(id1, id2, id3) {
      const res = await this.$API.attr.reqGetAttrList(id1, id2, id3)
      if (res.code === 200) {
        this.attrList = res.data
      } else {
        this.$message.danger('获取品牌属性失败，请重试')
      }
    }
  }
}
</script>

<style>
</style>
