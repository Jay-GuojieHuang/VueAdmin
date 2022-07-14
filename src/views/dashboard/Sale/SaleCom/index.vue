<template>
  <div ref="sale" class="chart" />
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'SaleCom',
  props:
    {
      activeName: {
        type: String,
        default: 'sale'
      }
    },
  data() {
    return {
      myChart: null
    }
  },
  // computed: {
  //   changeTab() {
  //     return this.activeName === 'sale' ? '销售额' : '访问量'
  //   }
  // },
  watch: {
    activeName() {
      // console.log('change', this.activeName)
      this.myChart.setOption({
        title: {
          text: this.activeName === 'sale' ? '销售额趋势' : '访问量趋势'
        },
        series: [
          {
            data: [132, 100, 150, 180, 170, 110, 120],
            type: 'bar',
            barWidth: 50,
            color: '#909ac3'
          }
        ]
      })
    }
  },

  mounted() {
    this.myChart = echarts.init(this.$refs.sale)
    this.myChart.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        // axisTick: {
        //   alignWithLabel: true
        // }
      },
      yAxis: {
        type: 'value'
      },

      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 50,
          color: '#909ac3'
        }
      ]
    })
  } }
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
  /* border: 1px solid blanchedalmond */
}
</style>
