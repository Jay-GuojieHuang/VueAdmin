<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" :disabled="isShow" placeholder="请选择" @change="handler1">
          <el-option v-for="(c1) in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" :disabled="isShow" placeholder="请选择" @change="handler2">
          <el-option v-for="c2 in list2" :key="c2.id" :value="c2.id" :label="c2.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" :disabled="isShow" placeholder="请选择" @change="handler3">
          <el-option v-for="c3 in list3" :key="c3.id" :value="c3.id" :label="c3.name" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',

  props: {
    isShow: Boolean
  },
  data() {
    return {
      // 一级分类的数据
      list1: [],
      list2: [],
      list3: [],
      // 收集1，2，3级分类的ID
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    // 获取一级分类的方法
    this.getCategory1List()
  },
  methods: {
    async getCategory1List() {
      try {
        const res = await this.$API.attr.reqCategory1List()
        if (res.code === 200) {
          this.list1 = res.data
        }
      } catch (error) {
        this.$message.danger(error.message)
      }
    },
    // 一级分类的select时间回调（当一级分类option发生变化时触发）
    async handler1() {
      // 清除二三级选项的残留数据
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      // 结构数据
      const { category1Id } = this.cForm
      try {
        const res = await this.$API.attr.reqCategory2List(category1Id)
        if (res.code === 200) {
          this.list2 = res.data
          // this.$message.success('获取数据成功')
          this.$emit('getCategoryId', this.cForm)
        }
      } catch (error) {
        this.$message.danger(error.message)
      }
    },
    async handler2() {
      this.list3 = []
      this.cForm.category3Id = ''
      // 结构数据
      const { category2Id } = this.cForm
      try {
        const res = await this.$API.attr.reqCategory3List(category2Id)
        if (res.code === 200) {
          this.list3 = res.data
          // this.$message.success('获取数据成功')
          this.$emit('getCategoryId', this.cForm)
        }
      } catch (error) {
        this.$message.danger(error.message)
      }
    },
    handler3() {
      this.$emit('getCategoryId', this.cForm)
    }
  }
}
</script>

<style>
</style>
