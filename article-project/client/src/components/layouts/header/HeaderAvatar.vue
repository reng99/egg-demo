<template>
  <div class="header-avatar">
    <a-dropdown class="action-item" placement="bottomCenter" :trigger="['click']">
      <div class="user-info">
        <a-avatar alt="" style="background: #1890ff; line-height: 28px; width: 28px;height: 28px;">{{username && username.slice(0, 1)}}</a-avatar>
        <a href="javascript:;" style="color: rgb(0, 21, 41); text-decoration: none;font-size: 12px;">&nbsp;{{username}}&nbsp;</a>
        <a-icon type="down"/>
      </div>
      <a-menu slot="overlay" class="middle-menu">
        <a-menu-item key="logout">
          <a href="javascript:;" @click="logout">
            <a-icon type="logout"></a-icon>
            退出登录
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import { getStore } from "@/utils/storage"
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  name: 'HeaderAvatar',
  data() {
    return {
      username: '你的名字',
      avatar: '#'
    }
  },
  methods: {
    // 退出
    logout() {
      let vm = this
      vm.$confirm({
        title: '您确定退出吗？',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          Vue.ls.remove(ACCESS_TOKEN)
          vm.$router.push({ path: '/user/login'})
        },
        onCancel() {},
      })
    }
  },
  mounted() {
    this.username = getStore('username', false)
  }
}
</script>

<style lang="less" scoped>
.header-avatar {
  padding: 0 12px;
  margin: 0 6px;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
}
</style>
