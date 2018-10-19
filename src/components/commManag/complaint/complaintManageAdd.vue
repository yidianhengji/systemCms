<template>
  <div class="__complaintManageAdd__">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增建议投诉</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!--<el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入建议投诉标题"></el-input>
          </el-form-item>-->

          <el-form-item label="内容" prop="content" class="form-control">
            <el-input type="textarea" :rows="5" v-model="ruleForm.content" placeholder="请输入建议投诉内容"></el-input>
          </el-form-item>

          <el-form-item label="图片">
            <upload ref="upload" :upload=upload2></upload>
          </el-form-item>

          <el-form-item label="姓名" prop="createName" class="form-control">
            <el-input v-model="ruleForm.createName" placeholder="请输入创建人姓名"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="phone" class="form-control">
            <el-input  v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>

  </div>
</template>

<script>
  import upload from '@/components/common/upload'

  export default {
    name: "complaintManageAdd",
    components: {
      upload
    },
    data() {
      return {
        upload2: {"id": "test2", "multiple": "multiple", "leng": "9"},
        ruleForm: {
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 450
          },
          name: '',
          content: '',
          createName: '',
          phone: ''
        }
      }
    },
    created() {
      if(this.$route.query.uuid) {
        this.$api.postAndJson('/backen/complaint/queryOne', {uuid: this.$route.query.uuid}).then((res) => {
          this.ruleForm = {
            name: res.data.data.name,
            content: res.data.data.content,
            createName: res.data.data.createName,
            phone: res.data.data.phone,
          }
          if(res.data.data.files!=''){
            this.$refs.upload.dataListdouble = JSON.parse(res.data.data.files)
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        let This = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            let p = {
              name: this.ruleForm.name,
              content: this.ruleForm.content,
              createName: this.ruleForm.createName,
              files: JSON.stringify(this.$refs.upload.dataListdouble),
              phone: this.ruleForm.phone,
              communityId: sessionStorage.getItem('communityId')
            }
            let path = '';
            if(this.$route.query.uuid) {
              p.uuid = this.$route.query.uuid
              path = '/backen/complaint/update';
            }else{
              path = '/backen/complaint/add';
            }
            this.$api.postAndJson(path, p).then(res=>{
              this.$router.go(-1)
            })
          }
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
.__complaintManageAdd__ {
  .addFromListBox {
    width 960px;
  .form-control {
    width 60%;
  }
  .el-textarea {
      textarea {
        height 90px;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
