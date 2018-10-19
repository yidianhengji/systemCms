<template>
  <div class="__article_add__">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="$route.query.type==1">新增文章</span>
        <span v-else>修改文章</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="文章标题" prop="name" class="form-control">
            <el-input v-model="ruleForm.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>

          <el-form-item label="内容">
            <div class="">
              <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
            </div>
          </el-form-item>

          <el-form-item label="选择分类">
            <el-tree
              class="filter-tree"
              :data="classify"
              :props="defaultProps"
              node-key="uuid"
              default-expand-all
              :highlight-current="true"
              :show-checkbox="true"
              :check-strictly="true"
              :check-on-click-node="true"
              @check-change="handleClick"
              ref="tree2">
            </el-tree>
          </el-form-item>

          <el-form-item label="内容类型" prop="content">
            <el-select v-model="contentType" placeholder="请选择类型">
              <el-option label="无图" value="1"></el-option>
              <el-option label="一张图" value="2"></el-option>
              <el-option label="2张图" value="3"></el-option>
              <el-option label="3张及以上" value="4"></el-option>
              <el-option label="视频" value="5"></el-option>
              <el-option label="音频" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="description">
            </el-input>
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
  import UE from "@/components/common/ue";
  import datas from 'src/api/data'

  export default {
    components: {UE},
    data() {
      return {
        datas: datas,
        upload2: {"id": "test2"},
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 450
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        ruleForm: {
          title: '',
          content: '',
        },
        rules: {
          name: [{required: true, message: '必填'}],
        },
        type: '',
        classify: [],
        i: 0,
        description: '',
        contentType: ""
      }
    },
    created() {
      this.$nextTick(() => {
        if (this.$refs.tree2.getCheckedNodes().length === 0) {
          this.i++
        }
        this.$api.postAndJson('/backen/classification/queryAll', {
          type: 1,
        }).then(res => {
          this.classify = res.data.data.list;

          let uuid = this.$route.query.uuid;
          if (uuid) {
            this.$api.postAndJson('/backen/articles/queryOne', {
              uuid: uuid
            }).then(res => {
              let s = res.data.data;
              this.ruleForm.title = s.title;
              this.defaultMsg = s.content;
              this.type = s.type + '';
              this.contentType = s.contentType + '';
              this.description = s.description;
              this.$refs.tree2.setCheckedKeys([s.classify]);
              if (s.pic) {
                this.$refs.upload.dataListsingle = s.pic;
              }
            })
          }
        })
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.$refs.tree2.getCheckedNodes().length > 1) {
              alert('分类只能选择一个');
              return;
            }

            var a = this.$refs.ue.getUEContent().replace(/<[^>]+>/g, "");
            var aa = a.replace(/&nbsp;/g, "")
            var aaa = aa.substr(0, 50);

            var patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
            var result = [], temp;
            while ((temp = patt.exec(this.$refs.ue.getUEContent())) != null) {
              result.push(temp[1]);
            }
            this.dataListImg = result


            let p = {
              title: this.ruleForm.title,
              content: this.$refs.ue.getUEContent(),
              classify: this.$refs.tree2.getCheckedNodes().length > 0 ? this.$refs.tree2.getCheckedNodes()[0].uuid : '0',
              type: 1, // 1网格
              description: this.description || aaa,
              contentType: this.contentType,
              pic: result.join(',')
            }
            let path = ''
            let uuid = this.$route.query.uuid;
            if (uuid) {
              path = '/backen/articles/update'
              p.uuid = uuid;
            } else {
              path = '/backen/articles/add'
            }
            this.$api.postAndJson(path, p).then(res => {
              this.$router.go(-1)
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      handleClick(data, checked, node) {
        this.i++;
        console.log(this.i);
        if (this.i % 2 === 1) {
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
  };
</script>

<style lang="stylus">
  .__article_add__ {
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
