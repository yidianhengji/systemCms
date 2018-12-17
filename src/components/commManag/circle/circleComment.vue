<template>
  <div class="circle__comment__">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="formInline.name" placeholder="请输入评论名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableList">
      <vtable
        :dataArray="dataArray"
        :columns="columns"
        :total="total"
        @getArticle="queryUserListPost"
      ></vtable>
    </div>
  </div>
</template>

<script>
import MyDropDown from "@/components/common/MyDropDown";
import table from "@/components/common/table";
export default {
  name: "circleComment",
  components: {
    vtable: table
  },
  data() {
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
          prop: "content",
          label: "评论内容"
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
              // { label: "修改", func: { func: "update", uuid: param.row.uuid } },
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
                // update: this.update,
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
    onSubmit() {},
    del() {},
    update() {},
    queryUserListPost(pageNum) {
      this.$api
        .postAndJson("/backen/circlePostComment/queryAll", {
          pageSize: this.pageSize,
          pageNum: pageNum,
          communityId: sessionStorage.getItem("communityId")
        })
        .then(data => {
          if (data.data.code == 200) {
            this.dataArray = data.data.data.list;
            this.total = data.data.data.total;
          }
        });
    },
    onClickAdd() {}
  }
};
</script>

<style lang="stylus">
.circle__comment__ {
}
</style>
