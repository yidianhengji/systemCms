<template>
    <div class="__volunteerAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增居民</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="负责人电话" prop="mobile" class="form-control">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入负责人电话（必须是实名认证的）"></el-input>
                    </el-form-item>
					<el-form-item label="负责权限" prop="type" class="form-control">
                        <el-checkbox-group v-model="ruleForm.type">
							<el-checkbox label="1" key="1" name="type">活动</el-checkbox>
							<el-checkbox label="2" key="2" name="type">任务</el-checkbox>
							<el-checkbox label="3" key="3" name="type">垃圾分类</el-checkbox>
						</el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="备注">
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
import { uploadPath } from '@/path/path';//上传接口地址
import { add } from "api/volunteer/index";//新增
import { update } from "api/volunteer/index";//修改
import { queryOne } from "api/volunteer/index";//查询单个
export default {
  	data() {
		return {
			ruleForm: {
				mobile: "",
				type: [],
				description: "",
			},
			rules: {
				mobile: [
					{ required: true, message: "请输入手机号", trigger: "blur" },
					{ pattern: /^[0-9]*$/, message: '请输入整数' },
					{ min: 11, max: 11, message: "请输入长度为11位数的手机号", trigger: "blur" }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
				],
			}
		};
	},
	mounted(){
        if(this.$route.query.type==2){
            this.taskQueryOnePost();
        }
    },
	methods: {
		//查询单个
        taskQueryOnePost(){
            queryOne({uuid: this.$route.query.uuid}).then(data => {
                if(data.data.code==200){
                    this.ruleForm.mobile = data.data.data.mobile;
                    this.ruleForm.type = JSON.parse(data.data.data.identityFlag)
                    this.ruleForm.description = data.data.data.description
                }
            })
        },
		//新增
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if(this.$route.query.type==1){
						let params = {
							mobile: this.ruleForm.mobile,
							identityFlag: JSON.stringify(this.ruleForm.type),
							description: this.ruleForm.description,
						};
						add(params).then(data => {
							var _this = this;
						    if(data.data.code==200){
						        this.$message({
									message: '新增成功！',
									type: 'success',
									duration: '500',
									onClose: function(){
										_this.$router.push({path: '/home/sqCommunity/volunteer'})
									}
								});
						    }
						})
					}else if(this.$route.query.type==2){
						let params = {
							uuid: this.$route.query.uuid,
							mobile: this.ruleForm.mobile,
							identityFlag: JSON.stringify(this.ruleForm.type),
							description: this.ruleForm.description,
						};
						update(params).then(data => {
							var _this = this;
						    if(data.data.code==200){
						        this.$message({
									message: '修改成功！',
									type: 'success',
									duration: '500',
									onClose: function(){
										_this.$router.push({path: '/home/sqCommunity/volunteer'})
									}
								});
						    }
						})
					}
					
				} else {
					return false;
				}
			});
		},
	}
};
</script>

<style lang="stylus">
.__volunteerAdd {
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
