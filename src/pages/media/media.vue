<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/admin/upload"
      :headers="headers"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'media',
  data () {
    return {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem('userInfo')).Authorization
      }
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    }
  }
}
</script>

<style scoped>

</style>
