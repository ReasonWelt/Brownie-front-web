<template>
  <div class="LoginComponent">
    <div class="Loginbox" v-if="lorrFlog">
      <div class="LoginBoxHeader">
        <h1>Login</h1>
      </div>
      <el-divider></el-divider>
      <div class="LoginBoxForm">
        <div class="loginInputbox"><input type="text" placeholder="请输入账号" v-model="loginForm.username"></div>
        <div class="loginInputbox"><input type="password" placeholder="请输入密码" v-model="loginForm.password"></div>
      </div>
      <div class="LoginBoxFooter">
        <div class="LoginButton" @click="loginSuccess()">
          go
        </div>
        <div class="LoginButton" @click="ChangeLor()">
          to Register
        </div>
      </div>
    </div>
    <div class="Loginbox" v-if="!lorrFlog">
      <div class="LoginBoxHeader">
        <h1>Register</h1>
      </div>
      <el-divider></el-divider>
      <div class="LoginBoxForm">
        <div class="loginInputbox"><input type="text" placeholder="请输入昵称" v-model="registerForm.name"></div>
        <div class="loginInputbox"><input type="text" placeholder="请输入用户名" v-model="registerForm.account"></div>
        <div class="loginInputbox"><input type="text" placeholder="请输入密码" v-model="registerForm.password"></div>
        <div class="loginInputbox"><input type="text" placeholder="再次确认密码" v-model="registerForm.againPass"></div>
        <div class="loginInputbox"><input type="text" placeholder="请输入邮箱" v-model="registerForm.email"></div>
      </div>
      <div class="LoginBoxFooter">
        <div class="LoginButton" @click="RegisterSubmit()">
          go
        </div>
        <div class="LoginButton" @click="ChangeLor()">
          to Login
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        account: "",
        password: "",
        againPass: "",
        name: "",
        email: "",
      },
      lorrFlog: true,
    };
  },
  methods: {
    loginSuccess() {
      if (this.loginForm.username == "") {
        this.$message.warning("用户名未填写");
      } else if (this.loginForm.password == "") {
        this.$message.warning("密码未填写");
      } else {
        userApi
          .userLogin(this.loginForm.username, this.loginForm.password)
          .then((response) => {
            if (response.code > 200) {
              this.$message.error(response.data.msg);
            } else {
              localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.userInfo)
              );
              localStorage.setItem("token", response.data.token);
              this.$message.success("登录成功");
              this.$router.push("/");
            }
          });
      }
    },
    RegisterSubmit() {
      var emailTes = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var nameTes = /^[\u4e00-\u9fa5a-zA-Z0-9]{3,11}$/;
      var accountpTes = /^[a-zA-Z0-9]{6,12}$/;
      var passwordTes = /^(?=.*[a-zA-Z])(?=.*\d).{6,12}$/;
       if (this.registerForm.name == "") {
        this.$message.warning("昵称未填写");
      }else if (!nameTes.test(this.registerForm.name)) {
        this.$message.warning("昵称格式错误");
        this.$notify.info({
          title: "昵称格式：",
          message: "由3-11位的字母、数字，中文组成",
        });
      } else if (this.registerForm.account == "") {
        this.$message.warning("用户名未填写");
      } else if (!accountpTes.test(this.registerForm.account)) {
        this.$message.warning("用户名格式错误");
        this.$notify.info({
          title: "用户名格式：",
          message: "由6-12位的字母、数字组成",
        });
      }else if (this.registerForm.password == "") {
        this.$message.warning("密码未填写");
      } else if (!passwordTes.test(this.registerForm.password)) {
        this.$message.warning("密码格式错误");
        this.$notify.info({
          title: "密码格式：",
          message: "由6-12位包含至少一个字母，至少一个数字构成",
        });
      } else if (this.registerForm.againPass == "") {
        this.$message.warning("请再次输入密码以验证");
      } else if (this.registerForm.againPass != this.registerForm.password) {
        this.$message.warning("两次密码不一致");
      } else if (this.registerForm.email == "") {
        this.$message.warning("邮箱未填写");
      } else if (!emailTes.test(this.registerForm.email)) {
        this.$message.warning("请按照邮箱格式填写");
        this.$notify.info({
          title: "邮箱格式：",
          message: "如：XXxx123@xxx.xxx\n(本邮箱用作)",
        });
      } else {
        userApi.userRegister(this.registerForm).then((response) => {
          if (response.code > 200) {
            this.$message.error("注册失败");
          } else {
            this.$message.success("注册成功");
            this.$router.push("/Login");
            this.lorrFlog = true
          }
        });
      }
    },
    ChangeLor() {
      this.loginForm = {
        username: "",
        password: "",
      };
      this.registerForm = {
        account: "",
        password: "",
        againPass: "",
        name: "",
        email: "",
      };
      this.lorrFlog = !this.lorrFlog;
    },
  },
};
</script>

<style>
.LoginComponent {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.Loginbox {
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
  width: 500px;
  /* height: 500px; */
  padding: 50px;
  box-sizing: border-box;
  /* border: 1px solid blue; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: 1s ease 0s;
  background-color: #fff;
}

/* .LoginBoxForm{
    flex: 0 0 40%;
} */

.loginInputbox {
  height: 33px;
  margin: 20px 0px;
}

.LoginBoxForm input {
  display: block;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.274);
  width: 300px;
  height: 30px;
  padding: 10px;
  transition: 0.3s ease 0s;
}

.LoginBoxForm input:focus {
  border-bottom: 3px solid blue;
}

.LoginButton {
  background-color: rgb(183, 209, 255);
  color: #525252;
  width: 200px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  transition: 0.3s ease 0s;
  border-radius: 5px;
  border: 1px solid rgb(100, 154, 254);
  cursor: pointer;
  margin-top: 10px;
}

.LoginButton:hover {
  background-color: rgb(100, 154, 254);
  color: #fff;
}
</style>