<template>
    <div class="__userList">

        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.truename" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增管理员</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
        <el-dialog :title="modelTypeName" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :close-on-click-modal="false">
            <div class="modelFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item v-if="modelType==1" label="手机号码" prop="mobile" class="form-control">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId" class="form-control">
                        <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
                            <el-option v-for="(item,index) in roleQueryData" :key="index" :label="item.name" :value="item.uuid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { userQueryAll } from "api/role/index";//分页查询管理员列表
import { userQueryRegister } from "api/role/index";//新增管理员
import { userQueryQueryOne } from "api/role/index";//查询单个管理员
import { userQueryUpdate } from "api/role/index";//修改管理员
import { roleQuery } from "api/role/index";//查询权限组
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            roleQueryData: [],//查询所有的权限组
            formInline: {
                truename: '',
            },
            dialogFormVisible: false,//弹窗
            modelType: '1',//弹窗判断变量
            modelTypeName: '新增管理员',//弹窗判断名称
            ruleForm: {
                uuid: "",
				name: "",
				mobile: "",
				roleId: "",
            },
            rules: {
				name: [
					{ required: true, message: "请输入姓名", trigger: "blur" },
					{ min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
				],
				mobile: [
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    { pattern: /^[0-9]*$/, message: '请输入整数' },
					{ min: 11, max: 11, message: "请输入长度为11位数的手机号", trigger: "blur" }
                ],
                roleId: [
                    { required: true, message: "请选择角色", trigger: "change" },
                ]
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
                    prop: "mobile",
                    label: "手机号码",
                },
                {
                    prop: "roleName",
                    label: "角色",
                },
                {
                    prop: "createTime",
                    label: "创建时间",
                },
                {
                    prop: "",
                    label: "操作",
                    render: (h, param) => {
                        var items = [
                            { label: "修改", func: { func: "update", uuid: param.row.uuid, uuid2: param.row.roleId } },
                            { label: "删除", func: { func: "del", uuid: param.row.uuid } }
                        ]
                        const dropDownData = {
                            label: "操作",
                            items: items
                        };
                        return h(MyDropDown, {
                            props: {
                                dropDownData: dropDownData
                            },
                            on: {
                                update: this.update,
                                del: this.del
                            }
                        });
                        
                    }
                }
            ],
        }
    },
    mounted(){
        this.queryUserListPost(this.pageNum);
        this.roleQueryPost();
    },
    methods: {
        //查询所有权限组
        roleQueryPost(){
            let params = {
                pageSize: 100,
                pageNum: 1,
            }
            roleQuery(params).then(data => {
                if(data.data.code==200){
                    this.roleQueryData = data.data.data.list
                }
            })
        },
        //分页查询管理员列表
        queryUserListPost(pageNum, truename){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                truename: truename
            }
            userQueryAll(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                    this.total = data.data.data.total
                }
            })
        },
        //新增弹出按钮
        submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    if(this.modelType==1){
                        var params = {
                            user: {
                                truename: this.ruleForm.name,
                                mobile: this.ruleForm.mobile,
                                roleId: this.ruleForm.roleId
                            },
                        }
                        userQueryRegister(params).then(data => {
                            if(data.data.code==200){
                                this.dialogFormVisible = false
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
                    }else if(this.modelType==2){
                        var params = {
                            user: {
                                truename: this.ruleForm.name,
                                uuid: this.ruleForm.uuid,
                                roleId: this.ruleForm.roleId
                            },
                        }
                        userQueryUpdate(params).then(data => {
                            if(data.data.code==200){
                                this.dialogFormVisible = false
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
				    return false;
				}
			});
        },
        //取消弹出按钮
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
        },
        //搜索
        onSubmit() {
            this.queryUserListPost(this.pageNum, this.formInline.truename);
        },
        //新增
        onClickAdd(){
            this.dialogFormVisible = true
            this.modelType = 1
            this.modelTypeName = '新增管理员'
        },
        //修改
        update(uuid, roleId){
            this.dialogFormVisible = true
            this.modelType = 2
            this.modelTypeName = '修改管理员'
            userQueryQueryOne({uuid: uuid}).then(data => {
                if(data.data.code==200){
                    this.ruleForm.uuid = uuid
                    this.ruleForm.name = data.data.data.truename
                    this.ruleForm.mobile = data.data.data.mobile
                    this.ruleForm.roleId = ''+roleId+''
                }
            })
        },
        //删除
        del(uuid){
            this.$confirm('是否删除该条记录?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var params = {
                    user: {
                        uuid: uuid,
                        status: 2,
                    },
                }
                userQueryUpdate(params).then(data => {
                    if(data.data.code==200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: '500',
                            onClose: function(){
                                window.location.reload();
                            }
                        });
                    }
                })
            }).catch(() => {
                
            });
        }
    }
}
</script>

<style lang="stylus">
.__userList {
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
