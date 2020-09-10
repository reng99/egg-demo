<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item 
      v-for="(item, index) in breadcrumb" 
      :key="index">
      <router-link v-if="item.path" :to="{path: item.path }">{{item.title}}</router-link>
      <template v-else>{{item.title}}</template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return { 
    }
  },
  computed: {
    ...mapState({
        breadcrumb: state => state.app.breadcrumb
    }),
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.breadcrumb{
  margin-top: 16px;
}
</style>