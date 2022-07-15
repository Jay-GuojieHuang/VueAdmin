<template>
  <div ref="charts" class="charts" />
</template>
<script>
// 引入echarts
import echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted() {
    const lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      // title: {
      //   text: 'title'
      // },
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [10, 21, 3, 12, 32, 4, 23, 21],
          // 拐点样式
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'white' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          smooth: true
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.charts {
  height: 100%;
  width: 100%;
}
</style>
