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
                    <el-form-item label="总积分" prop="totalIntegral" class="form-control">
                        <el-input v-model="ruleForm.totalIntegral" placeholder="请输入总积分"></el-input>
                    </el-form-item>
					<el-form-item label="社区负责人" prop="communityLeader" class="form-control">
                        <el-input v-model="ruleForm.communityLeader" placeholder="请输入社区负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="mobile" class="form-control">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入负责人电话"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="ruleForm.remark" placeholder="写点什么吧！"></el-input>
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
import { communityAdd } from "api/community/index";
export default {
  	data() {
		return {
			ruleForm: {
				name: "",
				totalIntegral: "",
				remark: "",
				communityLeader: "",
				mobile: ""
			},
			rules: {
				name: [
					{ required: true, message: "请输入社区名称", trigger: "blur" },
					{ min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
				],
				totalIntegral: [
					{ required: true, message: "请输入总积分", trigger: "blur" },
					{ pattern: /^[0-9]*$/, message: '请输入整数' },
				],
				mobile: [
					{ required: true, message: "请输入手机号", trigger: "blur" },
					{ pattern: /^[0-9]*$/, message: '请输入整数' },
					{ min: 11, max: 11, message: "请输入长度为11位数的手机号", trigger: "blur" }
				],
				communityLeader: [
					{ required: true, message: "请输入负责人姓名", trigger: "blur" },
					{ min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
				]
			}
		};
	},
	methods: {
		//新增
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = {
                        name: this.ruleForm.name,
                        totalIntegral: this.ruleForm.totalIntegral,
						remark: this.ruleForm.remark,
						communityLeader: this.ruleForm.communityLeader,
						mobile: this.ruleForm.mobile,
                    };
                    communityAdd(params).then(data => {
						var _this = this;
                        if(data.data.code==200){
                            this.$message({
								message: '新增成功！',
								type: 'success',
								duration: '500',
								onClose: function(){
									_this.$router.push({path: '/home/community/organization'})
								}
							});
                        }
                    })
				} else {
					return false;
				}
			});
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