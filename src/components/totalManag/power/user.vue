<template>
    <div class="__userList">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item class="pull-right">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新增管理员</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>

        <!-- <div class="tableList">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号码">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="角色">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div> -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :close-on-click-modal="false">
            <div class="modelFromListBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入商品总数"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="name" class="form-control">
                        <el-input v-model="ruleForm.name" placeholder="请输入商品积分"></el-input>
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
import { userQueryAll } from "api/role/index";
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            ruleForm: {
				name: "",
				region: "",
				date1: "",
				date2: "",
				delivery: false,
				type: [],
				resource: "",
				desc: ""
			},
			rules: {
				name: [
					{ required: true, message: "请输入文章内容", trigger: "blur" },
					{ min: 2, max: 64, message: "长度在 3 到 5 个字符", trigger: "blur" }
				],
				region: [
					{ required: true, message: "请选择活动区域", trigger: "change" }
				],
			},
            dialogFormVisible: false,
            formInline: {
                user: '',
                region: ''
            },
            pageSize: 10,
            pageNum: 1,
            total: 0,
            dataArray: [],
            columns: [
                {
                    prop: "name",
                    label: "任务名称",
                },
                {
                    prop: "totalIntegral",
                    label: "社区总积分",
                },
                {
                    prop: "integral",
                    label: "剩余积分",
                },
                {
                    prop: "createTime",
                    label: "创建时间",
                    width: ""
                },
            ],
        }
    },
    mounted(){
        this.queryUserListPost(this.pageNum);
    },
    methods: {
        //查询所有管理员
        queryUserListPost(pageNum, name){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                name: name
            }
            userQueryAll(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                }
            })
        },
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
            this.dialogFormVisible = false
		},
        onSubmit() {
            console.log('submit!');
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
