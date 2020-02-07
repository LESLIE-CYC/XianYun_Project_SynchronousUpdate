<template>
  <div>
    <!-- 1.3使用头部组件  -->
    <Header></Header>
    <!-- 内容占位组件 -->
    <nuxt />
    <!-- 2.3使用底部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
//引入公共组件区域
//1.1引入头部公共组件
import Header from '@/components/header.vue'
//2.1引入底部公共组件
import Footer from '@/components/footer.vue'
export default {
components:{
  //1.2注册头部组件 2.2注册底部公共组件
  Header,Footer
}
}
</script>

<style scope lang="less">
*{
  margin: 0;
  padding: 0;
}
ul ol dl{
  list-style: none;
}
a{
  text-decoration: none;
}
</style>
