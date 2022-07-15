<template>

  <el-card class="box-card" height="300">
    <div slot="header" class="clearfix">
      <!-- 左侧 -->
      <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale" />
        <el-tab-pane label="访问量" name="vist" />
      </el-tabs>
      <!-- 右侧 -->
      <div class="right">
        <span @click="SetDay()">今日</span>
        <span @click="SetWeek()">本周</span>
        <span @click="SetYear()">本年</span>
        <span class="demonstration">默认</span>
        <el-date-picker v-model="mydate" class="date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd" />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="16">
          <SaleCom :active-name="activeName" />
        </el-col>
        <el-col :span="8">
          <div class="saleRanking">
            <b>门店{{ title }}排行</b>
            <ul>
              <li><span class="rindex">1</span><span>肯德基</span><span class="num">12345</span></li>
              <li><span class="rindex">2</span><span>肯德基</span><span class="num">12345</span></li>
              <li><span class="rindex">3</span><span>肯德基</span><span class="num">12345</span></li>
              <li><span class="index">4</span><span>肯德基</span><span class="num">12345</span></li>
              <li><span class="index">5</span><span>肯德基</span><span class="num">12345</span></li>
              <li><span class="index">6</span><span>肯德基</span><span class="num">12345</span></li>
              <li><span class="index">7</span><span>肯德基</span><span class="num">12345</span></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>

</template>

<script>
import SaleCom from './SaleCom'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  components: {
    SaleCom
  },
  data() {
    return {
      activeName: 'sale',
      mydate: []
      // setDate: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    SetDay() {
      const date = dayjs().format('YYYY-MM-DD')
      this.mydate = [date, date]
    },
    SetWeek() {
      const Startdate = dayjs().day(1).format('YYYY-MM-DD')
      const Enddate = dayjs().day(7).format('YYYY-MM-DD')
      this.mydate = [Startdate, Enddate]
    },
    SetYear() {
      const Startdate = dayjs().startOf('year').format('YYYY-MM-DD')
      const Enddate = dayjs().endOf('year').format('YYYY-MM-DD')
      this.mydate = [Startdate, Enddate]
    }
  }
}
</script>

<style lang="sass"  scoped>
.clearfix

  display: flex
  justify-content: space-between
  position: relative

.box-card

  margin-top: 20px
  width: 100%

.tab

  height: 100%
  width: 100%

.right

  position: absolute
  right: 0
  margin-top: 10px

.right span

  margin-right: 10px

.date

  width: 300px
  margin: 0 10px
  height: 25px

ul

  list-style: none
  width: 100%
  height: 300px
  margin: 10px 0 0 0
  padding: 10px 0

ul li

  height: 10%
  margin-bottom: 5px

.rindex

  float: left
  height: 20px
  width: 20px
  border-radius: 50%
  background-color: black
  color: aliceblue
  text-align: center
  line-height: 20px
  margin: 0 10px

.index

  height: 20px
  width: 20px
  line-height: 20px
  margin: 0 15px

.num

  float: right

::v-deep .el-card__header

  padding-bottom: 0px

::v-deep .el-card__body

  padding-top: 0px
  padding-bottom: 0px
  height: 100%

::v-deep .is-always-shadow
  height: 350px

::v-deep .saleRanking
  height: 300px

::v-deep .el-card__header
  border-bottom: 0px
</style>
