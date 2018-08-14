<template>
    <div class="__goodsList">
        <div class="formBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品名称：">
                    <el-input v-model="formInline.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="所属社区：">
                    <el-select v-model="formInline.communityId" placeholder="请选择所属社区">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item, index) in communityQueryDataList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新建商品</el-button>
        </div>
        <div class="tableList">
            <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
        </div>
    </div>
</template>

<script>
import MyDropDown from '@/components/common/MyDropDown';
import table from '@/components/common/table';
import { queryList } from "api/shop/index";
import { update } from "api/shop/index";//修改
import { communityQuery } from "api/community/index";//所属社区
export default {
    components: {
        vtable: table
    },
    data(){
        return {
            communityQueryDataList: [],//所属社区
            formInline: {
                user: '',
                communityId: ''
            },
            pageSize: 10,
            pageNum: 1,
            total: 0,
            dataArray: [],
            columns: [
                {
                    prop: "name",
                    label: "商品名称",
                },
                {
                    prop: "communityName",
                    label: "所属社区"
                },
                {
                    prop: "store",
                    label: "商品总数",
                },
                {
                    prop: "integral",
                    label: "商品积分",
                },
                {
                    prop: "createName",
                    label: "创建人",
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
        queryUserListPost(pageNum, name, communityId ){
            let params = {
                pageSize: this.pageSize,
                pageNum: pageNum,
                name: name,
                communityId: communityId,
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
            console.log('submit!');
        },
        //新增
        onClickAdd() {
            this.$router.push({path: '/home/zhtGoods/goodsListAdd', query: { type: 1 }})
        },
        update(obj){
            this.$router.push({path: '/home/zhtGoods/goodsListAdd', query: { type: 2, uuid: obj }})
        },
        del(obj){
            this.$confirm('是否删除该条记录?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    uuid: obj,
                    status: 2,
                }
                update(params).then(data => {
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
        }
    }
}
</script>

<style lang="stylus">
.__goodsList {
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