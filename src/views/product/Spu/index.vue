<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :is-show="!scene ==0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU </el-button>
        <el-table :data="records" style="width: 100%; margin-top: 10px" border="">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="spuName" label="SPU名称" width="width" />
          <el-table-column prop="description" label="SPU描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <hint-button title="新增" type="success" icon="el-icon-plus" size="mini" @click="addSku(row)" />
              <hint-button title="修改" type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" />
              <hint-button title="查看SKU列表" type="info" icon="el-icon-info" size="mini" @click="showSkuList(row)" />
              <el-popconfirm :ref="`popover-${$index}`" title="这是一段内容确定删除吗？" @onConfirm="popConfirm(row)">
                <!-- <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />  -->
                <hint-button slot="reference" title="删除" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>

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
      </div>
      <SkuForm v-show="scene ===2" ref="sku" @changeScene="changeScene" />
      <SpuForm v-show="scene ===1" ref="spu" @changeScene="changeScene" />
    </el-card>
    <el-dialog :title="`${spu.spuName} 的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table v-loading="loading" :data="skuList" border>
        <el-table-column property="skuName" label="名称" />
        <el-table-column property="price" label="价格" />
        <el-table-column property="weight" label="重量" />
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <!-- {{scope.row.status}} -->
            <img :src="row.skuDefaultImg" alt="row.skuname" style="width: 80px; height:80px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 引入子组件
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'Spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      isShow: false,
      page: 1,
      limit: 3,
      records: [], // spu数据列表
      total: 0, // 分页器总页数，
      scene: 0, // 用于切换组件，
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true
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
    curChange(pager = 1) {
      this.page = pager

      this.getSpuList()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    addSpu() {
      // 添加按钮的回调
      this.scene = 1
      // 发请求拿数据
      this.$refs.spu.addSpuData(this.category3Id)
    },
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    changeScene(which) {
      this.scene = 0
      if (which) {
        switch (which) {
          case '修改':
            this.curChange(this.page)
            break
          case '新增':
            this.curChange(1)
            break
        }
      } else {
        this.curChange(this.page)
      }
    },
    async popConfirm(row) {
      // console.log(row)
      const res = await this.$API.spu.reqDeleteSpu(row.id)
      if (res.code === 200) {
        this.$message.success('删除成功！')
        if (this.records.length > 1) {
          this.curChange(this.page)
        } else {
          if (this.page > 1) {
            this.curChange(this.page - 1)
          } else {
            this.curChange()
          }
        }
      }
    },
    // 新增sku按钮的回调
    addSku(row) {
      this.scene = 2
      // 通知子组件发三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    // 查看sku列表的按钮回调
    async showSkuList(spu) {
      this.dialogTableVisible = true
      this.spu = spu
      this.loading = true
      // 获取sku列表数据
      const res = await this.$API.spu.reqSkuList(spu.id)
      if (res.code === 200) {
        // console.log(res.data)
        this.skuList = res.data

        this.loading = false
      }
    },
    close(done) {
      this.skuList = []
      done()
    }

  }
}
</script>

<style>
</style>
