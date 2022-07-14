<template>
  <div ref="progressChart" class="progressChart" />
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'ProgressChart',
  mounted() {
    const progressChart = echarts.init(this.$refs.progressChart)
    progressChart.setOption({
      tooltip: {},
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [76],
          // 拐点样式
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          barWidth: 20,
          color: 'skyblue',
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            // formatter: '|',
            position: 'right'
          }
        }
      ]
    })
  }
}
</script>

<style scoped>
.progressChart {
  height: 100%;
  width: 100%;
}
</style>
