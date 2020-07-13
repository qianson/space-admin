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
          <el-button type="primary" @click="handleConfirm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        userName: '',
        password: '',
        qrcode: '111'
      }
    }
  },
  methods: {
    handleConfirm() {
        sessionStorage.setItem('userInfo', JSON.stringify(this.ruleForm));
        this.$router.push({
            path: '/admin'
        })
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