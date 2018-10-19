<template>
  <div class="__volunteerAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增居民</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机号码" prop="mobile" class="form-control">
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>

          <el-form-item label="真实姓名" prop="truename" class="form-control">
            <el-input v-model="ruleForm.truename" placeholder="请输入真实姓名"></el-input>
          </el-form-item>

           <el-form-item label="身份证号码" prop="idCard" class="form-control">
            <el-input v-model="ruleForm.idCard" placeholder="请输入身份证号码"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <upload ref="upload" :upload=upload2></upload>
          </el-form-item>

          <el-form-item label="性别" prop="sex" class="form-control">
              <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
          </el-form-item>

          <el-form-item label="备注">
            <el-input type="textarea" v-model="ruleForm.description" placeholder="写点什么吧！"></el-input>
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
  import {uploadPath} from '@/path/path';//上传接口地址
  import {add} from "api/people/index";//新增
  import {update} from "api/people/index";//修改
  import {queryOne} from "api/people/index";//查询单个
  import upload from 'src/components/common/upload'

  export default {
    components: {
      upload,
    },
    data() {
      return {
        upload2: {"id": "test2" },
        ruleForm: {
          mobile: "",
          description: "",
          sex: '1',
          idCard
        },
        rules: {
          mobile: [
            {required: true, message: "请输入手机号", trigger: "blur"},
            {pattern: /^[0-9]*$/, message: '请输入整数'},
            {min: 11, max: 11, message: "请输入长度为11位数的手机号", trigger: "blur"}
          ],
          truename: [
            {required: true, message: "请输入真实姓名", trigger: "blur"},
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          idCard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      if (this.$route.query.type == 2) {
        this.taskQueryOnePost();
      }
    },
    methods: {
      //查询单个
      taskQueryOnePost() {
        queryOne({peopleId: this.$route.query.uuid}).then(data => {
          if (data.data.code == 200) {
            this.ruleForm.mobile = data.data.data.mobile;
            this.ruleForm.truename = data.data.data.truename;
            this.ruleForm.sex = ''+data.data.data.sex+'';
            this.ruleForm.description = data.data.data.description
            this.ruleForm.idCard = data.data.data.idCard;
            var headPic = '';
            if(data.data.data.headPic==''){
              headPic = 'static/upload/upload-120-120.png'
            }else {
              headPic = data.data.data.headPic
            }
            this.$refs.upload.dataListsingle = headPic
          }
        })
      },
      //新增
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.$route.query.type == 1) {
              var headPic = '';
              if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
                headPic = '';
              }else{
                headPic = this.$refs.upload.dataListsingle;
              }
              let params = {
                mobile: this.ruleForm.mobile,
                truename: this.ruleForm.truename,
                sex: this.ruleForm.sex,
                description: this.ruleForm.description,
                role: 1,
                identityFlag: 0,
                communityId: JSON.parse(sessionStorage.getItem("userData")).communityId,
                headPic: headPic,
                sysType: JSON.parse(sessionStorage.getItem("userData")).sysType,
                idCard: this.ruleForm.idCard
              };
              add(params).then(data => {
                var _this = this;
                if (data.data.code == 200) {
                  this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.push({path: '/home/sqCommunity/personnel'})
                    }
                  });
                }
              })
            } else if (this.$route.query.type == 2) {
              var headPic = '';
              if(this.$refs.upload.dataListsingle=='static/upload/upload-120-120.png'){
                headPic = '';
              }else{
                headPic = this.$refs.upload.dataListsingle;
              }
              let params = {
                uuid: this.$route.query.uuid,
                mobile: this.ruleForm.mobile,
                sex: this.ruleForm.sex,
                truename: this.ruleForm.truename,
                description: this.ruleForm.description,
                headPic: headPic,
                idCard: this.ruleForm.idCard
              };
              update(params).then(data => {
                var _this = this;
                if (data.data.code == 200) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function () {
                      _this.$router.push({path: '/home/sqCommunity/personnel'})
                    }
                  });
                }
              })
            }

          } else {
            return false;
          }
        });
      },
    }
  };
</script>

<style lang="stylus">
  .__volunteerAdd {
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
