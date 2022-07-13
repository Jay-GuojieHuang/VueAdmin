<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <span class="el-icon-info" />
    </div>
    <div class="card-content">
      <span>{{ count }}</span>
    </div>
    <div class="card-chart">
      <slot name="charts" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>

</template>

<script>
export default {
  name: 'Detail',
  props: {
    title: {
      type: String,
      default: '' },

    count: {
      type: String,
      default: '' }

  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
  font-size: 14px;
}
.card-content {
  font-size: 30px;
  padding: 10px 0;
}
.card-chart {
  height: 50px;
}
.card-footer {
  border-top: 1px #eee solid;
  padding-top:10px;
}
</style>
