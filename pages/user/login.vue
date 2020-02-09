<template>
  <div class="container">
    <!-- 主要内容 -->
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`登录`, `注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <!-- 1.3使用登录表单公共组件 -->
        <loginForm v-if="currentTab ==0"></loginForm>
        <!-- 2.3使用注册表单公共组件-->
        <registerForm v-if="currentTab ==1"></registerForm>
      </div>
    </el-row>
  </div>
</template>

<script>
//1.1引入登录表单公共组件
import loginForm from "@/components/user/loginForm.vue";
//2.1引入注册表单公共组件
import registerForm from '@/components/user/registerForm'
export default {
  data() {
    return {
      currentTab: 1
    };
  },
  components: {
    //  1.2注册登录表单公共组件 2.2注册了注册表单公共组件
    loginForm,registerForm
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
