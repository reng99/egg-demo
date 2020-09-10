<template>
  <div id="login" class="main">
    <div class="loginBox">
      <div class="contentBox">
        <a-form
          class="user-layout-login"
          :form="form">
          <a-form-item :style="{marginBottom:'5px',height:screenSize=='default'?'52px':'62px'}">
            <a-input
              :size="screenSize"
              type="text"
              placeholder="请输入账号名/admin"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入账号！' }]}
              ]">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item :style="{marginBottom:'5px',height:screenSize=='default'?'52px':'62px'}">
            <a-input
              :size="screenSize"
              type="password"
              autocomplete="false"
              placeholder="请输入密码/admin"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码！' }]}
              ]">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-form>
        <a-button @click="login" :loading="loading" type="primary" style="width: 100%;">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {setStore} from "@/utils/storage"

  export default {
    name: 'login',
    data() {
      return {
        form: this.$form.createForm(this),
        screenWidth: document.body.clientWidth,
        screenSize: 'default',
        loading: false
      }
    },
    created() {
      this.screenWidth = document.body.clientWidth
      this.screenSize = this.screenWidth > 800 ? 'large' : 'default'
    },
    watch: {
      screenWidth: function() {
        this.screenSize = this.screenWidth > 800 ? 'large' : 'default'
      }
    },
    mounted() {
      let vm = this
      window.onresize = () => {
        return (() => {
            this.screenWidth = document.body.clientWidth
        })()
      }
      this.$notification.open({
          message: '温馨提示',
          description: '建议使用谷歌浏览器，部分浏览器存在兼容性问题，尤其是IE，360浏览器兼容模式。',
          icon: <a-icon type="smile" style="color: #faad14" />,
          duration:10
      })
    },
    methods: {
      login() {
        let vm = this
        vm.loading = true
        this.form.validateFields((err, values) => {
          if(err){
            return
          }
          const data = {
            username: values.username,
            password: values.password
          }
          vm.api.login.login(data).then(res => {
            if(res.code === '00000'){
              setStore('token', res.data && res.data.token)
              setStore('username', res.data && res.data.username)
              vm.$message.success(res.msg)
              vm.$router.push({
                path: '/dashboard/workplace'
              })
            } else {
              vm.$message.warning('登录失败！')
            }
          }).finally(() => {
            vm.loading = false
          })
        })
      }
    }
      
  }
</script>

<style lang="less">
  .main{
    width:100%;
    /*height:70%;*/
    display:flex;
    justify-content: center;
  }
  .loginBox{
    /*display:flex;*/
    max-height: 540px;
    min-height: 350px;
    // min-width: 533px;
    min-width: 375px;
    max-width: 802px;
    /*width: 46%;*/
    border-radius:6px;
    // background:red;
    // box-shadow: 0px 0px 16px 0px rgba(0,92,205,0.15);
    // 注释.picBox后添加
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .picBox{
      display:inline-block;
      width:40%;
      min-width:210px;
      max-width:320px;
      min-height:350px;
      max-height:540px;
      vertical-align: top;
      /*height:100%;*/
      img{
        width:100%;
        height:100%;
      }
    }
    .contentBox{
      display:inline-block;
      // width:60%;
      width: 80%;
      // height:100%;
      height: auto;
      font-family:PingFangSC-Medium;
      font-weight: bold;
      box-sizing: border-box;
      // padding: 0 10%;
      .title{
        font-size:18px;
        // margin-top:18%;
        margin-bottom:18px;
        text-align: center;
      }
      .title-large{
        font-size:30px;
        // margin-top:30%;
        font-size:24px;
        margin-bottom: 30px;
      }
      .description{
        font-size:10px;
      }
      .description-large{
        font-size:14px;
      }
    }
    .ant-form-item{
      margin-bottom: 14px;
      font-size:12px;
    }
    .ant-form-item-with-help{
      margin-bottom:5px;
    }
    .ant-input{
      font-size:12px;
    }
    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
      background: linear-gradient(90deg, rgb(138, 203, 241), #2d8cf0);
      border:none;
    }
  }

</style>

<style lang="less" scoped>
.hint-msg{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
button.animation-login {
  transform: rotate(0deg);
  animation: move 1s infinite;
}
@keyframes  move {
  0% {
    transform: rotate(1deg);
    transform: scale(1.01);
  }
  50% {
    transform: rotate(-1deg);
    transform: scale(0.99);
  }
  100% {
    transform: rotate(0deg);
    transform: scale(1);
  }
}
</style>