<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="SPU名称">
        xxx
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="model" placeholder="请输入SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="model" placeholder="请输入价格(元)" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="model" placeholder="请输入重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="model" type="textarea" placeholder="" rows="4" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select v-model="model" placeholder="请选择">
              <el-option label="label" value="value" />
            </el-select>
          </el-form-item>
          <el-form-item label="屏幕尺寸">
            <el-select v-model="model" placeholder="请选择">
              <el-option label="label" value="value" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select v-model="model" placeholder="请选择">
              <el-option label="label" value="value" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-form ref="form" :model="form" label-width="80px">
          <el-table :data="data" style="width: 100%" border>
            <el-table-column type="selection" label="label" width="55" align="center" />
            <el-table-column prop="prop" label="图片" width="width" />
            <el-table-column prop="prop" label="名称" width="width" />
            <el-table-column prop="prop" label="操作" width="width" />
          </el-table>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  methods: {
    getData() {
      alert(123)
    }
  }
}
</script>

<style>
</style>
