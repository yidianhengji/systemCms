<template>
  <div class="__meun_dd__">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name" class="form-control">
        <el-input v-model="ruleForm.meunName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>

      <el-form-item label="code" prop="code" class="form-control">
        <el-input v-model="ruleForm.code" placeholder="请输入code"></el-input>
      </el-form-item>

      <el-form-item label="front-path" prop="path" class="form-control">
        <el-input v-model="ruleForm.frontPath" placeholder="请输入front-path"></el-input>
      </el-form-item>

      <el-form-item label="权重" prop="path" class="form-control">
        <el-input v-model="ruleForm.weight" type="number" placeholder="请输入权重"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="path" class="form-control">
        <el-radio v-model="ruleForm.meunType" label="1">主菜单</el-radio>
        <el-radio v-model="ruleForm.meunType" label="2">次级菜单</el-radio>
      </el-form-item>

      <el-form-item label="选择父级菜单">
        <el-tree
          class="filter-tree"
          :data="data"
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

      <el-form-item label="描述" prop="path" class="form-control">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入描述"
          v-model="ruleForm.description">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "meunAdd",
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        ruleForm: {
          meunName: '',
          code: '',
          frontPath: '',
          weight: '',
          description: '',
          meunType: '1',
        },
        i: 1,
      }
    },
    created() {
      this.$api.postAndJson('/backen/parentMenus/queryAll',{type: 2}).then(res=>{
        this.data = res.data.data.list;
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            const param = this.ruleForm;
            if (param.meunType === '2' && this.$refs.tree2.getCheckedNodes().length > 0) {
              param.upMenusId = this.$refs.tree2.getCheckedNodes()[0].uuid
            }

            this.$api.postAndJson('/backen/permiss/powers/add', param).then(res=>{
              console.log(res);
            })
          }
        })
      },
      handleClick(data, checked, node) {
        this.i++;
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
    }
  }
</script>

<style scoped>

</style>
