<template>
    <div class="__articleAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增活动</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属社区" prop="communityId">
                        <el-select v-model="ruleForm.communityId" placeholder="请选择所属社区">
                            <el-option label="西湖街道办" value="shanghai"></el-option>
                            <el-option label="八方小区" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报名时间" prop="startTime">
                        <el-date-picker
                            v-model="ruleForm.startTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="请选择开始时间"
                            end-placeholder="请选择结束时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动时间" prop="joinStartTime">
                        <el-date-picker
                            v-model="ruleForm.joinStartTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="请选择开始时间"
                            end-placeholder="请选择结束时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动地点" prop="location" class="form-control">
                        <el-input v-model="ruleForm.location" placeholder="请输入活动地点"></el-input>
                    </el-form-item>
                    <el-form-item label="人数上限" prop="limitPeople" class="form-control">
                        <el-input v-model="ruleForm.limitPeople" placeholder="请输入人数上限"></el-input>
                    </el-form-item>
                    <el-form-item label="积分设置" prop="integral" class="form-control">
                        <el-input v-model="ruleForm.integral" placeholder="请输入活动积分"></el-input>
                    </el-form-item>
                    <el-form-item label="活动封面图">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="活动介绍">
                        <el-input type="textarea" v-model="ruleForm.description" placeholder="写点什么吧！"></el-input>
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
import { activityAdd } from "api/task/index";
export default {
  	data() {
		return {
            dialogImageUrl: '',
            dialogVisible: false,
			ruleForm: {
				name: "",
				communityId: "",
				startTime: "",
                endTime: "",
                joinStartTime: "",
                joinEndTime: "",
				location: "",
				limitPeople: "",
				integral: "",
                dataForm: "1",
                coverpic: '',
                description: '',
            },
			rules: {
				name: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: "blur" }
				],
				communityId: [
					{ required: true, message: "请选择所属社区", trigger: "change" }
                ],
                startTime: [
                    { required: true, message: "请选择活动进行时间", trigger: "blur" },
                ],
                joinStartTime: [
                    { required: true, message: "请选择活动进行时间", trigger: "blur" },
                ],
                location: [
                    { required: true, message: "请输入活动地点", trigger: "blur" },
                ],
                limitPeople: [
                    { required: true, message: '请输入人数上限' },
                    { pattern: /^[0-9]*$/, message: '请输入整数' },
                ],
                integral: [
                    { required: true, message: "请输入积分设置", trigger: "blur" },
                    { pattern: /^[0-9]*$/, message: '请输入整数' },
                ]
			}
		};
	},
	methods: {
        //提交按钮
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
				    let params = {
                        name: this.ruleForm.name,
                        communityId: this.ruleForm.communityId,
                        startTime: this.ruleForm.startTime[0],
                        endTime: this.ruleForm.startTime[1],
                        joinStartTime: this.ruleForm.joinStartTime[0],
                        joinEndTime: this.ruleForm.joinStartTime[1],
                        location: this.ruleForm.location,
                        limitPeople: this.ruleForm.limitPeople,
                        integral: this.ruleForm.integral,
                        dataForm: this.ruleForm.dataForm,
                        coverpic: this.ruleForm.coverpic,
                        description: this.ruleForm.description,
                    };
                    activityAdd(params).then(data => {
                        if(data.data.code==200){
                            this.$alert("提交成功！", '温馨提示',
                                { confirmButtonText: '确定', callback: action => { }
                            });
                        }
                    })
				} else {
				    return false;
				}
			});
        },
        //重置按钮
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
        //封面
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
	}
};
</script>

<style lang="stylus">
.__articleAdd {
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
