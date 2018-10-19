<template>
  <div class="__article__">
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">发布文章</el-button>
    </div>
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>
  </div>
</template>

<script>
  import MyDropDown from "@/components/common/MyDropDown";
  import table from "@/components/common/table";
  export default {
    components: {
      vtable: table
    },
    data() {
      return {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dataArray: [],
        columns: [
          {
            prop: "title",
            label: "标题"
          },
          {
            prop: 'className',
            label: '所属分类'
          },
          {
            prop: "createTime",
            label: "创建时间"
          },
          {
            prop: "updateTime",
            label: "更新时间"
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items = [
                { label: "修改", func: { func: "update", uuid: param.row.uuid } },
                { label: "删除", func: { func: "del", uuid: param.row.uuid } }
              ];
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
        ]
      };
    },
    created() {
      this.queryUserListPost(this.pageNum);
    },
    methods: {
      onClickAdd() {
        this.$router.push({path: '/dangjianAdd'})
      },
      queryUserListPost(pageNum) {
        this.$api
          .postAndJson("/backen/articles/queryAll", {
            pageSize: this.pageSize,
            pageNum: pageNum,
            flag: 1,
            type: 5
          })
          .then(data => {
            if (data.data.code == 200) {
              this.dataArray = data.data.data.list;
              this.total = data.data.data.total;
            }
          });
      },
      del(uuid) {
        this.$confirm("是否删除该条记录?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.postAndJson('/backen/articles/update',{ uuid: uuid, flag: 2 }).then(data => {
              if (data.data.code == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  duration: "500",
                  onClose: function() {
                    window.location.reload();
                  }
                });
              }
            });
          })
          .catch(() => {});
      },
      update(uuid) {
        this.$router.push({path: '/dangjianAdd', query: { uuid: uuid }})
      },
    }
  };
</script>

<style lang="stylus">
  .__article__ {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    .formBox {
      border-bottom 1px solid #eee
    }
    .btnBox {
      margin 10px 0;
    }
  }
</style>
