<template>
  <div class="__circleManageAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增圈子</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入圈子名称"></el-input>
          </el-form-item>
          <el-form-item label="圈子图标">
            <upload ref="upload" :upload=upload2></upload>
          </el-form-item>
          <el-form-item label="圈子介绍">
            <el-input type="textarea" v-model="ruleForm.description" placeholder="写点什么吧！"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import upload from '@/components/common/upload'
  import { add, update, queryOne  } from "@/api/circle/index";
  export default {
    components: {
      upload
    },
    data() {
      return {
        upload2: {"id": "test2" },
        ruleForm: {
          name: "",
          description: "",
        },
        rules: {
          name: [
            {required: true, message: "请输入圈子内容", trigger: "blur"},
            {max: 6, message: "名称不能大于6位", trigger: "blur"}
          ],
        }
      };
    },
    mounted(){
      if (this.$route.query.type == 2) {
        this.queryOneList();
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.$route.query.type == 1) {
              let params = {
                name: this.ruleForm.name,
                orgid: sessionStorage.getItem("communityId"),
                headPic: this.$refs.upload.dataListsingle,
                description: this.ruleForm.description,
              }
              add(params).then(data => {
                var _this = this;
                if (data.data.code == 200) {
                  this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.push({path: '/home/sqCircle/circleManage'})
                    }
                  });
                }
              })
            }else if(this.$route.query.type == 2){
              let params = {
                uuid: this.$route.query.uuid,
                name: this.ruleForm.name,
                orgid: sessionStorage.getItem("communityId"),
                headPic: this.$refs.upload.dataListsingle,
                description: this.ruleForm.description,
              }
              update(params).then(data => {
                var _this = this;
                if (data.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.push({path: '/home/sqCircle/circleManage'})
                    }
                  });
                }
              })
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      queryOneList(){
        queryOne({uuid: this.$route.query.uuid}).then(data => {
          if (data.data.code == 200) {
            this.ruleForm.name = data.data.data.name;
            this.ruleForm.description = data.data.data.description;
            if(data.data.data.headPic!=''){
              this.$refs.upload.dataListsingle = data.data.data.headPic
            }
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  };
</script>

<style lang="stylus">
  .__circleManageAdd {
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
  }
</style>
