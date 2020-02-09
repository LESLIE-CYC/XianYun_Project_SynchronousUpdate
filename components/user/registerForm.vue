<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的昵称" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据，可以看后台提供的API
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      // 表单规则，
      rules: {
        //用户名
        username: [
          {
            required: true,
            message: "请输入你的用户名/手机号",
            trigger: "blur"
          }
        ],
        //验证码 
        captcha: [
          {
            required: true,
            message: "请输入你的用户名/手机号",
            trigger: "blur"
          }
        ],
        //昵称 
        nickname:[
            {
            required: true,
            message: "请输入你的昵称",
            trigger: "blur" 
            }
        ],
        //密码
        password: [{ validator: validatePass, trigger: "blur" }],
        //确认密码
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
        if(this.form.username == ''){
            return;
        }
        //调用store仓库中的user
        this.$store.dispatch('user/sendCaptcha',this.form.username).then(res =>{
            this.$message.success('模拟手机验证码：000000')
        })
        /* 
        这里的代码已封装到store/user.js里面去，到时有方便用
        this.$axios({
            url:'/captchas',
            mehtod:'POST',
            data:{
                //当前用户所输入的手机号码
                tel:this.form.username
            }
            }).then(res =>{
                // console.log(res)
        }) */
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);
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