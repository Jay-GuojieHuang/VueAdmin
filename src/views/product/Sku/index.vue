<template>
  <div>
    <el-table :data="skuList" style="width: 100%; margin-top: 20px" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="skuName" label="名称" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column prop="prop" label="默认图片" width="110">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" :alt="row.skuName" style="width:80px; height:80px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80" />
      <el-table-column prop="price" label="价格(元)" width="80" />
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <hint-button v-if="row.isSale == 0" title="上架SKU" type="success" icon="el-icon-top" size="mini" @click="sale(row)" />
          <hint-button v-else title="下架SKU" type="success" icon="el-icon-bottom" size="mini" @click="cancelSale(row)" />
          <hint-button title="修改" type="info" icon="el-icon-edit" size="mini" @click="$message.info('功能正在开发中')" />
          <hint-button title="查看" type="info" icon="el-icon-info" size="mini" @click="skuInfo(row)" />
          <hint-button title="删除" type="danger" icon="el-icon-delete" size="mini" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-sizes="[10, 20, 50]" :page-size="limit" :pager-count="9" layout="prev, pager, next, jumper,->, total, sizes" :total="total" style="margin-top:20px; textAlign: center" @current-change="getSkuList" @size-change="handleSizeChange" />
    <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose" size="50%" :show-close="false" :with-header="false">
      <!-- <span>我来啦!</span> -->
      <el-row style="margin-top:20px">
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfoObj.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfoObj.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfoObj.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template slot-scope>
            <el-tag v-for="item in skuInfoObj.skuAttrValueList" :key="item.id" type="success" style="margin: 5px">{{ item.attrName }}-{{ item.valueName }}</el-tag>
          </template>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px" indicator-position="outside">
            <el-carousel-item v-for="item in skuInfoObj.skuImageList" :key="item.id" type="card" height="400px">
              <h3 class="large"><img
                :src="item.imgUrl"
                alt=""
                style="width: 50%;
        height: 50%;
        display: block;
        margin: auto;"
              ></h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      limit: 10,
      skuList: [],
      total: 0,
      page: 1,
      skuInfoObj: {},
      drawer: false,
      direction: 'rtl'
    }
  },
  mounted() {
    this.getSkuList(1, this.limit)
  },
  methods: {
    async getSkuList(pager) {
      if (pager) {
        this.page = pager
      } else {
        this.page = 1
      }
      const res = await this.$API.sku.reqSkuList(this.page, this.limit)
      if (res.code === 200) {
        // console.log(res.data)
        this.skuList = res.data.records
        this.total = res.data.total
      } else {
        this.$message.warning('获取数据失败，请刷新！')
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    // 上架操作
    async sale(row) {
      const res = await this.$API.sku.reqSale(row.id)
      if (res.code === 200) {
        this.getSkuList()
        this.$message.success('上架成功！')
      } else {
        this.$message.warning('操作失败')
      }
    },
    // 下架操作
    async cancelSale(row) {
      const res = await this.$API.sku.reqCancelSale(row.id)
      if (res.code === 200) {
        this.getSkuList()
        this.$message.success('下架成功！')
      } else {
        this.$message.warning('操作失败')
      }
    },
    async skuInfo(row) {
      const res = await this.$API.sku.reqGetSkuInfo(row.id)
      if (res.code === 200) {
        // console.log(res.data)
        this.skuInfoObj = res.data
        this.drawer = true
      } else {
        this.$message.warning('获取数据失败')
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style>
.el-carousel__button {
  width: 10px;
  height: 10px;
  background-color: grey;
  border-radius: 50%;
}

.el-carousel__item h3 {
  /* color: #475669; */
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
<style  scoped>
.el-row .el-col-5 {
  font-size: 20px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>
