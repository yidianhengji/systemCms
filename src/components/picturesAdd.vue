<template>
  <div class="__picturesAdd__">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增轮播图</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title" class="form-control">
            <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="权重" prop="weight" class="form-control">
            <el-input v-model="ruleForm.weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="外链接" prop="fUrl" class="form-control">
            <el-input v-model="ruleForm.fUrl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <upload ref="upload" :upload=upload2></upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import upload from 'src/components/common/upload'

  export default {
    name: "picturesAdd",
    components: {upload},
    data() {
      return {
        upload2: {"id": "test2"},
        ruleForm: {
          title: "",
          weight: "",
          fUrl: ''
        },
        rules: {}
      }
    },
    created() {
      this.$api.postAndJson('/backen/pictures/queryOne', {uuid: this.$route.query.uuid}).then(res=> {
        let d = res.data.data;
        this.ruleForm.title = d.title;
        this.ruleForm.weight = d.weight;
        this.ruleForm.fUrl = d.fUrl;
        if(!d.url) {
          this.$refs.upload.dataListsingle =  'static/upload/upload-120-120.png'
        }else{
          this.$refs.upload.dataListsingle = d.url;
        }
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            var headPic = ''
            if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
              alert('图片是必填的');
              headPic = '';
              return;
            }else{
              headPic = this.$refs.upload.dataListsingle;
            }


            var p = {
              title: this.ruleForm.title,
              weight: this.ruleForm.weight,
              url: headPic,
              fUrl: this.ruleForm.fUrl
            }

            var u = '';
            if(this.$route.query.uuid) {
              u = '/backen/pictures/update'
              p.uuid = this.$route.query.uuid
            }else{
              u = '/backen/pictures/add'
            }

            this.$api.postAndJson(u, p).then(res=> {
              this.$router.go(-1)
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
