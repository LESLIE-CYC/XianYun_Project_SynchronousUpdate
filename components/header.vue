<template>
<!-- 这个是所有页面•头部页面的•公共组件 -->
  <div class="header-wrapper">
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
      <!-- 登录/用户信息 -->
      <el-row type="flex" align="middle" class="account-link">
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <!--用户提示消息•状态为•已登录•鼠标点击时会触发-->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
               &nbsp;&nbsp;&nbsp;<i class="el-icon-message-solid"></i>
              铃声通知
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>最新消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--已登录•个人中心-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--未注册•游客-->
        <nuxt-link to="/user/login" class="account-link" v-else>&nbsp;&nbsp;&nbsp;登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    //用户退出
    handleLogout() {
      this.$store.commit("user/setUserInfo", {
        token: "",
        user: {}
      });
    }
  },
  mounted() {}
};
</script>

<style scope lang='less'>
.header-wrapper {
  min-width: 1000px;
  height: 60px;
  background: #fff;
  box-shadow: 0 3px 2px #eee;
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
      padding: 0 23px;
      line-height: 60px;
      color: inherit;
      &:hover {
        color: #409eff;
        border-bottom: 4px solid #409eff;
      }
    }
    .nuxt-link-exact-active {
      background: #409eff;
      color: #fff;
    }
  }
  .el-dropdown-link {
    margin-left: 20px;

    &:hover {
      img {
        border-color: #409eff;
      }
    }
    a {
      display: block;
      font-size: 16px;
      color: #6b6d71;
    }
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px #fff solid;
      border-radius: 50px;
    }
  }
  .account-link {
    font-size: 16px;
    color: #6b6d71;
  }
}
</style>