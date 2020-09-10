<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="center-pos">
        <div class="top">
          <div class="header">
            <router-link :to="{path: '/user/login'}" style='display: block;text-decoration: none;x'>
              <img src="~@/assets/logo-min.png" class="logo" alt="logo">
              <span class="title" style="color: #666;">测试平台</span>
            </router-link>
          </div>
          <div class="desc">{{desc}}</div>
        </div>
        <route-view></route-view>
      </div>

      <div class="footer">
        <div class="copyright">
            Copyright &copy; 某某公司
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mixinDevice } from '@/utils/mixin.js'
   import RouteView from '@/components/layouts/RouteView'

  export default {
    name: 'UserLayout',
    components: { RouteView },
    mixins: [mixinDevice],
    data () {
      return {
        desc: '这是一个后台系统'
      }
    },
    mounted () {
      document.body.classList.add('userLayout')
    },
    beforeDestroy () {
      document.body.classList.remove('userLayout')
    },
  }
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  width:100%;
  height:100%;
  background:#fff;
  &.mobile {
    .container {
      .main {
        width: 98%;
      }
    }
  }
  .container {
    width: 100%;
    min-height: 100%;
    background: #f5f5f5 url(~@/assets/background.svg) no-repeat 50%;
    position: relative;
    .center-pos {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .header {
        .logo {
          height: 46px;
          vertical-align: top;
          margin-right: 12px;
          margin-top:-10px;
          border-style: none;
          vertical-align: middle;
        }

        .title {
          font-size: 30px;
          color: #333;
          font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
    }

    .desc{
      font-size: 14px;
      margin-top: 16px;
      color: #999;
    }

    .footer {
      height:10%;
      width: 100%;
      padding: 48px 0 24px 0px;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%, 0);
      .links {
        font-size: 12px;
        a {
          color: rgba(0, 0, 0, 0.45);
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }          
    }
  }
}
</style>
