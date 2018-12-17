<template>
  <div class="__shangjia__add__">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name" class="form-control">
        <el-input v-model="ruleForm.name" placeholder="请输入店铺名称"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address" class="form-control">
        <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
      </el-form-item>

      <el-form-item label="商店图标">
        <upload ref="upload" :upload=upload2></upload>
      </el-form-item>

      <el-form-item label="热线电话" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入热线电话"></el-input>
      </el-form-item>

      <el-form-item label="权重" prop="weight">
        <el-input type="number" v-model.number="ruleForm.weight" placeholder="请输入1-100之间的整数"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="ruleForm.description">
        </el-input>
      </el-form-item>

      <el-form-item label="输入标签">
        <el-select
          v-model="ruleForm.label"
          multiple
          filterable
          :allow-create="true"
          default-first-option
          placeholder="请输入或选择店铺标签">
        </el-select>
      </el-form-item>

      <el-form-item label="输入分类" prop="class">
        <el-select v-model="value5" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import upload from 'src/components/common/upload'

  export default {
    name: "shangjiaAdd",
    components: {
      upload
    },
    data() {
      return {
        rules: {
          name: [{required: true, message: '必填'}],
          address: [{required: true,message: '必填'}],
          phone: [{required: true,message: '必填'}],
          weight: [{required: true,message: '必填'}, {type: 'number', message: '必须为数字'}],
        },
        upload2: {"id": "test2"},
        ruleForm: {
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 450
          },
          address: "",
          name: "",
          circleId: "",// 所属圈子
          phone: '',
          description: '',
          weight: 0,
        },
        options: [],
        value5: '',
      }
    },
    created() {
      this.$api.postAndJson('/backen/classification/queryAll', {
        type: 6,
      }).then(res => {
        this.options = res.data.data.list;
      })
      if (this.$route.query.uuid) {
        this.$api.postAndJson('/backen/merchant/queryOne', {uuid: this.$route.query.uuid}).then((res) => {
          this.ruleForm = {
            address: res.data.data.address,
            name: res.data.data.name,
            phone: res.data.data.phone,
            description: res.data.data.description,
            weight: res.data.data.weight,
            label: res.data.data.label ? res.data.data.label.split(',') : []
          }
          if(res.data.data.classify) {
            this.value5 = res.data.data.classify.split(',')
          }
          if (res.data.data.pic) {
            this.$refs.upload.dataListsingle = JSON.parse(res.data.data.pic)
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        let This = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            let path = '';
            if (this.$route.query.uuid) {
              path = '/backen/merchant/update';
            } else {
              path = '/backen/merchant/add';
            }

            if(this.ruleForm.weight < 0 || this.ruleForm.weight > 100) {
              alert('权重必须在0-100之间');
              return;
            }

            this.$api.postAndJson(path, {
              uuid: this.$route.query.uuid,
              address: this.ruleForm.address,
              name: this.ruleForm.name,
              phone: this.ruleForm.phone,
              description: this.ruleForm.description,
              weight: this.ruleForm.weight,
              label: this.ruleForm.label.join(','),
              flag: 1,
              pic: this.$refs.upload.dataListsingle === 'static/upload/upload-120-120.png' ? '' : this.$refs.upload.dataListsingle,
              classify: this.value5.join(','),
              communityId: sessionStorage.getItem('communityId')
            }).then(res => {
              this.$router.go(-1);
            })
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
