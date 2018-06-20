<template>
  <div>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="标题">
          <el-input v-model.trim="searchParams.title" placeholder="字符长度不能超过32个" :maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select clearable placeholder="类型" v-model="searchParams.type">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
        prop="id"
        align="center"
        width="185"
        label="id">
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="mediaType"
        align="center"
        width="180"
        label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.mediaType===1">video</span>
          <span v-if="scope.row.mediaType===2">audio</span>
        </template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="format"
        align="center"
        width="380"
        label="格式">
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="resourceUrl"
        align="center"
        width="380"
        label="资源地址">
      </el-table-column>
      <el-table-column
        :resizable="false"
        prop="pubtime"
        align="center"
        label="发布时间">
        <template slot-scope="scope">
          <span>{{Number(scope.row.pubtime) | date}}</span>
        </template>
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
import {mediaList, deleteMedia} from '../../apis/index'
export default {
  name: 'userAuth',
  data () {
    return {
      typeList: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 1, // 视频
          label: '视频'
        },
        {
          value: 2, // 音频
          label: '音频'
        }
      ],
      searchParams: {
        title: '',
        type: null,
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
      mediaList(this.searchParams).then(res => {
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
        id: row.id
      }
      deleteMedia(param).then(res => {
        this.searchList()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {
    date (bindDate) {
      let date = new Date(bindDate)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
      let s = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style scoped>

</style>
