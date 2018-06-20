<template>
  <div>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="用户名">
          <el-input v-model.trim="searchParams.userName" placeholder="字符长度不能超过32个" :maxlength="32"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      class="deviceMgmTable"
      :data="dataList"
      stripe
      border
      style="width:1001px"
      >
      <el-table-column
        :resizable="false"
        type="index"
        align="center"
        label="序号"
        width="55">
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="userId"
        align="center"
        width="185"
        label="userId">
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="userName"
        align="center"
        width="180"
        label="用户名">
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="password"
        align="center"
        width="380"
        label="用户密码">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
        prop="opration">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.userId !== '111'" @click="deleteU(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrapper" style="margin-top:20px;">
      <el-pagination :current-page.sync="searchParams.currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {userList, deleteUser} from '../../apis/index'
export default {
  name: 'userAuth',
  data () {
    return {
      searchParams: {
        userName: '',
        pageSize: 5,
        currentPage: 1
      },
      dataList: [],
      total: 0
    }
  },
  mounted () {
    this.searchList()
  },
  methods: {
    searchList () {
      userList(this.searchParams).then(res => {
        this.dataList = res.data.result
        this.total = res.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    resetSearch () {
      console.log(22222222)
    },
    handleSizeChange (val) {
      this.searchParams.pageSize = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.searchParams.currentPage = val
      this.searchList()
    },
    deleteU (row) {
      let param = {
        userId: row.userId
      }
      deleteUser(param).then(res => {
        this.searchList()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
