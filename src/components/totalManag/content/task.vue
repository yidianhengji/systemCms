<template>
    <div class="__task">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="名称：">
                    <el-input v-model="formInline.name" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="formInline.flag" placeholder="请选择状态">
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="进行中" value="2"></el-option>
                        <el-option label="已结束" value="3"></el-option>
                    </el-select>
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
                name: '',
                flag: ''
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
                    prop: "communityName",
                    label: "所属社区",
                },
                {
                    prop: "createName",
                    label: "发布人",
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
                    prop: "updateTime",
                    label: "更新时间",
                    width: ""
                },
                {
                    prop: "flag",
                    label: "状态",
                    width: "",
                    render: function(createElement) {
                        if(this.row.flag==1){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '未开始',
                                    className: 'text-info'
                                }
                            })
                        }else if(this.row.flag==2){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '进行中',
                                    className: 'text-warning'
                                }
                            })
                        }else if(this.row.flag==3){
                            return createElement('span', {
                                domProps: {
                                    innerHTML: '已结束',
                                    className: 'text-success'
                                }
                            })
                        }
                    },
                },
                {
                    prop: "",
                    label: "操作",
                    render: (h, param) => {
                        if(param.row.dataForm==1){
                            if(param.row.flag==1){
                                var items = [
                                    { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                                    { label: "删除", func: { func: "del", uuid: param.row.uuid } },
                                ]
                            }else if(param.row.flag==2){
                                var items = []
                            }else if(param.row.flag==3){
                                var items = [
                                    { label: "删除", func: { func: "del", uuid: param.row.uuid } },
                                    { label: "查看评论", func: { func: "view", uuid: param.row.uuid } },
                                ]
                            }
                        }else if(param.row.dataForm==2){
                            if(param.row.flag==1){
                                var items = [
                                    { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                                    { label: "删除", func: { func: "del", uuid: param.row.uuid } }
                                ]
                            }else if(param.row.flag==2){
                                var items = []
                            }else if(param.row.flag==3){
                                var items = [
                                    { label: "删除", func: { func: "del", uuid: param.row.uuid } },
                                ]
                            }
                        }
                        if(items.length>0){
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
                                    view: this.view
                                }
                            });
                        }
                    }
                }
            ],
        }
    },
    mounted(){
        this.queryUserListPost(this.pageNum);
    },
    methods: {
        //查询所有任务
        queryUserListPost(pageNum, name, flag){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                name: name,
                flag: flag
            }
            taskQuery(params).then(data => {
                if(data.data.code==200){
                    this.dataArray = data.data.data.list
                    this.total = data.data.data.total
                }
            })
        },
        //搜索
        onSubmit() {
            this.queryUserListPost(this.pageNum, this.formInline.name, this.formInline.flag);
        },
        //新增
        onClickAdd() {
            this.$router.push({path: '/home/zhtContern/taskAdd', query: { type: 1 } })
        },
        //修改
        update(obj) {
            this.$router.push({path: '/home/zhtContern/taskAdd', query: { uuid: obj, type: 2 } })
        },
        //删除
        del(obj) {
            this.$confirm('是否删除该条记录?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                taskDel({uuid: obj}).then(data => {
                    if(data.data.code==200){
                        this.$message({
                            message: '删除成功',
                            type: 'success',
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
        view(obj){

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
