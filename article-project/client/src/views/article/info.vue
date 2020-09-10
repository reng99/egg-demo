<!--文章的新增和编辑页面-->
<template>
  <div class="article-info">
    <a-spin :spinning="loading">
      <a-row style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <a-button type="primary" @click="$router.go(-1)">返回</a-button>
      </a-row>
      <a-form :form="form" v-bind="formItemLayout">
        <a-form-item
          label="标题">
          <a-input 
            placeholder="请输入标题"
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题'}]}
            ]"/>
        </a-form-item>
        <a-form-item
          label="分组">
          <a-select
            showSearch
            v-decorator="[
              'group',
              {rules: [{ required: true, message: '请选择分组'}]}
            ]"
            placeholder="请选择分组">
            <a-select-option value="分组1">分组1</a-select-option>
            <a-select-option value="分组2">分组2</a-select-option>
            <a-select-option value="分组3">分组3</a-select-option>
            <a-select-option value="分组4">分组4</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="作者">
          <a-input 
            placeholder="请输入作者"
            v-decorator="[
              'author',
              {rules: [{ required: true, message: '请输入作者'}]}
            ]"/>
        </a-form-item>
        <a-form-item
          label="内容">
          <a-textarea 
            :autosize="{ minRows: 10, maxRows: 12 }"
            placeholder="请输入文章内容"
            v-decorator="[
              'content',
              {rules: [{ required: true, message: '请输入文章内容'}]}
            ]"/>
        </a-form-item>
      </a-form>

      <a-row style="margin-top: 20px; display: flex; justify-content: space-around;">
        <a-button @click="$router.go(-1)">取消</a-button>
        <a-button type="primary" icon="upload" @click="submit">提交</a-button>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: 'article-info',
  data () {
    return {
      breadcrumb: [{title: '文章', path: ''}, {title: '添加', path: ''}],
      loading: false,
      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 17 ,
        },
      },
      form: this.$form.createForm(this),
    }
  },
  mounted() {
    this.setBreadcrumb()
    if(this.$route.query.id){ // 编辑
      this.getDetail(this.$route.query.id)
    }
  },
  methods: {
    // 获取详情
    getDetail(id) {
      let vm = this
      vm.loading = true
      vm.api.article.getItem({ id }).then(res => {
        if(res.code === '00000') {
          // 数据回填
          vm.form.setFieldsValue({
            title: res.data && res.data.title || undefined,
            author: res.data && res.data.author || undefined,
            content: res.data && res.data.content || undefined,
            group: res.data && res.data.group || undefined,
          })
        } else {
          vm.$message.warning(res.msg || '获取文章详情失败！')
        }
      }).finally(() => {
        vm.loading = false
      })
    },
    // 提交
    submit() {
      let vm = this
      vm.loading = true
      vm.form.validateFields((err, values) => {
        if(err){
          vm.loading = false
          return
        }
        // 执行接口
        let data = {
          title: values.title,
          group: values.group,
          author: values.author,
          content: values.content
        }
        if(vm.$route.query.id) { // 编辑
          vm.api.article.putItem({id: vm.$route.query.id}, data).then(res => {
            if(res.code === '00000') {
              vm.$message.success(res.msg || '新增成功！')
              vm.$router.push({
                path: '/article/list'
              })
            } else {
              vm.$message.warning(res.msg || '新增失败！')
            }
          }).finally(() => {
            vm.loading = false
          })
        } else { // 新增
          vm.api.article.postItem(data).then(res => {
            if(res.code === '00000') {
              vm.$message.success(res.msg || '新增成功！')
              vm.$router.push({
                path: '/article/list'
              })
            } else {
              vm.$message.warning(res.msg || '新增失败！')
            }
          }).finally(() => {
            vm.loading = false
          })
        }
      })
    },
    setBreadcrumb() {
      if(this.$route.query.id) {
        this.breadcrumb.splice(1, 1, {
          title: '编辑',
          path: ''
        })
      }
      this.$store.dispatch('setBreadcrumb', this.breadcrumb)
    },
  }
}
</script>

<style lang="less" scoped>
.article-info{

}
</style>