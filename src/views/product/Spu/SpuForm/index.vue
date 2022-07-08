<template>
  <div>
    <el-form ref="form" v-model="spuForm" label-width="80px">
      <el-form-item label="SPU 名称">
        <el-input v-model="spuForm.spuName" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuForm.trademark" placeholder="请选择品牌">
          <el-option v-for="item in trademrakList" :key="item.id" :label="item.tmName" :value="item.tmName" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="model" type="textarea" placeholder="SPU描述" rows="4" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="model" placeholder="还有三个未选择" value="">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table :data="data" style="width: 100%; margin-top: 20px" border="">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="prop" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名称列表" width="width" />
          <el-table-column prop="prop" label="操作" width="width" />
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button type="" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        
      },
      trademrakList: [],
      spuImageList: [],
      saleAtrrList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    cancel() {
      this.$emit('cancel')
    },

    // 获取spu信息的数据
    async initSpuData(spu) {
      try {
        const spuRes = await this.$API.spu.reqSpuById(spu.id)
        if (spuRes.code === 200) {
          this.spu = spuRes.data
        }
        // 获取品牌的信息
        const trademarkRes = await this.$API.spu.reqTradeMarkList()
        if (trademarkRes.code === 200) {
          this.trademrakList = trademarkRes.data
        }

        // 获取图片列表的信息
        const spuImgRes = await this.$API.spu.reqSpuImageList(spu.id)
        if (spuImgRes.code === 200) {
          this.spuImageList = spuImgRes.data
        }

        // 获取全平台全部的销售属性
        const saleRes = await this.$API.spu.reqBaseSaleAttrList()
        if (saleRes.code === 200) {
          this.saleAtrrList = saleRes.data
        }
      } catch (error) {
        this.$message.warning(error.message)
      }
    }

  }
}
</script>

<style>
</style>
