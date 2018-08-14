<template>
    <div class="__personnel">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.nickname" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select v-model="formInline.sex" placeholder="请选择性别">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属社区：">
                    <el-select v-model="formInline.communityId" placeholder="请选择所属社区">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item, index) in communityQueryDataList" :key="index" :label="item.name" :value="item.uuid"></el-option>
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
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { query } from "api/people/index";
import { communityQuery } from "api/community/index";//所属社区
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            communityQueryDataList: [],//所属社区
            formInline: {
                nickname: '',
                sex: '',
                communityId: '',
                isRealName: ''
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
                    prop: "communityName",
                    label: "所属社区"
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
        this.communityQueryPost();
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
        //查询所有管理员
        queryUserListPost(pageNum, nickname, sex, communityId, isRealName){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                nickname: nickname,
                sex: sex,
                communityId: communityId,
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
            this.queryUserListPost(this.pageNum, this.formInline.nickname, this.formInline.sex, this.formInline.communityId, this.formInline.isRealName);
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
        
    }
    .btnBox {
        margin 10px 0;
    }
}
</style>