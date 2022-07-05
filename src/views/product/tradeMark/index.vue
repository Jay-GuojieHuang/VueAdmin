<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog">添加</el-button>
    <!-- 表格组件 -->
    <el-table border :data="list">
      <el-table-column type="index" label="序号" width="width" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
      <el-table-column label="品牌Logo" width="width" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="height:50px; width:50px">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="updateTrademark(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteTrademark(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-sizes="[10, 20, 50]" :page-size="limit" :pager-count="9" layout="prev, pager, next, jumper,->, total, sizes" :total="total" style="margin-top:20px; textAlign: center" @current-change="getPageList" @size-change="handleSizeChange" />

    <!-- //对话框 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="rulesForm" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 分页起第几页，默认1
      page: 1,
      // 当前页数展示数据条数
      limit: 10,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        // 表单验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [{ required: true, message: '请选择品牌图片' }]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      try {
        const res = await this.$API.trademark.reqTradeMarkList(page, limit)
        if (res.code === 200) {
          this.total = res.data.total
          this.list = res.data.records
        }
      } catch (error) {
        console.log(error)
        // this.getPageList()
      }
    },
    // handlerCurrentChange(pager) {
    //   this.page = pager
    //   this.getPageList()
    // }
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList(this.page)
    },
    showDialog() {
      // 清除数据
      this.tmForm = { tmName: '', logoUrl: '' }
      // 显示对话框
      this.dialogFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.tmForm.logoUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addOrUpdateTradeMark() {
      this.$refs.rulesForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const res = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if (res.code === 200) {
            // 弹出messagebox
            this.$message.success(this.tmForm.id ? '修改信息成功！' : '添加品牌信息成功！')
            // 再次获取信息
            this.getPageList(this.tmForm.id ? this.page : '')
          } else {
            this.$message.error(this.tmForm.id ? '修改信息失败！' : '添加品牌信息失败！')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateTrademark(row) {
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },
    deleteTrademark(row) {
      this.$confirm(`是否确定删除 ${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 向服务器发请求删除
        const res = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
