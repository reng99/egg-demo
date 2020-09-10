<template>
  <div class="exception">
    <div class="img">
      <img :src="config[type].img"/>
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <!-- <div class="desc">{{ customError.desc ? customError.desc : config[type].desc }}</div>
      <div class="action">
        <a-button type="primary" @click="handleToHome">{{ isLogin ? '返回首页' : '返回登录页'}}</a-button>
      </div> -->
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import types from './type'
  // import Vue from 'vue'
  // import { ACCESS_TOKEN } from '@/store/mutation-types'
  // import { mapState } from 'vuex'

  export default {
    name: 'Exception',
    props: {
      type: {
        type: String,
        default: '404'
      },
    },
    // computed: {
    //   ...mapState({
    //       customError: state => state.app.customError
    //     }),
    // },
    data () {
      return {
        config: types,
        isLogin: false,
      }
    },
    methods: {
      handleToHome () {
        this.$router.push({ path: '/dashboard/workplace' })
        // 如果已经登录了，则返回首页，否则返回登录页面
        // if(this.isLogin) {
        //   this.$router.push({ name: 'dashboard' })
        // }else {
        //   this.$router.push({ path: '/user/login' })
        // }
      }
    },
    mounted () {
      // if(Vue.ls.get(ACCESS_TOKEN)) {
      //   this.isLogin = true
      // }
    }
  }
</script>

<style lang="less" scoped>
  .exception {
    min-height: 500px;
    height: 80%;
    width: 100%;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    .img {
      display: inline-block;
      padding-right: 52px;
      zoom: 1;
      img {
        height: 360px;
        max-width: 430px;
      }
    }
    .content {
      display: inline-block;
      flex: auto;
      h1 {
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc {
        color: rgba(0, 0, 0, .45);
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }

  .mobile {
    .exception {
      margin-top: 30px;
      .img {
        padding-right: unset;

        img {
          height: 40%;
          max-width: 80%;
        }
      }
    }
  }
</style>
