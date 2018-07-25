<template>
    <div class="__articleAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增任务</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="任务名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入任务名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属社区" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择所属社区">
                            <el-option label="西湖街道办" value="shanghai"></el-option>
                            <el-option label="八方小区" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务时间" prop="name">
                        <el-date-picker
                            v-model="ruleForm.value5"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="请选择任务开始日期"
                            end-placeholder="请选择任务结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="任务地点" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入任务地点"></el-input>
                    </el-form-item>
                    <el-form-item label="人数上限" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入人数上限"></el-input>
                    </el-form-item>
                    <el-form-item label="积分设置" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入任务积分"></el-input>
                    </el-form-item>
                    <el-form-item label="任务负责人" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入任务负责人（积分按照个人设置，总积分不能大于10000）"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入负责人手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="任务封面图">
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
                    <el-form-item label="任务介绍" prop="desc">
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
            dialogImageUrl: '',
            dialogVisible: false,
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
				name: "",
				region: "",
				date1: "",
				date2: "",
				delivery: false,
				type: [],
				resource: "",
                desc: "",
                value5: '',
                value6: '',
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
		getUEContent() {
            let content = this.$refs.ue.getUEContent(); // 调用子组件方法
            this.$notify({
                title: '获取成功，可在控制台查看！',
                message: content,
                type: 'success'
            });
        },
        getUEContentTxt() {
            let content = this.$refs.ue.getUEContentTxt(); // 调用子组件方法
            this.$notify({
                title: '获取成功，可在控制台查看！',
                message: content,
                type: 'success'
            });
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
