<template>
  <div class="__notice">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="formInline.name" placeholder="请输入公告名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">发布公告</el-button>
    </div>
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>
  </div>
</template>

<script>
  import MyDropDown from '@/components/common/MyDropDown'
  import table from '@/components/common/table'
  import { query, update } from "@/api/notice/index";
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
            prop: "title",
            label: "活动名称",
          },
          {
            prop: "createTime",
            label: "创建时间",
          },
          {
            prop: "updateTime",
            label: "更新时间",
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items = [
                { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                { label: "删除", func: { func: "del", uuid: param.row.uuid } }
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
      //查询所有公告
      queryUserListPost(pageNum, name){
        let params = {
          pageSize: this.pageSize,
          pageNum: pageNum,
          title: name,
          type: 2,
          communityId: sessionStorage.getItem("communityId"),
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
        this.queryUserListPost(this.pageNum, this.formInline.name);
      },
      //新增
      onClickAdd() {
        this.$router.push({path: '/home/sqContern/noticeAdd', query: { type: 1 } })
      },
      //修改
      update(obj) {
        this.$router.push({path: '/home/sqContern/noticeAdd', query: { uuid: obj, type: 2 } })
      },
      //删除
      del(obj) {
        this.$confirm('是否删除该条记录?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          update({uuid: obj, flag: 2}).then(data => {
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
    }
  }
</script>

<style lang="stylus">
  .__notice {
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
