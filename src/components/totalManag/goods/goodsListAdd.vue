<template>
    <div class="__goodsListAdd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增商品</span>
            </div>
            <div class="addFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属社区" prop="communityId">
                        <el-select v-model="ruleForm.communityId" placeholder="请选择所属社区">
                            <el-option v-for="(item, index) in communityQueryDataList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品总数" prop="store" class="form-control">
                        <el-input v-model="ruleForm.store" placeholder="请输入商品总数"></el-input>
                    </el-form-item>
                    <el-form-item label="商品积分" prop="integral" class="form-control">
                        <el-input v-model="ruleForm.integral" placeholder="请输入商品积分"></el-input>
                    </el-form-item>
                    <el-form-item label="商品封面图">
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
                    <el-form-item label="商品描述">
                        <el-input type="textarea" v-model="ruleForm.desc" placeholder="写点什么吧！"></el-input>
                    </el-form-item>
					<!-- <el-form-item label="商品详情">
                        <div class="">
							<UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
						</div>
                    </el-form-item> -->
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
import UE from "@/components/common/ue";
import { uploadPath } from '@/path/path';//上传接口地址
import { add } from "api/shop/index";//新增
import { update } from "api/shop/index";//修改
import { queryOne } from "api/shop/index";//查询单个
import { communityQuery } from "api/community/index";//所属社区
export default {
  	//components: { UE },
  	data() {
		return {
            // config: {
            //     initialFrameWidth: null,
            //     initialFrameHeight: 450
            // },
            // ue1: "ue1", // 不同编辑器必须不同的id
            communityQueryDataList: [],//所属社区
            serverUrl: uploadPath,
			ruleForm: {
				name: "",
				communityId: "",
				store: "",
                integral: "",
                coverPic: "",
                description: "",
			},
			rules: {
				name: [
					{ required: true, message: "请输入文章内容", trigger: "blur" },
					{ min: 2, max: 64, message: "长度在 3 到 5 个字符", trigger: "blur" }
				],
				communityId: [
					{ required: true, message: "请选择所属社区", trigger: "change" }
                ],
                store: [
                    { required: true, message: '请输入商品总数' },
                    { pattern: /^[0-9]*$/, message: '请输入整数' },
                ],
                integral: [
                    { required: true, message: '请输入商品总数' },
                    { pattern: /^[0-9]*$/, message: '请输入整数' },
                ]
			}
		};
    },
    mounted(){
        this.communityQueryPost();
        if(this.$route.query.type==2){
            this.taskQueryOnePost();
        }
    },
	methods: {
        //查询所有社区
        communityQueryPost(){
            let params = {
                pageSize: 1000,
                pageNum: 1,
            }
            communityQuery(params).then(data => {
                if(data.data.code==200){
                    this.communityQueryDataList = data.data.data.list
                }
            })
        },
        //查询单个
        taskQueryOnePost(){
            queryOne({uuid: this.$route.query.uuid}).then(data => {
                if(data.data.code==200){
                    this.ruleForm.name = data.data.data.name;
                    this.ruleForm.communityId = ''+data.data.data.communityId+''
                    this.ruleForm.store = data.data.data.store
                    this.ruleForm.integral = data.data.data.integral
                    this.ruleForm.coverpic = data.data.data.coverpic
                    this.ruleForm.description = data.data.data.description
                }
            })
        },
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
				    if(this.$route.query.type==1){
                        let params = {
                            name: this.ruleForm.name,
                            communityId: this.ruleForm.communityId,
                            store: this.ruleForm.store,
                            integral: this.ruleForm.integral,
                            coverpic: this.ruleForm.coverpic,
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
                                        _this.$router.push({path: '/home/zhtGoods/goodsList'})
                                    }
                                });
                            }
                        })
                    }else if(this.$route.query.type==2){
                        let params = {
                            uuid: this.$route.query.uuid,
                            name: this.ruleForm.name,
                            communityId: this.ruleForm.communityId,
                            store: this.ruleForm.store,
                            integral: this.ruleForm.integral,
                            coverpic: this.ruleForm.coverpic,
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
                                        _this.$router.push({path: '/home/zhtGoods/goodsList'})
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
        handleAvatarSuccess(res, file) {
            this.ruleForm.coverPic = res.data
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
.__goodsListAdd {
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
