<template>
  <div class="__party__remember__">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formInline.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="btnBox">-->
      <!--<el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增管理员</el-button>-->
    <!--</div>-->
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>
  </div>
</template>

<script>
  import MyDropDown from '@/components/common/MyDropDown';
  import table from '@/components/common/table';
  import {userQueryAll} from "api/role/index";//分页查询管理员列表
  import {userQueryRegister} from "api/role/index";//新增管理员
  import {userQueryQueryOne} from "api/role/index";//查询单个管理员
  import {userQueryUpdate} from "api/role/index";//修改管理员
  import {roleQuery} from "api/role/index";//查询权限组

  export default {
    name: "partyRemember",
    components: {
      vtable: table
    },
    data() {
      return {
        formInline: {
          truename: '',
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
            prop: "updateTime",
            label: "最后修改时间",
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items = [
                {label: "删除", func: {func: "del", uuid: param.row.uuid}}
              ]
              const dropDownData = {
                label: "操作",
                items: items
              };
              if (param.row.roleId != '30f8d2eb12514bd4aaf847d2ebe1594d') {
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
          }
        ],
      }
    },
    created() {
      this.queryUserListPost(this.pageNum)
    },
    methods: {
      queryUserListPost(pageNum, truename) {
        let params = {
          pageSize: this.pageSize,
          pageNum: pageNum,
          truename: truename
        }
        this.$api.postAndJson('/backen/partyRemember/queryAll',params).then(data => {
          if (data.data.code == 200) {
            this.dataArray = data.data.data.list
            this.total = data.data.data.total
          }
        })
      },
      del(uuid) {
        this.$confirm("是否删除该条记录?删除后将无法恢复！", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.postAndJson('/backen/partyRemember/del', {uuid: uuid }).then(data => {
              if (data.data.code == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  duration: "500",
                  onClose: function () {
                    window.location.reload();
                  }
                });
              }
            });
          })
          .catch(() => {
          });
      }
    }
  }
</script>

<style scoped>

</style>
