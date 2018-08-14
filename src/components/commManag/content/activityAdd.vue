<template>
    <div class="__articleAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span v-if="$route.query.type==1">新增活动</span>
                <span v-else>修改活动</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" prop="startTime">
                        <el-date-picker
                            v-model="ruleForm.startTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="请选择活动开始日期"
                            end-placeholder="请选择活动结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名时间" prop="joinStartTime">
                        <el-date-picker
                            v-model="ruleForm.joinStartTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="请选择报名开始日期"
                            end-placeholder="请选择报名结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动地点" prop="location" class="form-control">
                        <el-input v-model="ruleForm.location" placeholder="请输入活动地点"></el-input>
                    </el-form-item>
                    <el-form-item label="人数上限" prop="limitPeople" class="form-control">
                        <el-input type="number" v-model="ruleForm.limitPeople" placeholder="请输入人数上限"></el-input>
                    </el-form-item>
                    <el-form-item label="积分设置" prop="integral" class="form-control">
                        <el-input type="number" v-model="ruleForm.integral" placeholder="请输入积分设置"></el-input>
                    </el-form-item>
                    <el-form-item label="活动封面图">
                        <el-upload
                            class="avatar-uploader"
                            :action="serverUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.coverpic" :src="ruleForm.coverpic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="活动介绍">
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
import { activityAdd } from "api/task/index";//新增
import { activityUpdate } from "api/task/index";//修改
import { activityQueryOne } from "api/task/index";//查询单个
export default {
  	data() {
		return {
            serverUrl: uploadPath,
            pictureList: [],
            dialogVisible: false,
			ruleForm: {
                name: "",
                communityId: sessionStorage.getItem("communityId"),
				startTime: "",
                endTime: "",
                joinStartTime: '',
                joinEndTime: '',
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
                startTime: [
                    { required: true, message: "请选择活动时间", trigger: "blur" },
                ],
                joinStartTime: [
                    { required: true, message: "请选择活动报名时间", trigger: "blur" },
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
    mounted(){
        if(this.$route.query.type==2){
            this.taskQueryOnePost();
        }
    },
	methods: {
        //查询单个
        taskQueryOnePost(){
            activityQueryOne({uuid: this.$route.query.uuid}).then(data => {
                if(data.data.code==200){
                    this.ruleForm.name = data.data.data.name;
                    this.ruleForm.startTime = [data.data.data.startTime, data.data.data.endTime]
                    this.ruleForm.joinStartTime = [data.data.data.joinStartTime, data.data.data.joinEndTime]
                    this.ruleForm.location = data.data.data.location
                    this.ruleForm.location = data.data.data.location
                    this.ruleForm.limitPeople = data.data.data.limitPeople
                    this.ruleForm.integral = data.data.data.integral
                    this.ruleForm.coverpic = data.data.data.coverpic
                    this.ruleForm.description = data.data.data.description
                }
            })
        },
        //提交按钮
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    if(this.$route.query.type==1){
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
                            var _this = this;
                            if(data.data.code==200){
                                this.$message({
                                    message: '新增成功！',
                                    type: 'success',
                                    duration: '500',
                                    onClose: function(){
                                        _this.$router.push({path: '/home/zhtContern/activity'})
                                    }
                                });
                            }
                        })
                    }else if(this.$route.query.type==2){
                        let params = {
                            uuid: this.$route.query.uuid,
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
                        activityUpdate(params).then(data => {
                            var _this = this;
                            if(data.data.code==200){
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success',
                                    duration: '500',
                                    onClose: function(){
                                        _this.$router.push({path: '/home/zhtContern/activity'})
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
        //上传图片成功
        handleAvatarSuccess(res, file) {
            this.ruleForm.coverpic = res.data
        },
        // 上传图片前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        },
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
