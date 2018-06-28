<template>
    <div>
      <el-form label-width="100px" :model="ruleForm" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="标题" prop="name">
              <el-input placeholder="请输入标题" v-model="ruleForm.title" :maxlength="32"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="类型" prop="name">
                <el-cascader
                  :options="types"
                  v-model="selectedTypes"
               >
                </el-cascader>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="摘要" prop="name">
              <el-input type="textarea" placeholder="请输入摘要" v-model="ruleForm.summary" :maxlength="128"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="是否推荐" prop="name">
              <el-select v-model="ruleForm.recommand" placeholder="请选择">
                <el-option
                  v-for="item in recommends"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="缩略图" prop="name">
              <el-upload
                drag
                action="/admin/upload"
                :limit="1"
                :headers="headers"
                :on-error="uploadFail"
                :on-success="uploadSuccess"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过200kb</div>
              </el-upload>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row class="edi-wrapper">
          <e @cont="getContent"></e>
        </el-row>
        <el-row class="pub-btn">
          <el-button type="primary" @click="publish">发布</el-button>
        </el-row>
      </el-form>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
</template>

<script>
import E from './Editor'
import {publishArticle} from '../../apis/index'
export default {
  name: 'publishArticle',
  data () {
    return {
      value1: '2018-06-06',
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem('userInfo')).Authorization
      },
      ruleForm: {
        title: '',
        type: null,
        summary: '',
        recommand: null,
        knowCode: null,
        thumbnailUrl: null,
        content: null
      },
      types: [
        {
          value: 1,
          label: '乐学',
          children: [
            {
              value: 1001,
              label: 'html'
            },
            {
              value: 1002,
              label: 'css'
            },
            {
              value: 1003,
              label: 'javascript'
            },
            {
              value: 1004,
              label: 'vue'
            },
            {
              value: 1005,
              label: 'react'
            },
            {
              value: 1006,
              label: 'angular'
            },
            {
              value: 1007,
              label: 'node'
            },
            {
              value: 1008,
              label: '其他'
            }
          ]
        },
        {
          value: 2,
          label: '乐娱',
          children: [
            {
              value: 2001,
              label: '八卦'
            },
            {
              value: 2002,
              label: '体育'
            },
            {
              value: 2003,
              label: '杂谈'
            }
          ]
        }
      ],
      recommends: [
        {value: 1, label: '推荐'},
        {value: 2, label: '不推荐'}
      ],
      selectedTypes: []
    }
  },
  methods: {
    uploadFail () {
      this.$message({
        message: '上传失败',
        type: 'error',
        duration: 1000
      })
    },
    uploadSuccess (data) {
      this.ruleForm.thumbnailUrl = data.data.thumbnailUrl
      this.$message({
        message: '上传成功',
        type: 'success',
        duration: 1000
      })
    },
    publish () {
      console.log(this.ruleForm)
      this.ruleForm.type = this.selectedTypes[0]
      this.ruleForm.knowCode = this.selectedTypes[1]
      if (this.ruleForm.title && this.ruleForm.type && this.ruleForm.summary && this.ruleForm.thumbnailUrl && this.ruleForm.content && this.ruleForm.knowCode) {
        publishArticle(this.ruleForm).then(res => {
          this.$message({
            message: '发布成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push('/admin/articles')
            }
          })
        })
      } else {
        this.$message({
          message: '请补全信息',
          type: 'warning',
          duration: 1000
        })
      }
    },
    getContent (data) {
      this.ruleForm.content = data.html
      console.log(this.ruleForm.content)
    }
  },
  components: {
    E
  }
}
</script>

<style scoped>
  .edi-wrapper{
    padding-left:100px;
  }
.pub-btn{
  text-align:left;
  margin-top:10px;
  padding-left:100px;
}
</style>
