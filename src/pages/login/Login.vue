<template>
  <div>
    <div class="login-wrapper">
      <div class="admin-sys">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" auto-complete="off" placeholder="用户名" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" auto-complete="off" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="comfirm">
          <el-button type="primary" @click="comfirmLogin('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-date-picker
      type="dates"
      v-model="value14"
      placeholder="选择一个或多个日期">
    </el-date-picker>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import {login} from '../../apis/index'
export default {
  name: 'login',
  data () {
    let validateUserName = (rule, value, callback) => {
      let reg = /^[A-Z]{1}\w{4,8}!$/
      if (!reg.test(value)) {
        callback(new Error('用户名不合法'))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      let reg = /^H\w{4,8}!$/
      if (!reg.test(value)) {
        callback(new Error('密码不合法'))
      } else {
        callback()
      }
    }
    return {
      value14: [],
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          // {required: true, message: '请输入用户名', trigger: 'blur'},
          // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          // {required: true, message: '请输入密码', trigger: 'blur'},
          // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    comfirmLogin (formname) {
      let self = this
      this.$refs[formname].validate((valid) => {
        if (valid) {
          let words = CryptoJS.enc.Utf8.parse(this.ruleForm.password)
          let paramBase64 = CryptoJS.enc.Base64.stringify(words)
          this.ruleForm.password = paramBase64
          login(this.ruleForm).then(res => {
            let userInfo = JSON.stringify(res.data)
            sessionStorage.setItem('userInfo', userInfo)
            self.$router.push('/home')
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // let words1 = CryptoJS.enc.Base64.parse(paramBase64)
      // var parseStr1 = words1.toString(CryptoJS.enc.Utf8)
    }
  }
}
</script>

<style scoped>
  .admin-sys{
    text-align:center;
    padding: 16px 0;
    font-size:24px;
  }
.login-wrapper{
  width:400px;
  height:300px;
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 50%;
  transform:translate3d(-50%,-50%,0);
  border-radius: 5px;
  background-clip: padding-box;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
  .comfirm button{
    width:100%;
  }
</style>
