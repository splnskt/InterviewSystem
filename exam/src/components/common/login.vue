<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="bottom">
          <div class="container">
            <div class="system-title">
              <span>公务员考试系统</span>
            </div>
            <p class="title">账号登录</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名">
                <el-input v-model.number="formLabelAlign.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>

            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer">

    </el-row>
<!--    <section class="remind">-->
<!--      <span>管理员账号：10086</span>-->
<!--      <span>面试官账号：20081003</span>-->
<!--      <span>学生账号：20155009</span>-->
<!--      <span>密码都是：123456</span>-->
<!--    </section>-->
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "login",
  data() {
    return {
      role: 2,
      labelPosition: 'left',
      formLabelAlign: {
        username: '20155009',
        password: '123456'
      }
    }
  },
  methods: {
    //用户登录请求后台处理
    login() {
      console.log("登录操作执行-------");
      this.$axios({
        url: `/api/login`,
        method: 'post',
        data: {
          ...this.formLabelAlign
        }
      }).then(res=>{
        let resData = res.data.data
        if(resData != null) {
          switch(resData.role) {
            case "0":  //管理员
              this.$cookies.set("cname", resData.adminName)
              this.$cookies.set("cid", resData.adminId)
              this.$cookies.set("role", 0)
              this.$router.push({path: '/index' }) //跳转到首页
              break
            case "1": //教师
              this.$cookies.set("cname", resData.teacherName)
              this.$cookies.set("cid", resData.teacherId)
              this.$cookies.set("role", 1)
              this.$router.push({path: '/index' }) //跳转到教师用户
              break
            case "2": //学生
              this.$cookies.set("cname", resData.studentName)
              this.$cookies.set("cid", resData.studentId)
              this.$router.push({path: '/student'})
              break
          }
        }
        if(resData == null) { //错误提示
          this.$message({
            showClose: true,
            type: 'error',
            message: '用户名或者密码错误'
          })
        }
      })
    },
    clickTag(key) {
      this.role = key
    }
  },
  computed: mapState(["userInfo"]),
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.remind {
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 50%;
  flex-direction: column;
  color: #606266;
  background-color: #fff;
  border-left: 4px solid #409eff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.container {
  margin-bottom: 32px;
}
.container .el-radio-group {
  margin: 30px 0px;
}
a:link {
  color:#ff962a;
  text-decoration:none;
}
#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}
#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url('../../assets/img/loginbg.png')center top / cover no-repeat;
  background-color: #b6bccdd1 !important;
}
#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #3CB371;
  display: flex;
  justify-content: center;
}
#login .top .icon-kaoshi {
  font-size: 80px;
}
#login .top .title {
  margin-top: 20px;
}
#login .bottom {
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin-top: 100px;
  padding: 20px 0;
}
#login .bottom .title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin: 20px 0 30px;
}
.bottom .container .title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin: 20px 0 30px;
}
.bottom .submit .row-login {
  width: 100%;
  background-color: #3CB371;
  border-color: #3CB371;
  margin: 30px 0 20px;
  padding: 15px 20px;
  border-radius: 25px;
}
.bottom .submit .row-login:hover {
  background-color: #45cc7d;
  border-color: #45cc7d;
}
.bottom .submit {
  display: flex;
  justify-content: center;
}
.footer {
  margin-top: 50px;
  text-align: center;
}
.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}
.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}
.bottom .options {
  margin-bottom: 40px;
  color: #3CB371;
  display: flex;
  justify-content: space-between;
}
.bottom .options > a {
  color: #3CB371;
}
.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
.system-title {
  text-align: center;
  font-size: 28px;
  color: #3CB371;
  font-weight: bold;
  margin: 20px 0 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.el-form {
  padding: 0 20px;
}
.el-form-item {
  margin-bottom: 25px;
}
.el-input__inner {
  border-radius: 20px;
  padding: 0 20px;
}
</style>
