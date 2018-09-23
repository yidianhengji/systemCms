<template>
  <div class="__circleManageAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增圈子</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入公告名称"></el-input>
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
  import { add, update, queryOne  } from "@/api/notice/index";
  export default {
    data() {
      return {
        ruleForm: {
          name: "",
        },
        rules: {
          name: [
            {required: true, message: "请输入文章内容", trigger: "blur"},
            {max: 64, message: "名称不能大于64位", trigger: "blur"}
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
                title: this.ruleForm.name,
                communityId: sessionStorage.getItem("communityId"),
                type: 1
              }
              add(params).then(data => {
                var _this = this;
                if (data.data.code == 200) {
                  this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.push({path: '/home/sqContern/notice'})
                    }
                  });
                }
              })
            }else if(this.$route.query.type == 2){
              let params = {
                uuid: this.$route.query.uuid,
                title: this.ruleForm.name,
                communityId: sessionStorage.getItem("communityId"),
                type: 1
              }
              update(params).then(data => {
                var _this = this;
                if (data.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.push({path: '/home/sqContern/notice'})
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
            this.ruleForm.name = data.data.data.title;
            this.defaultMsg = data.data.data.content;
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
