<template>
  <el-row class="header-wrapper">
    <!-- 饿了么框架组件，开启弹性布布局，可以看官方文档-->
    <el-row type="flex" class="header" justify="space-between" align="middle">
      <!-- logo商标区域 -->
      <div class="logo">
        <img src="/logo.jpg" alt />
      </div>
      <!-- nav首页导航区域 -->
      <el-row type="flex" class="hederNav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- news消息区域 -->
      <!-- user用户注册登录区域 -->
      <div class="user">
        <i class="el-icon-bell">      消息</i>
        <i class="el-icon-caret-bottom"></i>
        <nuxt-link to="user/login" class="login">登录 / 注册</nuxt-link>
      </div>
    </el-row>
  </el-row>
</template>

<script>
export default {};
</script>

<style scope lang='less'>
.header-wrapper {
  min-width: 1000px;
  height: 60px;
  background: #fff;
  box-shadow:0 3px 2px #eee;
}
.header {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  color: #000;
  .logo {
    img {
      display: block;
      width: 156px;
      height: 42px;
    }
  }
  .hederNav {
    flex: 1;
    a {
      display: block;
      height: 60px;
      box-sizing: border-box;
      padding: 0 30px;
      line-height: 60px;
      color: inherit;
      &:hover{
        color: #409eff;
        border-bottom: 4px solid #409eff;
      }
    }
    .nuxt-link-exact-active{
    background: #409eff;
    color: #fff;
  }
   
  }
  .user {
    font-size: 16px;
    color: #6b6d71;
    .login{
      color: #6b6d71;
      font-size: 14px;
    }
  }
  
}
</style>