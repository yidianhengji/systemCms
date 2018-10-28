<template>
  <div class="__postAdd__">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="名称" prop="name" class="form-control">
      <el-input v-model="ruleForm.title" placeholder="请输入帖子标题"></el-input>
    </el-form-item>

    <el-form-item label="所属圈子：">
      <el-select v-model="ruleForm.circleId" placeholder="请选择所属圈子">
        <el-option :label="item.name" :value="item.uuid" v-for="(item ,index) in circle_list" :key="index"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="帖子内容">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="ruleForm.content">
      </el-input>
    </el-form-item>

    <el-form-item label="图片">
      <upload ref="upload" :upload=upload2></upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import upload from '@/components/common/upload'
  import UE from "@/components/common/ue";

  export default {
    name: "postAdd",
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
          title: "",
          content: "",
          circleId: "" // 所属圈子
        },
        circle_list: [],
      };
    },
    created() {
      this.$api.postAndJson('/backen/circle/query', {}).then(res=>{
        this.circle_list = res.data.data.list;

        if(this.$route.query.uuid) {
          this.$api.postAndJson('/backen/post/queryOne', {uuid: this.$route.query.uuid}).then((res) => {
            this.ruleForm = {
              title: res.data.data.title,
              content: res.data.data.content,
              circleId: res.data.data.circleId,
            }
            if(res.data.data.coverpic!=''){
              this.$refs.upload.dataListdouble = JSON.parse(res.data.data.picture)
            }
          })
        }
      })
    },
    methods: {
      submitForm(formName) {
        let This = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            let prams = {
              title: this.ruleForm.title,
              content: this.ruleForm.content,
              circleId: this.ruleForm.circleId,
              status: 2,
              picture: JSON.stringify(this.$refs.upload.dataListdouble)
            }
            let path = '';
            if(this.$route.query.uuid) {
              path = '/backen/post/update';
              prams.uuid = this.$route.query.uuid;
            }else{
              path = '/backen/post/add';
            }
            this.$api.postAndJson(path,prams ).then(res=>{
              this.$router.go(-1)
            })
          }
        });
      }
    }
  };
</script>

<style lang="stylus">
</style>
