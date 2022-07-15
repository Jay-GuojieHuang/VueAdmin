<template>
  <el-card>
    <div slot="header" class="header">
      <span>销售额类别占比</span>
      <div style="margin-top: 0px">
        <el-radio-group v-model="value" size="mini">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>

    </div>
    <div>
      <div ref="charts" class="charts" />
    </div>
    <div />
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      value: '全部渠道'
    }
  },
  mounted() {
    const pieChart = echarts.init(this.$refs.charts)
    pieChart.setOption({
      title: {
        text: 'Search Engine',
        subtext: '销售额类别占比',
        top: 'center',
        left: 'center',
        textStyle: {
          fontSize: '16'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '40',
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    // 绑定事件
    pieChart.on('mouseover', (params) => {
      // console.log(params)
      pieChart.setOption({
        title: {
          text: params.data.name
        }
      })
    })
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>
