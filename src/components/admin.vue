<template>
    <div>
      <el-container>
        <el-header>
          <h2 class="title">订单管理系统</h2>
          <el-popover
            placement="top"
            width="160">
            <p @click="loginOut" class="login-out">退出登录</p>
            <span slot="reference" type="text" class="welcome-login">欢迎登录, {{userName}}</span>
          </el-popover>
        </el-header>
        <el-container>
          <el-aside width="180">
            <el-menu :default-openeds="['2']" background-color="#2B2F39" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-setting"></i>基础数据管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>路况信息</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/clothesStandards" exact tag="li"><el-menu-item index="2-2"><i class="el-icon-setting"></i>衣服规格</el-menu-item></router-link>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>下单</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/clothesStandards" exact tag="li"><el-menu-item index="2-2"><i class="el-icon-setting"></i>待审批订单</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/clothesStandards" exact tag="li"><el-menu-item index="2-2"><i class="el-icon-setting"></i>已审批订单</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/clothesStandards" exact tag="li"><el-menu-item index="2-2"><i class="el-icon-setting"></i>已退订单</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/clothesStandards" exact tag="li"><el-menu-item index="2-2"><i class="el-icon-setting"></i>所有订单</el-menu-item></router-link>
              </el-submenu>
               <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>商品信息</el-menu-item></router-link>
              </el-submenu>
               <el-submenu index="5">
                <template slot="title"><i class="el-icon-setting"></i>库存管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>供应商管理</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>系统库存</el-menu-item></router-link>
              </el-submenu>
               <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>采购管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>商品采购</el-menu-item></router-link>
              </el-submenu>
              <el-submenu index="7">
                <template slot="title"><i class="el-icon-setting"></i>报表管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>订单报表</el-menu-item></router-link>
              </el-submenu>
              <el-submenu index="8">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>用户管理</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>角色管理</el-menu-item></router-link>
                <router-link to="/admin/basicDataManage/roadInfo" exact tag="li"><el-menu-item index="2-1"><i class="el-icon-setting"></i>权限管理</el-menu-item></router-link>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <!--<router-view></router-view>-->
    </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      userName: ''
    }
  },
  created() {
     let _session = sessionStorage.getItem('userInfo');
     if (_session) {
       this.userName = JSON.parse(_session).userName;
     }
  },
  methods: {
    loginOut () {
      sessionStorage.removeItem('userInfo')
        this.$router.push('/login')
      loginOut(param).then(res => {
        sessionStorage.removeItem('userInfo')
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .title{
    float: left;
    display: inline-block;
    color: #fff;
  }
  .el-aside {
    font-size: 12px;
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    width:220px;
    &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color:#f8f8f8;
      }
      &::-webkit-scrollbar {//滚动条的宽度
      width:9px;
      height:9px;
      }
      &::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
      }
      &::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
      }
    .el-menu{
      height:100%;
    }
  }

  .el-main {
    line-height:1!important;
    background:#E3EFFE;
    color: #333;
    position:absolute;
    top: 60px;
    left:220px;
    right:0;
    bottom: 0;
    overflow-y: auto;
  }
  .el-header{
    background-color: #2B2F39;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .welcome-login{
        color:#fff;
        float:right;
        cursor: pointer;
    }
    .login-out{
        text-align:right;
        cursor: pointer;
        color:#409EFF;
    }
  .routerActive{
    color: red;
  }
  .router-wrapper a{
    display: block;
    height:100%;
    width:100%;
  }
  .welcome{
    display: inline-block;
    height:100%;
    color:#fff;
    cursor: pointer;
  }
 </style>
 <style>
     .el-aside .el-submenu .el-menu-item{
       width: 200px;
     }
 </style>
