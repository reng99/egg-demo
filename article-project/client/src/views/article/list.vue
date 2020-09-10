<!--文章列表-->
<template>
  <div class="article-list">
    <a-table
      style="border: none;" 
      bordered
      :loading="loading"
      :rowKey="row => row.id"
      :columns="columns" 
      :data-source="data"
      :pagination="pagination" 
      @change="change"/> 
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    const columns = [
      {
        title: () => <a-button onClick={ () => this.$router.push({ path: '/article/info' }) } icon="plus" type="primary" title="添加" shape="circle"/>,
        key: 'operate',
        width: 100,
        align: 'center',
        customRender: (text, record, index) => {
          return (
            <a-row>
              <a href="javascript:;" onClick={() => this.edit(text, record, index)}><icon type="edit" />编辑</a>&nbsp;
              <a href="javascript:;" style="color: #f00;" onClick={() => this.delete(text, record, index)}><icon type="delete" />删除</a>
            </a-row>
          )
        }
      },
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '分组',
        dataIndex: 'group'
      },
    ]
    return {
      breadcrumb: [{title: '文章', path: ''}, {title: '列表', path: ''}],
      // 列表
      loading: false,
      columns,
      data: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        showTotal: total => `共 ${total} 条`,
        showSizeChanger: true
      }
    }
  },
  mounted() {
    this.setBreadcrumb()
    this.getList()
  },
  methods: {
    // 删除
    delete(text, record, index) {
      let vm = this
      vm.$confirm({
        title: `确定删除【${record.title}】`,
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          vm.api.article.deleteItem({ id: record.id }).then(res => {
            if(res.code === '00000') {
              vm.$message.success(res.msg || '删除成功！')
              vm.handlerSearch()
            } else {
              vm.$message.warning(res.msg || '删除失败！')
            }
          })
        },
        onCancel() {},
      })
    },
    // 编辑
    edit(text, record, index) {
      this.$router.push({
        path: '/article/info',
        query: {
          id: record.id
        }
      })
    },
    setBreadcrumb() {
      this.$store.dispatch('setBreadcrumb', this.breadcrumb)
    },
    change(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getList()
    },
    handlerSearch() {
      this.pagination.current = 1
      this.getList()
    },
    // 获取文章列表数据
    getList() {
      let vm = this
      vm.loading = true
      vm.api.article.getList({
        page: vm.pagination.current,
        page_size: vm.pagination.pageSize
      }).then(res => {
        if(res.code === '00000'){
          vm.pagination.total = res.data && res.data.count || 0
          vm.data = res.data && res.data.results || []
        } else {
          vm.$message.warning(res.msg || '获取文章列表失败')
        }
      }).finally(() => {
        vm.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-list{

}
</style>