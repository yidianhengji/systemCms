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
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { query } from "api/people/index";
export default {
    components: {
        vtable: table
    },
    data(){
        return {
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
                    prop: "nickname",
                    label: "姓名",
                },
                {
                    prop: "communityId",
                    label: "性别",
                },
                {
                    prop: "mobile",
                    label: "手机号码",
                },
                {
                    prop: "idCard",
                    label: "身份证号",
                    width: ""
                },
                {
                    prop: "integral",
                    label: "现有积分",
                    width: ""
                },
                {
                    prop: "identityFlag",
                    label: "身份",
                    width: ""
                },
                {
                    prop: "isRealName",
                    label: "实名",
                    width: ""
                },
                {
                    prop: "status",
                    label: "状态",
                    width: "",
                    render: function(h, param) {
                        let html = "";
                        if(param.row.sex == 1) {
                            html = "是";
                        } else if(param.row.sex == 2) {
                            html = "否";
                        }
                        return html;
                    }
                },
            ],
        }
    },
    mounted(){
        this.queryUserListPost(this.pageNum);
    },
    methods: {
        //查询所有管理员
        queryUserListPost(pageNum){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum
            }
            query(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                }
            })
        },
        //搜索
        onSubmit() {
            console.log('submit!');
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