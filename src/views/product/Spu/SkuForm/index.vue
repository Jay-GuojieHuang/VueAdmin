<template>
  <div>
    <el-form ref="form" :model="skuInfo" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="请输入SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" type="number" placeholder="请输入价格(元)" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="请输入重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" placeholder="" rows="4" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="value in attr.attrValueList" :key="value.id" :label="value.valueName" :value="`${attr.id}:${value.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
            <el-select v-model="saleAttr.attrIdandValueId" placeholder="请选择">
              <el-option v-for="item in saleAttr.spuSaleAttrValueList" :key="item.id" :label="item.saleAttrValueName" :value="`${saleAttr.id}:${item.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-form ref="form" :model="form" label-width="80px">
          <el-table :data="spuImageList" style="width: 100%" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" label="label" width="55" align="center" />
            <el-table-column prop="prop" label="图片" width="width">
              <template slot-scope="{row}">
                <img :src="row.imgUrl" :alt="row.imgName" style="height: 80px; width:80px;">
              </template>
            </el-table-column>
            <el-table-column prop="imgName" label="名称" width="width" />
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row}">
                <el-button v-if="row.isDefault == 0" type="primary" size="mini" @click="setDefault(row)">设置默认</el-button>
                <el-button v-else size="mini">默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="changeScene">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // 图片列表
      spuImageList: [],
      // 储存销售属性
      spuSaleAttrList: [],
      // 平台销售属性的数据
      attrInfoList: [],
      spuName: '',
      // 收集sku数据的字段
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类：需要通过数据双向绑定v-model收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三类：需要自己书写代码
        // 默认图片
        skuDefaultImg: '',
        // 收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0
          // }
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ]

      },
      multipleSelection: []
    }
  },
  methods: {
    // 取消按钮的回调
    changeScene() {
      this.$emit('changeScene')
      // 利用object.assign来清空数据
      Object.assign(this._data, this.$options.data())
    },
    // 获取sku数据
    async getData(category1Id, category2Id, row) {
      this.spuName = row.spuName
      // 收集父组件给予的数据
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      // console.log(category1Id, category2Id, row)
      // 发请求
      // 获取图片
      const ImgRes = this.$API.spu.reqSpuImageList(row.id)

      // 获取销售属性列表
      const SaleAttrRes = this.$API.spu.reqSpuSaleAttrList(row.id)

      // 获取平台属性信息列表
      const AttrInfoListRes = this.$API.spu.reqAttrInfoList(category1Id, category2Id, row.id)
      try {
        const res = await Promise.all([ImgRes, SaleAttrRes, AttrInfoListRes])
        if (res) {
          // 给数组每个元素加上isDefault
          res[0].data.forEach(item => {
            this.$set(item, 'isDefault', 0)
          })
          this.spuImageList = res[0].data
          this.spuSaleAttrList = res[1].data
          this.attrInfoList = res[2].data
        }
      } catch (error) {
        this.$message.warning(error.message)
      }

      // console.log(res)
    // .then(values => {
    //     console.log(values)
    //   }).catch(reason => {
    //     console.log(reason)
    //   })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 设置默认图片
    setDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 保存按钮的事件
    async save() {
      // 整理参数
      const { attrInfoList, skuInfo, spuSaleAttrList } = this
      // 整理平台属性
      attrInfoList.forEach(item => {
        if (item.attrIdAndValueId) {
          // 如果存在则意味着用户进行了选择
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          const obj = { attrId, valueId }
          skuInfo.skuAttrValueList.push(obj)
        }
      })
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdandValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdandValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])

      // 整理选中图片

      this.multipleSelection.forEach(item => {
        item.spuImgId = item.id
      })
      skuInfo.skuImageList = this.multipleSelection
      // 发送请求
      const res = await this.$API.spu.reqAddSku(this.skuInfo)
      if (res.code === 200) {
        this.$message.success('保存成功')
        this.changeScene('修改')
      } else {
        this.$message.warning('保存失败')
      }
    }
  }
}
</script>

<style>
</style>
