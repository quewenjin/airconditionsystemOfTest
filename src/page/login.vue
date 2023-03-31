<template>
  <div class="loginbody">
    <el-card class="box-card">
      <div slot="header" class="box-card-header">
        空调管理系统
      </div>
      <div class="logindata">
        <div class="logintext">
        </div>
        <div class="formdata">
          <el-form ref="loginForm" :model="loginForm" :rules="rules">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
              <el-input v-model="loginForm.userPassword" clearable placeholder="请输入密码" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tool">
          <div>
            <el-checkbox v-model="checked" @change="remenber">记住密码</el-checkbox>
          </div>
          <div>
            <span class="shou" @click="forgetpas">忘记密码？</span>
          </div>
        </div>
        <div class="butt">
          <el-button type="primary" @click.native.prevent="login('form')">登录</el-button>
          <el-button class="shou" @click="register">注册</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import { userLogin } from '@/api/api.js'

export default {
  data() {
    return {
      loginForm: {
        userName: 'test',
        userPassword: '123456'
      },
      checked: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 16, message: "不能大于16个字符", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 16, message: "不能大于16个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(['$_setStorage']),
    // 登录
    login() {
      let _this = this;
      if (this.loginForm.userName === '' || this.loginForm.userPassword === '') {
        alert('账号或密码不能为空');
      } else {
        userLogin(
          JSON.stringify(_this.loginForm)
        ).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            _this.$_setStorage(res.data.token);
            _this.$router.push('/center/home');
            alert('登录成功')
          } else {
            alert('账号或密码错误');
          }
        })
        // 珏崇哥说这样不够优雅，留个样本
        // this.$http({
        //   method: 'post',
        //   url: 'http://82.157.150.120:8081/user/login',
        //   data: _this.loginForm
        // }).then(res => {
        //   console.log(res)
        //   if (res.data.code == 200) {
        //     _this.$_setStorage(res.data.token);
        //     _this.$router.push('/center/home');
        //     alert('登录成功')
        //   } else {
        //     alert('账号或密码错误');
        //   }
        // })
      }
    },
    // 记住密码
    remenber(data) {
      this.checked = data
      if (this.checked) {
        localStorage.setItem("news", JSON.stringify(this.form))
      } else {
        localStorage.removeItem("news")
      }
    },
    // 忘记密码
    forgetpas() {
      this.$message({
        type: "info",
        message: "功能尚未开发",
        showClose: true
      })
    },
    register() { },
  },
};
</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../assets/login.jpg");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 0px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 20px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

.box-card {
  width: 480px;
  height: 300px;
  margin: auto;
  border-radius: 12px
}

.box-card-header {
  text-align: center;
  font-size: 24px;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>

