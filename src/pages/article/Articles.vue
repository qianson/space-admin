<template>
    <div>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item label="标题">
            <el-input v-model.trim="searchParams.title" placeholder="字符长度不能超过32个" :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select clearable placeholder="类型" v-model="searchParams.knowCode">
              <el-option v-for="item in typesList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-select clearable placeholder="是否推荐" v-model="searchParams.recommend">
              <el-option v-for="item in recommend" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchList">查询</el-button>
            <el-button type="primary" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        class="deviceMgmTable"
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          :resizable="false"
          type="index"
          align="center"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="title"
          align="center"
          width="200"
          show-overflow-tooltip
          label="标题">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="summary"
          align="center"
          width="400"
          show-overflow-tooltip
          label="摘要">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="type"
          width="100"
          align="center"
          label="类型">
          <template slot-scope="scope">
            <el-col v-if="scope.row.type===1">乐学</el-col>
            <el-col v-else-if="scope.row.type===2">乐娱</el-col>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="type"
          width="100"
          align="center"
          label="是否推荐">
          <template slot-scope="scope">
            <el-col v-if="scope.row.recommend===1">推荐</el-col>
            <el-col v-else-if="scope.row.recommend===2">不推荐</el-col>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="knowCode"
          align="center"
          width="100"
          label="文章分类">
          <template slot-scope="scope">
            <el-col v-if="scope.row.knowCode===1001">html</el-col>
            <el-col v-else-if="scope.row.knowCode===1002">css</el-col>
            <el-col v-if="scope.row.knowCode===1003">javascript</el-col>
            <el-col v-else-if="scope.row.knowCode===1004">vue</el-col>
            <el-col v-if="scope.row.knowCode===1005">angular</el-col>
            <el-col v-else-if="scope.row.knowCode===1006">react</el-col>
            <el-col v-if="scope.row.knowCode===1007">node</el-col>
            <el-col v-else-if="scope.row.knowCode===1008">其他</el-col>
            <el-col v-if="scope.row.knowCode===2001">八卦</el-col>
            <el-col v-else-if="scope.row.knowCode===2002">体育</el-col>
            <el-col v-else-if="scope.row.knowCode===2003">杂谈</el-col>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="pubTime"
          align="center"
          label="发布时间"
          >
          <template slot-scope="scope">
            <div slot="reference">
              <p>{{ Number(scope.row.pubTime) | date}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          prop="opration">
          <template slot-scope="scope">
            <el-button  type="text" @click="editArt(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteArt(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrapper" style="margin-top:20px;">
        <el-pagination :current-page.sync="searchParams.currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 1]" :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <el-dialog title="编辑文章" :visible.sync="dialogFormVisible" @close="closeDia('editForm')">
        <el-form :model="editForm" ref="editForm">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="editForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="摘要" :label-width="formLabelWidth">
            <el-input v-model="editForm.summary" auto-complete="off"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否推荐" :label-width="formLabelWidth">
                <el-select v-model="editForm.recommend" placeholder="请选择活动区域">
                  <el-option v-for="item in editorRecommend" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select placeholder="类型" v-model="editForm.type">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="文章归类" :label-width="formLabelWidth">
                <el-select placeholder="文章归类" v-model="editForm.knowCode">
                  <el-option v-for="item in typesList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {getArticles, deleteArticle, editArticle} from '../../apis/index'
export default {
  name: 'articles',
  data () {
    return {
      dialogFormVisible: false,
      editForm: {},
      formLabelWidth: `100px`,
      total: 0,
      tableData: [],
      searchParams: {
        title: null,
        knowCode: null,
        recommend: null,
        currentPage: 1,
        pageSize: 5
      },
      editorRecommend: [
        {label: '推荐', value: 1},
        {label: '不推荐', value: 2}
      ],
      recommend: [
        {label: '全部', value: null},
        {label: '推荐', value: 1},
        {label: '不推荐', value: 2}
      ],
      typesList: [
        {label: '全部', value: null},
        {label: 'html', value: 1001},
        {label: 'css', value: 1002},
        {label: 'javascript', value: 1003},
        {label: 'vue', value: 1004},
        {label: 'angular', value: 1005},
        {label: 'react', value: 1006},
        {label: 'node', value: 1007},
        {label: '其他', value: 1008},
        {label: '娱乐', value: 2001},
        {label: '体育', value: 2002},
        {label: '杂谈', value: 2003}
      ],
      types: [
        {value: 1, label: '乐学'},
        {value: 2, label: '乐娱'}
      ]
    }
  },
  mounted () {
    this.searchList()
  },
  methods: {
    searchList () {
      getArticles(this.searchParams).then(res => {
        this.tableData = res.data.result
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
    editArt (row) {
      this.dialogFormVisible = true
      this.editForm = JSON.parse(JSON.stringify(row))
    },
    editConfirm () {
      editArticle(this.editForm).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.dialogFormVisible = false
          }
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '编辑失败',
          type: 'error',
          duration: 1000
        })
      })
    },
    deleteArt (row) {
      let params = {
        id: row.id
      }
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(params).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.searchList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    closeDia (formName) {
      this.editForm = {
      }
      console.log(this.editForm)
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
