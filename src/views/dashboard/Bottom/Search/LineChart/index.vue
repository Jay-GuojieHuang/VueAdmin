<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <i class="el-icon-info" style="color: #d9d9d9; margin: 0 5px" />
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">14.3</span>
      <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAABB0lEQVQokZWRsUoDURBFz8wuRsUvWLAWiWsIsVEU1C4/IdZWiRZiFwURRKI2foqtggiiMUggoJ2VtUgwIuaNRSw22d2YTDnvHs5lHqTM/GN5JVfbWU57lzQI4+ovsdYonN70ZzRGWUVxVAEP8DDOsUosF1vkau+bCAuRVT6sf2wMrJptbk157bEXkKCvxltn4nummb1oJRq9z8xeHAKQwG9ndhONc/fb06r2DEzGQQC+1LPZp/zZa49R1E4GQADjzslRjzGslxbFyS0p3xMZQ2SpUajeKYA4ORwC6orMjgEkfCgVReRyCCiKFxXV/ZGgbt8DFbOE8/8jNAt86ci68211FFB/5PoXJUFHFEyQAHIAAAAASUVORK5CYII="></span>
      <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAA9klEQVQokZXOPUoDYRSF4fd8M4VuIIzB3gWIVQYC1satWIgWCUraiLgILURSBmKljD8jioVrEJJxA0Gr+a6NhuhMNHO6yz0P92q83VhTriYVYoHdhM7rGlGvAuWVOdC4CvrKyJm3w6rK5A8E8LbVuAJtLqRktyuDtOkAJDqALXQs1z6AA4gG6SNw8a+C82h4/zSFAHke7gHvf7gPvG9/D1O4epmMBCdzmXRcHz68FiCAWw57QFbCsmApOPrRnR1q/WSC1Ckws3atn0zmQoBo/e4U9DyjXqKN9Ox3rwDVxZv5XSAHcjN21MWXvF+erBXHWSuO5+0/ASEaTgYbpnypAAAAAElFTkSuQmCC"></span>

    </div>
    <div class="footer">
      <div ref="charts" class="charts" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'LineChart',
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
            color: 'blue'
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
                  color: 'blue' // 0% 处的颜色
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

<style  scoped>
.header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.main {
  margin-top: 10px;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 20px;
}
.charts {
  height: 50px;
  width: 100%;
}
</style>
