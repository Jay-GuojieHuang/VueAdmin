<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect :is-show="isShowTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="!isShowTable">
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
      <div v-show="isShowTable">
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
              <el-input v-if="scope.row.flag" :ref="scope.$index" v-model="scope.row.valueName" placeholder="请输入属性值名称" size="mini" @blur="changeFlag(scope.row)" @keyup.native.enter="changeFlag(scope.row)" />
              <span v-if="!scope.row.flag" style="display: block" @click="toEdit(scope.row,scope.$index)">{{ scope.row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{$index}">
              <el-popconfirm
                :ref="`popover-${$index}`"
                title="这是一段内容确定删除吗？"
                @onConfirm="popConfirm($index)"
              >
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
        <el-button type="primary" :disabled="checkBeforeSave()" @click="addOrUpdateAttr">保存</el-button>
        <el-button @click="isShowTable=false">取消</el-button>
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
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 收集或修改属性用
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
      }
    }
  },
  methods: {
    getCategoryId(cForm) {
      // const { category1Id, category2Id } = cForm
      this.category1Id = cForm.category1Id
      this.category2Id = cForm.category2Id
      this.category3Id = cForm.category3Id
      if (this.category3Id) {
        this.getAttrList(this.category1Id, this.category2Id, this.category3Id)
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
    editAttr(row, $index) {
      this.isShowTable = true
      // console.log(row)
      // this.attrInfo = row
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = true
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    changeFlag(row) {
      if (row.valueName.trim() === '') {
        this.$message.warning('请输入正确的属性值')
      } else {
        const res = this.attrInfo.attrValueList.some(item => {
          if (item !== row) {
            return item.valueName === row.valueName
          }
        })
        if (res) {
          this.$message.warning('已有重复项')
          row.valueName = ''
        } else {
          row.flag = false
        }
      }
    },
    toEdit(row, $index) {
      row.flag = true
      // console.log($index)
      this.$nextTick(() => {
        this.$refs[$index].focus()
      })
    },
    popConfirm(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存或更新按钮的数据
    async addOrUpdateAttr() {
      // 整理参数：
      // 如果用户添加了空的属性值 则不该添加到服务器
      // 提交給服务器的数据不应该包含flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        // 返回不是空串的结果并删除flag属性
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })

      // 发请求
      try {
        const res = await this.$API.attr.reqAddorUpdateAttr(this.attrInfo)
        if (res.code === 200) {
          this.$message.success('保存成功！')
          this.getAttrList(this.category1Id, this.category2Id, this.category3Id)
        }
      } catch (error) {
        this.$message.warning('保存失败，请重试！')
      }
      this.isShowTable = false
    },
    checkBeforeSave() {
      if (this.attrInfo.attrValueList.length > 0) {
        // alert(123)
        if (this.attrInfo.attrValueList.length === 1 && this.attrInfo.attrValueList[0].valueName === '') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
  }
}
</script>

<style>
</style>
