<template>
    <div class="__organization">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="手机号码：">
                    <el-input v-model="formInline.name" placeholder="请输入志愿者手机号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新建志愿者</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { queryList } from "api/volunteer/index";//新增
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
                    prop: "truename",
                    label: "姓名",
                },
                {
                    prop: "mobile",
                    label: "手机号码",
                },
                {
                    prop: "role",
                    label: "负责权限",
                    render: function(createElement) {
                        var role = JSON.parse(this.row.role);
                        var text = '';
                        for(var i=0;i<role.length;i++){
                            if(role[i]==1){
                                text+='活动、'
                            }else if(role[i]==2){
                                text+='任务、'
                            }else if(role[i]==3){
                                text+='垃圾分类、'
                            }
                        }
                        return createElement('span', {
                            domProps: {
                                innerHTML: text.substr(0,text.length-1),
                            }
                        })
                    },
                },
                {
                    prop: "",
                    label: "操作",
                    render: (h, param) => {
                        var items = [
                            { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                            { label: "删除", func: { func: "del", uuid: param.row.uuid } },
                        ]
                        const dropDownData = {
                            label: "操作",
                            items: items
                        };
                        // 触发MyDropDown的update和del事件
                        return h(MyDropDown, {
                            props: {
                                dropDownData: dropDownData
                            },
                            on: {
                                update: this.update,
                                del: this.del,
                            }
                        });
                    }
                }
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
                mobile: name
            }
            queryList(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                    this.total = data.data.data.total
                }
            })
        },
        //搜索
        onSubmit() {
            this.queryUserListPost(this.pageNum, this.formInline.name);
        },
        //新增
        onClickAdd() {
            this.$router.push({path: '/home/sqCommunity/volunteerAdd', query: { type: 1 }})
        },
        update(obj){
            this.$router.push({path: '/home/sqCommunity/volunteerAdd', query: { type: 2, uuid: obj }})
        },
        del(obj){

        }
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