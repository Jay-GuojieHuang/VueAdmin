<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <Card />
    <Sale />
    <Bottom />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Card from './Card'
import Sale from './Sale'
import Bottom from './Bottom'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Bottom
  },
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
