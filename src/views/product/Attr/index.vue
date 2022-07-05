<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px" :disabled="!category3Id" @click="addAttr"> 添加属性</el-button>
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column prop="prop" label="属性值列表" width="">
            <template slot-scope="{row}">
              <!-- {{ row.attrValueList }} -->
              <el-tag v-for="item in row.attrValueList" :key="item.id" type="info" style="margin: 0 10px 10px 0">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="editAttr(scope.row)" />
              <el-button type="danger" icon="el-icon-delete" size="mini" />

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性</el-button>
        <el-button>取消</el-button>
        <el-table :data="attrInfo.attrValueList" style="width: 100%; margin: 20px 0" border>
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="prop" label="属性名称" width="width">
            <template slot-scope="scope">
              <el-input v-if="scope.row.flag" v-model="scope.row.valueName" placeholder="请输入属性值名称" size="mini" @blur="changeFlag(scope.row)" @keyup.native.enter="changeFlag(scope.row)" />
              <span v-if="!scope.row.flag" style="display: block" @click="scope.row.flag=!scope.row.flag">{{ scope.row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="">
              <el-button type="danger" size="mini" icon="el-icon-delete" />
            </template>
          </el-table-column>

        </el-table>
        <el-button type="primary" @click="isShowTable=true">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入loadash进行深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Atrr',
  data() {
    return {
      attrList: [],
      isShowTable: false,
      category3Id: '',
      // 收集或修改属性用
      attrInfo: {
        attrName: '',
        attrValueList: [
        ],
        categoryId: '',
        categoryLevel: 3
      }
    }
  },
  methods: {
    getCategoryId(cForm) {
      const { category1Id, category2Id } = cForm
      this.category3Id = cForm.category3Id
      if (this.category3Id) {
        this.getAttrList(category1Id, category2Id, this.category3Id)
      } else {
        this.attrList = []
      }
    },
    async getAttrList(id1, id2, id3) {
      const res = await this.$API.attr.reqGetAttrList(id1, id2, id3)
      if (res.code === 200) {
        this.attrList = res.data
      } else {
        this.$message.danger('获取品牌属性失败，请重试')
      }
    },
    editAttr(row) {
      this.isShowTable = false
      // console.log(row)
      // this.attrInfo = row
      this.attrInfo = cloneDeep(row)
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push(
        {
          attrId: this.attrInfo.id,
          valueName: '',
          flag: true
        }
      )
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: '',
        attrValueList: [
        ],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    changeFlag(row) {
      if (row.valueName.trim() === '') {
        this.$message.warning('请输入正确的属性值')
      } else {
        row.flag = false
      }
    }
  }
}
</script>

<style>
</style>
