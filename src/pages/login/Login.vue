<template>
  <div>
    <div class="login-wrapper">
      <div class="admin-sys">订单管理系统</div>
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" auto-complete="off" placeholder="用户名" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input auto-complete="off" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="qrcode">
          <el-input auto-complete="off" placeholder="二维码" v-model="ruleForm.qrcode" class="qrcode"></el-input>
          <el-button>1111</el-button>
        </el-form-item>
        <el-form-item class="comfirm">
          <el-button type="primary" @click="comfirmLogin('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        password: '',
        qrcode: '111'
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
          this.$router.push({
            path: '/admin'
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
  box-sizing: border-box;
  position: fixed;
  left: 80%;
  top: 40%;
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
  .qrcode{
    width: 100px;
  }
</style>
