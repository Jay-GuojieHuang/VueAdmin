<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU 名称">
        <el-input v-model="spu.spuName" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="item in trademrakList" :key="item.id" :label="item.tmName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" type="textarea" placeholder="SPU描述" rows="4" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--action:上传图片地址 -->
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error="handleUploadeFail" :on-success="handleSuccess" :file-list="spuImageList">
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndAttrName" :placeholder="`还有个${unselectedSaleAttr.length}未选择`">
          <el-option v-for="item in unselectedSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
        </el-select>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%; margin-top: 20px" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row}">
              <el-tag v-for="tag in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" size="small" @close="handleClose(row,tag)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input v-if="row.inputVisible" ref="saveTagInput" v-model="row.inputValue" class="input-new-tag" size="mini" @blur="handleInputConfirm(row)" />
              <el-button v-else class="button-new-tag" size="mini" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{$index}">
              <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)" /> -->

              <el-popconfirm :ref="`popover-${$index}`" title="这是一段内容确定删除吗？" @onConfirm="popConfirm($index)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button type="" @click="changeScene">取消</el-button>
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
      // spu不能是空对象，因为新增spu功能需要携带完整属性給服务器
      spu: {
        spuName: '',
        description: '',
        category3Id: '',
        tmId: '',
        spuSaleAttrList: [
          //   { id: 33590,
          //   spuId: 14328,
          //    baseSaleAttrId: 3, saleAttrName: '尺码',
          //     spuSaleAttrValueList: [
          //       { id: 16875,
          //        spuId: 14328,
          //         baseSaleAttrId: 3,
          //          saleAttrValueName: '13',
          //           saleAttrName: '尺码',
          //            isChecked: null }] }
        ], spuImageList: []
      },
      trademrakList: [],
      spuImageList: [],
      saleAtrrList: [],
      // dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      attrIdAndAttrName: '' // 收集未选择的销售属性
    }
  },
  computed: {
    // 计算出未选择的销售属性
    unselectedSaleAttr() {
      return this.saleAtrrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    handleRemove(file, filelist) {
      this.spuImageList = filelist
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片墙图片上传成功的回调
    handleSuccess(response, file, filelist) {
      console.log(filelist)
      this.spuImageList = filelist
    },
    handleUploadeFail() {
      console.log('fail')
    },
    changeScene() {
      this.$emit('changeScene')
      // 利用object.assign来清空数据
      Object.assign(this._data, this.$options.data())
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
          // 由于elmentUI的图片墙要求数据要有 url 和name 属性 所以需要修改数据

          const imgArr = spuImgRes.data
          console.log('1', imgArr)
          imgArr.map(item => {
            item.name = item.imgName
            item.url = item.imgUrl
            // delete item.CourseName
            return item
          })
          console.log(imgArr)
          this.spuImageList = imgArr
        }

        // 获取全平台全部的销售属性
        const saleRes = await this.$API.spu.reqBaseSaleAttrList()
        if (saleRes.code === 200) {
          this.saleAtrrList = saleRes.data
        }
      } catch (error) {
        this.$message.warning(error.message)
      }
    },
    handleClose(row, tag) {
      row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1)
    },

    // showInput() {
    //   this.inputVisible = true
    //   this.$nextTick(_ => {
    //     this.$refs.saveTagInput.$refs.input.focus()
    //   })
    // },
    // 属性tag保存时触发的回调
    handleInputConfirm(row) {
      // const inputValue = this.inputValue
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() === '') {
        this.$message.warning('属性值不能为空！')
        return
      }
      const ifExist = row.spuSaleAttrValueList.some(item => {
        // console.log(item.saleAttrValueName, inputValue)
        return item.saleAttrValueName === inputValue
      })
      if (ifExist) {
        this.$message.warning('属性值不能重复！')
        row.inputValue = ''
        return
      }
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue
      }
      if (inputValue) {
        row.spuSaleAttrValueList.push(newSaleAttrValue)
      }
      row.inputVisible = false
      row.inputValue = ''
    },
    // 添加销售属性，把收集到的销售属性进行分割
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      // 向spu对象的spuSaleAttrList添加新的销售属性
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 清空数据
      this.attrIdAndAttrName = ''
    },
    // 添加销售属性Tag的回调
    addSaleAttrValue(row) {
      // console.log(row)
      // row.inputVisible = true
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    popConfirm(index) {
      // this.attrInfo.attrValueList.splice(index, 1)
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    // 保存按钮的回调
    async addOrUpdateSpu() {
      // 整理参数
      // 携带参数：对于图片 需要携带imageName和imageUrl
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      // 发请求
      // console.log('发请求前', this.spu.spuImageList)
      // console.log('发请求前', this.spu)
      const res = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if (res.code === 200) {
        this.$message.success('保存成功！')
        // 回到父组件
        this.$emit('changeScene', this.spu.id ? '修改' : '新增')
        // 利用object.assign来清空数据
        Object.assign(this._data, this.$options.data())
      }
    },
    async addSpuData(category3Id) {
      // 收集3级id
      this.spu.category3Id = category3Id
      try {
        const trademarkRes = await this.$API.spu.reqTradeMarkList()
        if (trademarkRes.code === 200) {
          this.trademrakList = trademarkRes.data
        }
        const saleRes = await this.$API.spu.reqBaseSaleAttrList()
        if (saleRes.code === 200) {
          this.saleAtrrList = saleRes.data
        }
      } catch (error) {
        this.$message.warning('获取数据失败')
      }
    }

  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
