<template>
    <div class="__organizationAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增社区</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="社区名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入社区名称"></el-input>
                    </el-form-item>
                    <el-form-item label="发放积分" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入积分"></el-input>
                    </el-form-item>
					<el-form-item label="社区负责人" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入社区负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入负责人电话"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
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
			ruleForm: {
				name: "",
				region: "",
				date1: "",
				date2: "",
				delivery: false,
				type: [],
				resource: "",
				desc: ""
			},
			rules: {
				name: [
					{ required: true, message: "请输入文章内容", trigger: "blur" },
					{ min: 2, max: 64, message: "长度在 3 到 5 个字符", trigger: "blur" }
				],
				region: [
					{ required: true, message: "请选择活动区域", trigger: "change" }
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
	}
};
</script>

<style lang="stylus">
.__organizationAdd {
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