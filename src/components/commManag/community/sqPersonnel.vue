<template>
    <div class="__personnel">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.truename" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select v-model="formInline.sex" placeholder="请选择性别">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否实名：">
                    <el-select v-model="formInline.isRealName" placeholder="请选择是否实名">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增居民</el-button>
            <el-button type="primary" icon="el-icon-upload2" @click="addByImport">导入</el-button>
            <el-button type="primary" icon="el-icon-download" @click="queryByExport">导出</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>

        <el-dialog title="权限设置" :visible.sync="dialogRoleVisible" :modal-append-to-body="false" :close-on-click-modal="false">
            <div class="modelFromListBox">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="action"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetRole()">取 消</el-button>
                <el-button type="primary" @click="submitRole()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { uploadXls } from '@/path/path';//上传接口地址
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { query, queryByExport } from "api/people/index";
import { communityQuery } from "api/community/index";//所属社区
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            dialogRoleVisible: false,//菜单权限弹窗
            fileList: [],
            action: uploadXls,
            formInline: {
                truename: '',
                sex: '',
                isRealName: ''
            },
            pageSize: 10,
            pageNum: 1,
            total: 0,
            dataArray: [],
            columns: [
                {
                    prop: "truename",
                    label: "姓名",
                },
                {
                    prop: "sex",
                    label: "性别",
                    render: function(createElement) {
                        if(this.row.sex==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '男',
                                }
                            })
                        }else if(this.row.sex==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '女',
                                }
                            })
                        }
                    },
                },
                {
                    prop: "mobile",
                    label: "手机号码",
                },
                {
                    prop: "idCard",
                    label: "身份证号",
                },
                {
                    prop: "integral",
                    label: "现有积分",
                },
                {
                    prop: "role",
                    label: "身份",
                    render: function(createElement) {
                        if(this.row.role==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '居民',
                                }
                            })
                        }else if(this.row.role==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '志愿者',
                                }
                            })
                        }
                    },
                },
                {
                    prop: "isRealName",
                    label: "实名",
                    render: function(createElement) {
                        if(this.row.isRealName==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '实名',
                                }
                            })
                        }else if(this.row.isRealName==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '未实名',
                                }
                            })
                        }
                    },
                },
            ],
        }
    },
    mounted(){
        this.queryUserListPost(this.pageNum);
    },
    methods: {
        //查询所有管理员
        queryUserListPost(pageNum, truename, sex, isRealName){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                communityId: sessionStorage.getItem("systemType"),
                truename: truename,
                sex: sex,
                isRealName: isRealName
            }
            query(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                    this.total = data.data.data.total
                }
            })
        },
        //搜索
        onSubmit() {
            this.queryUserListPost(this.pageNum, this.formInline.truename, this.formInline.sex, this.formInline.isRealName);
        },
        //新增
        onClickAdd(){
            
        },
        //导出
        queryByExport(){
            queryByExport().then(data => {
                if(data.data.code==200){
                    window.location.href = data.data.data
                }
            })
        },
        //导入
        addByImport(){
            this.dialogRoleVisible = true
        },
        //取消弹窗
        resetRole(){
            this.dialogRoleVisible = false
        },
        //新增弹窗
        submitRole(){
            this.$refs.upload.submit();
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        // 上传图片前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        },
        handleAvatarSuccess(res, file) {
            if(res.code==200){
                this.$message({
                    message: '上传成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function(){
                        window.location.reload();
                    }
                });
            }else {
                this.$alert(res.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => {
                        window.location.reload();
                    }
				});
            }
            
        },
    }
}
</script>

<style lang="stylus">
.__personnel {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    border-radius: 4px;
    .formBox {
        border-bottom 1px solid #eee
    }
    .btnBox {
        margin 10px 0;
    }
}
</style>