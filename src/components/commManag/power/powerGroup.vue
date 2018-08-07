<template>
    <div class="__powerGroup">
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增权限组</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>

        <el-dialog :title="modelTypeName" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :close-on-click-modal="false">
            <div class="modelFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入描述"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="权限设置" :visible.sync="dialogRoleVisible" :modal-append-to-body="false" :close-on-click-modal="false">
            <div class="modelFromListBox">
                <el-checkbox-group v-model="checkedCities">
                    <el-checkbox v-for="(item, index) in roleDataList" :label="item.uuid" :key="index">{{item.name}}
                        <div>
                        <el-checkbox v-for="(items, indexs) in item.powers" :label="items.uuid" :key="indexs">{{items.meunName}}</el-checkbox>
                    </div>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetRole()">取 消</el-button>
                <el-button type="primary" @click="submitRole()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { roleQuery } from "api/role/index";//分页查询权限组
import { roleAdd } from "api/role/index";//新增权限组
import { roleUpdate } from "api/role/index";//修改权限组
import { roleQueryOne } from "api/role/index";//单个查询权限组
import { roleDel } from "api/role/index";//删除权限组
import { queryAll } from "api/role/index";//查询所有菜单
import { queryByRoleId } from "api/role/index";//根据权限组id查询已有的菜单
import { givePermiss } from "api/role/index";//给权限组赋权限
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            dataArray: [],
            columns: [
                {
                    prop: "name",
                    label: "名称",
                },
                {
                    prop: "description",
                    label: "描述",
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
                            { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                            { label: "删除", func: { func: "del", uuid: param.row.uuid } },
                            { label: "权限", func: { func: "role", uuid: param.row.uuid } },
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
                                del: this.del,
                                role: this.role
                            }
                        });
                        
                    }
                }
            ],
            modelType: '1',//弹窗判断变量
            modelTypeName: '新增权限组',//弹窗判断名称
            dialogFormVisible: false,//弹窗显示
            selectedIndex: "",//点击切换的第一个默认显示
            ruleForm: {
                uuid: '',
                name: '',//名称
                description: '',//描述
            },
            rules: {
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
					{ min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
				],
            },
            dialogRoleVisible: false,//菜单权限弹窗
            roleDataList: [],//所有菜单集合
            checkedCities: [],
            selectedIndex: ''
        }
    },
    mounted(){
        this.queryUserListPost(this.pageNum);
        this.queryAllPost();
    },
    methods: {
        //分页查询权限组
        queryUserListPost(pageNum){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
            }
            roleQuery(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                    this.total = data.data.data.total
                }
            })
        },
        //新增
        onClickAdd(){
            this.dialogFormVisible = true
            this.modelType = 1
            this.modelTypeName = '新增权限组'
        },
        //修改
        update(uuid){
            this.dialogFormVisible = true
            this.modelType = 2
            this.modelTypeName = '修改权限组'
            roleQueryOne({uuid: uuid}).then(data => {
                if(data.data.code==200){
                    this.ruleForm.uuid = uuid
                    this.ruleForm.name = data.data.data.name
                    this.ruleForm.description = data.data.data.description
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
                    uuid: uuid,
                }
                roleDel(params).then(data => {
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
        },
        //权限组弹窗提交
        submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    if(this.modelType==1){
                        let params = {
                            name: this.ruleForm.name,
                            description: this.ruleForm.description,
                            status: 1
                        }
                        roleAdd(params).then(data => {
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
                        let params = {
                            name: this.ruleForm.name,
                            description: this.ruleForm.description,
                            status: 1,
                            uuid: this.ruleForm.uuid
                        }
                        roleUpdate(params).then(data => {
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
        //权限组弹窗取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
        },
        //菜单权限设置
        role(uuid){
            this.dialogRoleVisible = true
            this.selectedIndex = uuid
            queryByRoleId({uuid: uuid}).then(data => {
                if(data.data.code==200){
                    var result = data.data.data;
                    for(var i=0;i<result.length;i++){
                        this.checkedCities.push(result[i].uuid)
                    }
                }
            })
        },
        //菜单权限新增
        submitRole(){
            if(this.checkedCities.length>0){
                let arr = []
                for(var i=0;i<this.checkedCities.length;i++){
                    arr.push(this.checkedCities[i])
                }
                let params = {
                    roleId: this.selectedIndex,
                    powers: arr
                }
                givePermiss(params).then(data => {
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
            }else {
                this.$message.error('请选择菜单');
            }
        },
        //菜单权限取消
        resetRole(){
            this.dialogRoleVisible = false
        },
        //查询所有的菜单
        queryAllPost(){
            queryAll().then(data => {
                if(data.data.code==200){
                    this.roleDataList = data.data.data
                }
            })
        },
    }
}
</script>

<style lang="stylus">
.__powerGroup {
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
