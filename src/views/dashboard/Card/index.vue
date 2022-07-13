<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="$ 123456">
            <template slot="charts">
              <span>周同比 45.67% <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAABB0lEQVQokZWRsUoDURBFz8wuRsUvWLAWiWsIsVEU1C4/IdZWiRZiFwURRKI2foqtggiiMUggoJ2VtUgwIuaNRSw22d2YTDnvHs5lHqTM/GN5JVfbWU57lzQI4+ovsdYonN70ZzRGWUVxVAEP8DDOsUosF1vkau+bCAuRVT6sf2wMrJptbk157bEXkKCvxltn4nummb1oJRq9z8xeHAKQwG9ndhONc/fb06r2DEzGQQC+1LPZp/zZa49R1E4GQADjzslRjzGslxbFyS0p3xMZQ2SpUajeKYA4ORwC6orMjgEkfCgVReRyCCiKFxXV/ZGgbt8DFbOE8/8jNAt86ci68211FFB/5PoXJUFHFEyQAHIAAAAASUVORK5CYII="></span>
              &nbsp;
              <span>日同比 45.67% <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAA9klEQVQokZXOPUoDYRSF4fd8M4VuIIzB3gWIVQYC1satWIgWCUraiLgILURSBmKljD8jioVrEJJxA0Gr+a6NhuhMNHO6yz0P92q83VhTriYVYoHdhM7rGlGvAuWVOdC4CvrKyJm3w6rK5A8E8LbVuAJtLqRktyuDtOkAJDqALXQs1z6AA4gG6SNw8a+C82h4/zSFAHke7gHvf7gPvG9/D1O4epmMBCdzmXRcHz68FiCAWw57QFbCsmApOPrRnR1q/WSC1Ckws3atn0zmQoBo/e4U9DyjXqKN9Ox3rwDVxZv5XSAHcjN21MWXvF+erBXHWSuO5+0/ASEaTgYbpnypAAAAAElFTkSuQmCC"></span>
            </template>
            <template slot="footer">
              日销售额：¥12342
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="footer">
              月访问量： 1234
            </template>
          </Detail>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="123456">
            <template slot="footer">
              转化率: 64%
            </template>
          </Detail>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="76%">
            <template slot="footer">
              <span>周同比 45.67% <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAABB0lEQVQokZWRsUoDURBFz8wuRsUvWLAWiWsIsVEU1C4/IdZWiRZiFwURRKI2foqtggiiMUggoJ2VtUgwIuaNRSw22d2YTDnvHs5lHqTM/GN5JVfbWU57lzQI4+ovsdYonN70ZzRGWUVxVAEP8DDOsUosF1vkau+bCAuRVT6sf2wMrJptbk157bEXkKCvxltn4nummb1oJRq9z8xeHAKQwG9ndhONc/fb06r2DEzGQQC+1LPZp/zZa49R1E4GQADjzslRjzGslxbFyS0p3xMZQ2SpUajeKYA4ORwC6orMjgEkfCgVReRyCCiKFxXV/ZGgbt8DFbOE8/8jNAt86ci68211FFB/5PoXJUFHFEyQAHIAAAAASUVORK5CYII="></span>
              &nbsp;
              <span>日同比 45.67% <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAA9klEQVQokZXOPUoDYRSF4fd8M4VuIIzB3gWIVQYC1satWIgWCUraiLgILURSBmKljD8jioVrEJJxA0Gr+a6NhuhMNHO6yz0P92q83VhTriYVYoHdhM7rGlGvAuWVOdC4CvrKyJm3w6rK5A8E8LbVuAJtLqRktyuDtOkAJDqALXQs1z6AA4gG6SNw8a+C82h4/zSFAHke7gHvf7gPvG9/D1O4epmMBCdzmXRcHz68FiCAWw57QFbCsmApOPrRnR1q/WSC1Ckws3atn0zmQoBo/e4U9DyjXqKN9Ox3rwDVxZv5XSAHcjN21MWXvF+erBXHWSuO5+0/ASEaTgYbpnypAAAAAElFTkSuQmCC"></span>
            </template>
          </Detail>

        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import Detail from './Detail'

export default {
  name: 'Card',
  components: {
    Detail
  }
}
</script>

<style>
</style>
