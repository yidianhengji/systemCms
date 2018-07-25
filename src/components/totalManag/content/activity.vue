<template>
    <div class="__activity">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="活动名称：">
                    <el-input v-model="formInline.user" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item class="pull-right">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">发布活动</el-button>
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
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="活动名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="community_name"
                    label="所属社区">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="发布人">
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="更新时间">
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="报名人数">
                </el-table-column>
                <el-table-column
                    prop="tag"
                    label="标签"
                    width="100"
                    :filters="[{ text: '未开始', value: '未开始' }, { text: '进行中', value: '进行中' },  { text: '已结束', value: '已结束' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.tag === '未开始' ? 'info' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleDelete(scope.$index, scope.row)">查看评论</el-button>
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
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '进行中'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '未开始'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '已结束'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '进行中'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '未开始'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '已结束'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '进行中'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '未开始'
                },
                {
                    title: '活动名称',
                    item_name: '两型账户',
                    community_name: '社区名称',
                    create_time: '张三',
                    update_time: '2018-07-25 10:00:00',
                    weight: '0',
                    tag: '已结束'
                },
            ]
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        onClickAdd() {
            this.$router.push({path: '/home/contern/activityAdd'})
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
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    }
}
</script>

<style lang="stylus">
.__activity {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    border-radius: 4px;
}
</style>