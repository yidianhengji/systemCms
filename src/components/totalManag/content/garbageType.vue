<template>
    <div class="__garbageTypeAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>垃圾分类</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
					<el-form-item
						label="可回收垃圾"
						prop="domains1"
					>
						<div v-for="(item, index) in dynamicValidateForm.domains1" :key="index" style="margin-bottom: 10px;">
							<el-input v-model="item.value" style="width: 218px;" placeholder="请输入重量"></el-input>
							<el-input v-model="item.value1" style="width: 218px; margin: 0px 10px;" placeholder="请输入积分"></el-input>
							<el-button v-if="index>0" @click.prevent="removeDomain(index,1)">删除</el-button>
						</div>
						<el-button @click="addDomain(1)">新增一项</el-button>
					</el-form-item>
					<el-form-item
						label="不可回收垃圾"
						prop="domains2"
					>
						<div v-for="(item, index) in dynamicValidateForm.domains2" :key="index" style="margin-bottom: 10px;">
							<el-input v-model="item.value" style="width: 218px;" placeholder="请输入重量"></el-input>
							<el-input v-model="item.value1" style="width: 218px; margin: 0px 10px;" placeholder="请输入积分"></el-input>
							<el-button v-if="index>0" @click.prevent="removeDomain(index,2)">删除</el-button>
						</div>
						<el-button @click="addDomain(2)">新增一项</el-button>
					</el-form-item>
					<el-form-item
						label="厨余垃圾"
						prop="domains3"
					>
						<div v-for="(item, index) in dynamicValidateForm.domains3" :key="index" style="margin-bottom: 10px;">
							<el-input v-model="item.value" style="width: 218px;" placeholder="请输入重量"></el-input>
							<el-input v-model="item.value1" style="width: 218px; margin: 0px 10px;" placeholder="请输入积分"></el-input>
							<el-button v-if="index>0" @click.prevent="removeDomain(index,3)">删除</el-button>
						</div>
						<el-button @click="addDomain(3)">新增一项</el-button>
					</el-form-item>

					<el-form-item label="规则描述" prop="description">
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
import { add } from "api/garbage/index";//新增
import { update } from "api/garbage/index";//修改
import { queryOne } from "api/garbage/index";//查询单个
export default {
  	data() {
		return {
			isData: [],
			dynamicValidateForm: {
				domains1: [{
					value: '',
					value1: '',
				}],
				domains2: [{
					value: '',
					value1: '',
				}],
				domains3: [{
					value: '',
					value1: '',
				}],
			},
			ruleForm: {
				uuid: "",
				name: "",
				description: ""
			},
			rules: {
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
					{ min: 2, max: 64, message: "长度在 3 到 5 个字符", trigger: "blur" }
				],
				description: [
					{ required: true, message: "请输入规则描述", trigger: "blur" }
				],
			}
		};
	},
	mounted(){
        this.queryOnePost();
    },
	methods: {
		//查询单个
		queryOnePost(){
            queryOne().then(data => {
                if(data.data.code==200){
					this.isData = data.data.data
					if(data.data.data!=null){
						this.ruleForm.uuid = data.data.data.uuid
						this.ruleForm.name = data.data.data.name
						this.ruleForm.description = data.data.data.description
						this.dynamicValidateForm = JSON.parse(data.data.data.content)
					}
                }
            })
        },
		submitForm(formName) {
			var that = this;
			this.$refs[formName].validate(valid => {
				if (valid) {
					if(this.isData == null){
						let params = {
							name: this.ruleForm.name,
							description: this.ruleForm.description,
							content: JSON.stringify(this.dynamicValidateForm)
						};
						add(params).then(data => {
							var _this = this;
							if(data.data.code==200){
								this.$message({
									message: '新增成功！',
									type: 'success',
									duration: '500',
									onClose: function(){
										window.location.reload();
									}
								});
							}
						})
					}else {
						let params = {
							uuid: this.ruleForm.uuid,
							name: this.ruleForm.name,
							description: this.ruleForm.description,
							content: JSON.stringify(this.dynamicValidateForm)
						};
						update(params).then(data => {
							var _this = this;
							if(data.data.code==200){
								this.$message({
									message: '修改成功！',
									type: 'success',
									duration: '500',
									onClose: function(){
										window.location.reload();
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
		removeDomain(index, nub) {
			this.dynamicValidateForm['domains'+nub].splice(index, 1);
		},
		addDomain(obj) {
			var value1 = this.dynamicValidateForm['domains'+obj][this.dynamicValidateForm['domains'+obj].length-1].value;
			var value2 = this.dynamicValidateForm['domains'+obj][this.dynamicValidateForm['domains'+obj].length-1].value1;
			var reg = /^[0-9]*$/
			if( value1=='' || value2=='' ){
				this.$message({
					message: '请完善上面的资料',
					type: 'warning',
				});
			} else if(!reg.test(value1) || !reg.test(value2) ){
				this.$message({
					message: '请输入数字',
					type: 'warning',
				});
			} else {
				this.dynamicValidateForm['domains'+obj].push({
					value: '',
					value1: '',
				});
			}
		},
	}
};
</script>

<style lang="stylus">
.__garbageTypeAdd {
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
