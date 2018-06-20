<template>
    <div>
      <el-container>
        <el-header>
          <el-popover
            placement="top"
            width="160">
            <p style="text-align:center;cursor: pointer;color:#409EFF;" @click="loginOut">退出登录</p>
            <el-button slot="reference" type="text" style="color:#fff;">欢迎登录</el-button>
          </el-popover>
        </el-header>
        <el-container>
          <el-aside width="180">
            <el-menu :default-openeds="['1', '3']">
              <el-submenu index="1" class="router-wrapper">
                <template slot="title"><i class="el-icon-setting"></i>用户信息</template>
                <router-link to="/admin/userauth" exact tag="li"><el-menu-item index="1-1"><i class="el-icon-setting"></i>用户列表</el-menu-item></router-link>
                <router-link to="/admin/videos" exact tag="li"><el-menu-item index="1-2"><i class="el-icon-setting"></i>视频列表</el-menu-item></router-link>
                <router-link to="/admin/articles" exact tag="li"><el-menu-item index="1-3"><i class="el-icon-setting"></i>文章列表</el-menu-item></router-link>
                <router-link to="/admin/publisharticle" exact tag="li"><el-menu-item index="1-4"><i class="el-icon-setting"></i>发布文章</el-menu-item></router-link>
                <router-link to="/admin/media" exact tag="li"><el-menu-item index="1-5"><i class="el-icon-setting"></i>上传媒体文件</el-menu-item></router-link>
              </el-submenu>
              <!--<el-submenu index="2">-->
                <!--<template slot="title"><i class="el-icon-setting"></i>视频</template>-->
                <!---->
              <!--</el-submenu>-->
              <!--<el-submenu index="3">-->
                <!--<template slot="title"><i class="el-icon-setting"></i>文章</template>-->
              <!--</el-submenu>-->
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
import {loginOut} from '../../apis/index'
export default {
  name: 'home',
  methods: {
    loginOut () {
      let param = {
        userId: JSON.parse(sessionStorage.getItem('userInfo')).userId
      }
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
  .el-aside {
    font-size: 12px;
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    width:200px;
    .el-menu{
      height:100%;
    }
  }

  .el-main {
    background-color: #fff;
    color: #333;
    position:absolute;
    left:200px;
    right:0;
  }
  .el-header{
    background-color: #8080ee;
    color: #333;
    text-align: center;
    line-height: 60px;
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
