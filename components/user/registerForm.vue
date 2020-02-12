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
    //验证手机号码
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入手机号码"));
      } else if (/^1[3-9][0-9]{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
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
          },
          { validator: validateUsername, trigger: "blur" }
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
        nickname: [
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
    // 处理发送验证码
    // 发送验证码
    handleSendCaptcha() {
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      this.$axios({
        url: `/captchas`,
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`你输入的验证码为：${code}    ✔正确`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    // 注册
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //checkPassword以外的乘余的属性
          const { checkPassword, ...data } = this.form;
          //调用注册接口
          this.$store.dispatch("user/register", data).then(res => {
            this.$message.success("注册成功");
            this.$router.push("/");
          });
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