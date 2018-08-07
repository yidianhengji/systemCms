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
						<div v-for="(domain, index) in dynamicValidateForm.domains1" :key="index" style="margin-bottom: 10px;">
							<el-input v-model="domain.value" style="width: 218px;" placeholder="请输入重量"></el-input>
							<el-input v-model="domain.value1" style="width: 218px; margin: 0px 10px;" placeholder="请输入积分"></el-input>
							<el-button @click.prevent="removeDomain(domain,1)">删除</el-button>
						</div>
						<el-button @click="addDomain(1)">新增一项</el-button>
					</el-form-item>
					<el-form-item
						label="不可回收垃圾"
						prop="domains2"
					>
						<div v-for="(domain, index) in dynamicValidateForm.domains2" :key="index" style="margin-bottom: 10px;">
							<el-input v-model="domain.value" style="width: 218px;" placeholder="请输入重量"></el-input>
							<el-input v-model="domain.value1" style="width: 218px; margin: 0px 10px;" placeholder="请输入积分"></el-input>
							<el-button @click.prevent="removeDomain(domain,2)">删除</el-button>
						</div>
						<el-button @click="addDomain(2)">新增一项</el-button>
					</el-form-item>
					<el-form-item
						label="厨余垃圾"
						prop="domains3"
					>
						<div v-for="(domain, index) in dynamicValidateForm.domains3" :key="index" style="margin-bottom: 10px;">
							<el-input v-model="domain.value" style="width: 218px;" placeholder="请输入重量"></el-input>
							<el-input v-model="domain.value1" style="width: 218px; margin: 0px 10px;" placeholder="请输入积分"></el-input>
							<el-button @click.prevent="removeDomain(domain,3)">删除</el-button>
						</div>
						<el-button @click="addDomain(3)">新增一项</el-button>
					</el-form-item>

					<el-form-item label="规则描述">
                        <el-input type="textarea" v-model="ruleForm.desc" placeholder="写点什么吧！"></el-input>
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
export default {
  	data() {
		return {
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
				name: "",
				community_id: '',
				desc: ""
			},
			rules: {
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
					{ min: 2, max: 64, message: "长度在 3 到 5 个字符", trigger: "blur" }
				],
				community_id: [
					{ required: true, message: "请选择所属社区", trigger: "change" }
				],
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
				alert("submit!");
				} else {
				console.log("error submit!!");
				return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		removeDomain(item) {
			var index = this.dynamicValidateForm.domains.indexOf(item)
			if (index !== -1) {
			this.dynamicValidateForm.domains.splice(index, 1)
			}
		},
		addDomain(obj) {
			if(this.dynamicValidateForm['domains'+obj][this.dynamicValidateForm['domains'+obj].length-1].value==''||this.dynamicValidateForm['domains'+obj][this.dynamicValidateForm['domains'+obj].length-1].value1==''){
				this.$message({
					message: '请完善上面的资料',
					type: 'warning',
				});
			}else {
				this.dynamicValidateForm['domains'+obj].push({
					value: '',
					value1: '',
				});
			}
		}
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
