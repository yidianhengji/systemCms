<template>
    <div class="__powerGroup">
        <el-row :gutter="20" style="margin: 0px;">
            <el-col :span="4" class="left">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>权限组</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新增</el-button>
                    </div>
                    <div>
                        <ul>
                            <li @click="getList(item.uuid)" :class="{active : selectedIndex == item.uuid }" v-for="(item, index) in dataList1" :key="index">{{item.name}}</li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="20" class="right">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="allocationRolePost">保存</el-button>
                    </div>
                    <div>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(item, index) in dataList2" :label="item.uuid" :key="index">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="添加权限" width="30%" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :close-on-click-modal="false">
            <div class="modelFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入商品总数"></el-input>
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
import { roleQuery, roleAdd, queryAll, allocationRole } from "api/role/index";
export default {
    data(){
        return {
            dialogFormVisible: false,//弹窗显示
            selectedIndex: "",//点击切换的第一个默认显示
            ruleForm: {
                name: '',//名称
                description: '',//描述
            },
            rules: {
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
					{ min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
				],
			},

            dataList1: [],
            dataList2: [],
            checkAll: false,
            checkedCities: [],
        }
    },
    mounted(){
        this.roleQueryPost();
        this.queryAllPost();
    },
    methods: {
        //查询所有管理员
        roleQueryPost(){
            roleQuery().then(data => {
                if(data.data.code==200){
                    this.dataList1 = data.data.data
                    this.selectedIndex  = data.data.data[0].uuid
                }
            })
        },
        //点击切换
        getList(index){
            this.selectedIndex = index
        },
        //权限组弹窗提交
        submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    let params = {
                        name: this.ruleForm.name,
                        description: this.ruleForm.description
                    }
                    roleAdd(params).then(data => {
                        if(data.data.code==200){
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                            this.roleQueryPost();
                        }
                    })
				} else {
				    return false;
				}
			});
        },
        //权限组弹窗取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
		},
        //查询所有的菜单
        queryAllPost(){
            queryAll().then(data => {
                if(data.data.code==200){
                    this.dataList2 = data.data.data
                }
            })
        },
        allocationRolePost(){
            if(this.checkedCities.length>0){
                let params = [];
                for(var i=0;i<this.checkedCities.length;i++){
                    let arr = {}
                    arr.roleId=this.checkedCities[i]
                    arr.userId=this.selectedIndex
                    params.push(arr)
                }
                allocationRole(params).then(data => {
                    if(data.data.code==200){
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }
                })
            }else {
                this.$message.error('请选择菜单');
            }
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataList2.length;
        }
    }
}
</script>

<style lang="stylus">
.__powerGroup {
    .left > div, .right > div {
        height 700px;
    }
    .left {
        padding-left 0px !important
        padding-right 0px !important
        ul {
            li {
                height 40px;
                line-height 40px;
                border-left 3px solid transparent;
                padding-left 10px;
                border-bottom 1px solid #eee;
                font-size 13px;
                cursor pointer
            }
            li:hover,
            li.active {
                border-left 3px solid #1e9fff !important
            }
            li:last-child {
                border-bottom 0px;
            }
        }
    }
    .right {
        padding-right 0px !important
    }
    .el-card__body {
        padding 10px 0
    }
}
</style>
