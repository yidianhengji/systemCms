<template>
  <div class="__circleManageAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增公告</span>
      </div>
      <div class="addFromListBox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入公告名称"></el-input>
          </el-form-item>
          <el-form-item label="所属圈子：">
            <el-select v-model="ruleForm.circleId" placeholder="请选择所属圈子">
              <el-option
                :label="item.name"
                :value="item.uuid"
                v-for="(item ,index) in circle_list"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <div class>
              <UE :defaultMsg="defaultMsg" :config="config" :id="ue1" ref="ue"></UE>
            </div>
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
import { add, update, queryOne } from "@/api/notice/index";
import UE from "@/components/common/ue";

export default {
  components: { UE },
  data() {
    return {
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 450
      },
      ue1: "ue1", // 不同编辑器必须不同的id
      ruleForm: {
        name: "",
        circleId: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
          { max: 64, message: "名称不能大于64位", trigger: "blur" }
        ]
      },
      circle_list: []
    };
  },
  created() {
    this.$api.postAndJson("/backen/circle/query", {}).then(res => {
      this.circle_list = res.data.data.list;
    });
  },
  mounted() {
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
              type: 2,
              circleId: this.ruleForm.circleId
            };
            add(params).then(data => {
              var _this = this;
              if (data.data.code == 200) {
                this.$message({
                  message: "新增成功！",
                  type: "success",
                  duration: "500",
                  onClose: function() {
                    _this.$router.push({ path: "/home/sqCircle/circleNotice" });
                  }
                });
              }
            });
          } else if (this.$route.query.type == 2) {
            let params = {
              uuid: this.$route.query.uuid,
              title: this.ruleForm.name,
              communityId: sessionStorage.getItem("communityId"),
              type: 2,
              circleId: this.ruleForm.circleId
            };
            update(params).then(data => {
              var _this = this;
              if (data.data.code == 200) {
                this.$message({
                  message: "修改成功！",
                  type: "success",
                  duration: "500",
                  onClose: function() {
                    _this.$router.push({ path: "/home/sqCircle/circleNotice" });
                  }
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    queryOneList() {
      queryOne({ uuid: this.$route.query.uuid }).then(data => {
        if (data.data.code == 200) {
          this.ruleForm.name = data.data.data.title;
          this.defaultMsg = data.data.data.content;
          this.ruleForm.circleId = data.data.data.circleId;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="stylus">
.__circleManageAdd {
  .addFromListBox {
    width: 960px;

    .form-control {
      width: 60%;
    }

    .el-textarea {
      textarea {
        height: 90px;
      }
    }
  }
}
</style>
