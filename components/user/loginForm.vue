<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入你的用户名/手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输你的密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码不正确，请你正确输入6-16位密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url:'/accounts/login',
            method:'POST',
            data:this.form
          }).then(res=>{
            console.log(res.data)
            const {data} =res;
            console.log(data)
            //这里是把数据存到那个store里面去的
            this.$store.commit('user/setUserInfo',data);
          })
          //在这个主要是打印出来看一下用户输入的数据是否是正确的，若是不正确就能打印出，测试用的
          // console.log(this.form);
        } 
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
