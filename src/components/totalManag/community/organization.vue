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
import MyDropDown from "@/components/common/MyDropDown";
import table from "@/components/common/table";
import { communityQuery, communityUpdate } from "api/community/index";
export default {
  components: {
    vtable: table
  },
  data() {
    let $this = this;
    return {
      formInline: {
        name: ""
      },
      pageSize: 10,
      pageNum: 1,
      total: 0,
      dataArray: [],
      columns: [
        {
          prop: "name",
          label: "社区名称"
        },
        {
          prop: "leaderName",
          label: "社区负责人"
        },
        {
          prop: "leaderMobile",
          label: "负责人电话"
        },
        {
          prop: "createTime",
          label: "创建时间",
          width: ""
        },
        {
          prop: "",
          label: "操作",
          render: (h, param) => {
            var items = [
              { label: "修改", func: { func: "update", uuid: param.row.uuid } },
              //{ label: "删除", func: { func: "del", uuid: param.row.uuid } },
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
                //del: this.del,
              }
            });
          }
        }
      ]
    };
  },
  mounted() {
    this.queryUserListPost(this.pageNum);
  },
  methods: {
    //查询所有社区
    queryUserListPost(pageNum, name) {
      let params = {
        pageSize: this.pageSize,
        pageNum: pageNum,
        name: name
      };
      communityQuery(params).then(data => {
        if (data.data.code == 200) {
          this.dataArray = data.data.data.list;
          this.total = data.data.data.total;
        }
      });
    },
    //搜索
    onSubmit() {
      this.queryUserListPost(this.pageNum, this.formInline.name);
    },
    //新增
    onClickAdd() {
      this.$router.push({ path: "/home/zhtCommunity/organizationAdd" });
    },
    update(uuid) {
      this.$prompt("请输入新的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "请输入新的名称",
      })
        .then(({ value }) => {
          this.$api
            .postAndJson("/backen/community/update", {
              uuid: uuid,
              name: value
            })
            .then(res => {
              //this.comment = res.data.data.list[0].content
              setTimeout(() => {
                location.reload();
              }, 500);
            });
        })
        .catch(() => {});
    },
    del(uuid){
      this.$confirm('是否删除该条记录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        communityUpdate({uuid: uuid, status: 2}).then(data => {
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
};
</script>

<style lang="stylus">
.__organization {
    background: #ffffff;
    padding: 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;

    .formBox {
        border-bottom: 1px solid #eee;
    }

    .btnBox {
        margin: 10px 0;
    }
}
</style>
