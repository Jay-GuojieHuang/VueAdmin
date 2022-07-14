<template>
  <div ref="barChart" class="barChart" />
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'BarChart',
  mounted() {
    const barChart = echarts.init(this.$refs.barChart)
    barChart.setOption({
      tooltip: {},
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [10, 21, 13, 34, 21, 32, 42, 12, 43, 21, 12],
          // 拐点样式
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }
        }
      ]
    })
  }
}
</script>

<style scoped>
.barChart {
  height: 100%;
  width: 100%;
}
</style>
