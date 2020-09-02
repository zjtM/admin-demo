<template>
  <div class="login_container">
    <!-- 头像 -->
    <div class="log_box">
      <div class="logo_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录 -->
      <el-form class="log_info" ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-edit" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="Hanglogin">登录</el-button>
          <el-button type="info" @click="restLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/index.js";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //登录
    Hanglogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          let { data: res } = await Login(this.loginForm);
          console.log(res);
          if (res.meta.status == 200) {
            this.BaseTool.Strorege.setSessionStorage("token", res.data.token);
            this.$router.push({ path: "/home" }).catch((err) => {
            console.log(err);
          });
          }
          
        }
      });
    },
    //重置按钮
    restLoginForm() {
      this.$refs.loginFormRef.resetFields();
      this.$message.success("重置成功");
      var arr = [10, 20, 30, 40];
      var a = arr.forEach((item, index) => {
        console.log(item);
        console.log(index);
        return item * 2;
      });
      console.log(a); //undefined forEach 没有返回值
      var c = arr.map((item, index) => {
        console.log(item);
        console.log(index);
        return item * 2;
      });
      console.log(c); //[20, 40, 60, 80] map有返回值
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
  .log_box {
    height: 350px;
    width: 450px;
    background: #ffffff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .logo_box {
      height: 130px;
      width: 130px;
      border-radius: 50%;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .log_info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
