<template>
    <div class="__personnel">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select v-model="formInline.region" placeholder="请选择性别">
                        <el-option label="男" value="shanghai"></el-option>
                        <el-option label="女" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属社区：">
                    <el-select v-model="formInline.region" placeholder="请选择社区">
                        <el-option label="社区一" value="shanghai"></el-option>
                        <el-option label="社区二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否实名：">
                    <el-select v-model="formInline.region" placeholder="请选择是否实名">
                        <el-option label="是" value="shanghai"></el-option>
                        <el-option label="否" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableList">
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
                    prop="age"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="community_name"
                    label="所属社区">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="isTrue"
                    label="是否实名">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">拉黑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-top: 15px; overflow: hidden;">
            <div class="pull-right">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formInline: {
                user: '',
                region: ''
            },
            multipleSelection: [],
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            tableData: [
                {
                    name: '张三',
                    age: '男',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '李四',
                    age: '女',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '张三',
                    age: '男',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '李四',
                    age: '女',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '张三',
                    age: '男',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '李四',
                    age: '女',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '张三',
                    age: '男',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '李四',
                    age: '女',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '张三',
                    age: '男',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                },
                {
                    name: '李四',
                    age: '女',
                    community_name: '社区名称',
                    phone: '18512345678',
                    create_time: '2018-07-25 10:00:00',
                    isTrue: '是',
                }
            ]
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        onClickAdd() {
            this.$router.push({path: '/home/community/organizationAdd'})
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
.__personnel {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    border-radius: 4px;
}
</style>