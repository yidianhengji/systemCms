<template>
    <div class="__organization">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="社区名称：">
                    <el-input v-model="formInline.name" placeholder="请输入社区名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新建社区</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { communityQuery } from "api/community/index";
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            formInline: {
                name: '',
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
        //查询所有社区
        queryUserListPost(pageNum, name){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                name: name
            }
            communityQuery(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                }
            })
        },
        //搜索
        onSubmit() {
            this.queryUserListPost(this.pageNum, this.formInline.name);
        },
        //新增
        onClickAdd() {
            this.$router.push({path: '/home/community/organizationAdd'})
        },
    }
}
</script>

<style lang="stylus">
.__organization {
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