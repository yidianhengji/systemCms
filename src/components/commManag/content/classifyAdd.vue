<template>
  <div class="__classifyAdd__">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="$route.query.uuid">修改分类</span>
        <span v-else>新增分类</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
          </el-form-item>

          <el-form-item label="类型：" prop="type">
            <el-select v-model="type" placeholder="请选择类型">
              <el-option :label="item.key" :value="item.value" v-for="(item,index) in datas" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择父分类">
            <el-tree
              class="filter-tree"
              :data="classify"
              :props="defaultProps"
              node-key="uuid"
              default-expand-all
              :highlight-current="true"
              :show-checkbox="true"
              :check-strictly="true"
              :default-checked-keys="classify1"
              :check-on-click-node="true"
              @check-change="handleClick"
              ref="tree2">
            </el-tree>
          </el-form-item>

          <el-form-item label="权重" prop="weight">
            <el-input v-model="ruleForm.weight" type="number" placeholder="请输入数字"></el-input>
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
  import UE from "@/components/common/ue";
  import datas from 'src/api/data'

  export default {
    name: "classifyAdd",
    components: {
      upload
    },
    data() {
      return {
        rules: {
          name: [{required: true, message: '必填'}],
          weight: [{required: true, message: '必填'}],
        },
        datas: datas,
        upload2: {"id": "test2"},
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        ruleForm: {
          name: '',
          classifyId: '',
          rules: {},
          weight: 0,
        },
        classify: [],
        type: "",
        classify1: [],
        i: 0,
      }
    },
    created() {
      this.$nextTick(() => {
        if(this.$refs.tree2.getCheckedNodes().length === 0) {
          this.i++
        }
      })
      let uuid = this.$route.query.uuid;
      if (uuid) {
        this.$api.postAndJson('/backen/classification/queryOne', {
          uuid: uuid
        }).then(res => {
          let s = res.data.data;
          this.ruleForm = {
            name: s.name,
          }

          this.type = s.type
          this.ruleForm.weight = s.weight
          this.$refs.tree2.setCheckedKeys([s.upId]);
          if(s.pic){
            this.$refs.upload.dataListsingle = s.pic;
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        if (this.$refs.tree2.getCheckedNodes().length > 1) {
          alert('分类只能选择一个');
          return;
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            let path = '';
            let uuid = this.$route.query.uuid;
            let upId = "";
            if (this.$refs.tree2.getCheckedNodes().length > 0) {
              upId = this.$refs.tree2.getCheckedNodes()[0].uuid
            } else {
              upId = "0"
            }

            let p = {
              name: this.ruleForm.name,
              upId: upId,
              type: this.type,
              pic: this.$refs.upload.dataListsingle,
              weight: this.ruleForm.weight,
              communityId: sessionStorage.getItem('communityId')
            }
            if (uuid) {
              path = '/backen/classification/update'
              p.uuid = uuid;
            } else {
              path = '/backen/classification/add'
            }

            this.$api.postAndJson(path, p).then(res => {
              this.$router.go(-1)
            })
          }
        })
      },
      handleClick(data, checked, node) {
        this.i++;
        console.log(this.i);
        if(this.i%2 === 1 ) {
          if (checked && this.$refs.tree2.getCheckedNodes().length > 1) {
            this.$refs.tree2.setCheckedKeys([]);
            this.$refs.tree2.setCheckedKeys([data.uuid]);
            //交叉点击节点
          } else {
            this.$refs.tree2.setCheckedKeys([]);
            //点击已经选中的节点，置空
          }
        }
      }
    },
    watch: {
      type(val) {
        this.$api.postAndJson('/backen/classification/queryAll', {
          type: val
        }).then(res => {
          this.classify = res.data.data.list;
        })
      }
    }
  }
</script>

<style lang="stylus">
.__classifyAdd__ {
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
