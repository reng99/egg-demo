<template>
  <div class="dashboard">
    <div id="star">
      <div class="star" v-for="(star, key) in stars" :key="key" :style="{top: star.y , left: star.x}"></div>
    </div>
    <div class="container">
      <img class="logo-img" src="~@/assets/logo.png" alt="">
      <h2 class="hint">{{ msg }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumb: [{title: '仪表盘', path: ''}, {title: '欢迎', path: ''}],
      msg: '欢迎来到后端系统',
      stars: [
        // {
        //   x: 1, // x坐标
        //   y: 1, // y坐标
        // }
      ], // 星星的数组
      screenWidth: document.body.clientWidth,
      divHeight: 180
    }
  },
  methods: {
    setBreadcrumb() {
      this.$store.dispatch('setBreadcrumb', this.breadcrumb)
    },
    // 生成星星
    generateStars() {
      let vm = this
      vm.screenWidth = vm.screenWidth > 1600 ? 1600 : vm.screenWidth
      vm.$nextTick(function() {
        let stars = new Set()

        // js随机生成流星
        for (let j = 0; j < 16; j++) {
          stars.add({
            x: vm.randomDistance(vm.screenWidth, 300) + 'px', // left
            y: vm.randomDistance(vm.divHeight, -100) + 'px', // top
          })
        }

        vm.stars = [...stars]
      })
    },
    randomDistance (max, min) {
      let distance = Math.floor(Math.random() * (max - min + 1) + min)
      return distance
    },
  },
  created () {
    this.generateStars()
  },
  mounted () {
    this.setBreadcrumb()
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
      this.generateStars()
    }
  },
}
</script>

<style lang="less" scoped>
.dashboard{
  position: relative;
  overflow: hidden;
}
.container{
  background: #001529;
  display: flex;
  width: 100%;
  height: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .hint{
    color: #fff;
    margin-top: 18px;
    letter-spacing: 2px;
    font-size: 18px;
  }
}
#star{
  margin: 0 auto;
  max-width: 1600px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  .star{
    display: block;
    background: transparent;
    position: relative;
    opacity: 0;
    width: 1px;
    // width: 2px; height: 10px;background: red;
    /*过渡动画*/ 
    animation: star-fall 3s linear infinite;
  }
  .star:after {
    content: '';
    display: block;
    border: 0px solid #fff;
    border-width: 0px 90px 2px 90px;
    border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 1px 0 rgba(146, 153, 251, .1);
    /*变形*/       
    transform: rotate(-45deg) translate3d(1px, 3px, 0);
    transform-origin: 0% 100%;
  }
}

@keyframes star-fall {
  0% {
    opacity: 0;
    transform: scale(0.5) translate3d(0, 0, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(-200px, 200px, 0);
  }
  100% {
    opacity: 0;
    transform: scale(1.2) translate3d(-300px, 300px, 0);
  }
}
</style>