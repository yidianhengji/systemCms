<template>
  <div class="coupon__add__">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增优惠券</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm"  ref="ruleForm"  label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入优惠券名称"></el-input>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="描述">
            <el-input type="textarea" v-model="ruleForm.description" :rows="5" placeholder="写点什么吧！"></el-input>
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
  export default {
    name: "couponAdd",
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        ruleForm: {
          name: '',
          description: ''
        },
        value7: ''
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          const params = this.ruleForm;
          if(this.value7) {
            const time = this.value7;
            const start = new Date(time[0]);
            const end = new Date(time[1]);
            params.startTime = start.getFullYear()+'-'+(start.getMonth()+1) + '-' + start.getDate()+' 00:00:00'
            params.endTime = end.getFullYear()+'-'+(end.getMonth()+1) + '-' + end.getDate()+' 00:00:00'
          }
          params.merchantId = this.$route.query.uuid
          this.$api.postAndJson('/backen/coupon/add', params).then(res=> {

          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
