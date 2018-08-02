<template>
    <div class="__task">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="任务名称：">
                    <el-input v-model="formInline.user" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">发布任务</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown'
import table from '@/components/common/table'
import { taskQuery, taskDel } from "api/task/index";
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
                    prop: "name",
                    label: "任务名称",
                },
                {
                    prop: "communityId",
                    label: "所属社区",
                },
                {
                    prop: "createUser",
                    label: "发布人",
                },
                {
                    prop: "createTime",
                    label: "创建时间",
                    width: ""
                },
                {
                    prop: "limitPeople",
                    label: "人数上限",
                    width: ""
                },
                {
                    prop: "joinPeople",
                    label: "报名人数",
                    width: ""
                },
                {
                    prop: "integral",
                    label: "积分设置",
                    width: ""
                },
                {
                    prop: "is_authentication",
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
                {
                    prop: "",
                    label: "操作",
                    render: (h, param) => {
                        if(param.row.dataForm==1){
                            var items = [
                                { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                                { label: "删除", func: { func: "del", uuid: param.row.uuid } },
                                { label: "查看评论", func: { func: "del", uuid: param.row.uuid } },
                            ]
                        }else if(param.row.dataForm==2){
                            var items = [
                                { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                                { label: "删除", func: { func: "del", uuid: param.row.uuid } }
                            ]
                        }
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
    },
    methods: {
        //查询所有管理员
        queryUserListPost(pageNum){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum
            }
            taskQuery(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                }
            })
        },
        //搜索
        onSubmit() {
            console.log('submit!');
        },
        //新增
        onClickAdd() {
            this.$router.push({path: '/home/contern/taskAdd', query: { type: 1 } })
        },
        //修改
        update(obj) {
            this.$router.push({path: '/home/contern/taskAdd', query: { uuid: obj, type: 2 } })
        },
        //删除
        del(obj) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                taskDel({uuid: obj}).then(data => {
                    if(data.data.code==200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.queryUserListPost(this.pageNum);
                    }
                })
            }).catch(() => {
                
            });
        },
    }
}
</script>

<style lang="stylus">
.__task {
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
