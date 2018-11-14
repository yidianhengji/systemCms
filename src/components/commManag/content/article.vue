<template>
  <div class="__article__">
    <div class="formBox">
      <el-form class="demo-form-inline" :inline="true">
        <el-form-item label="状态：">
          <el-select v-model="classify" placeholder="请选择状态">
            <el-option label="网格" value="1"></el-option>
            <el-option label="活动风采" value="2"></el-option>
            <el-option label="业务办理" value="3"></el-option>
            <el-option label="社区风采" value="4"></el-option>
            <el-option label="党建" value="5"></el-option>
            <el-option label="商家分类" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题名称：">
          <el-input v-model="title" placeholder="请输入标题名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        title: '',
        classify: '',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dataArray: [],
        columns: [
          {
            prop: "title",
            label: "标题",
            render: function (createElement) {
              return createElement('a', {
                domProps: {
                  innerHTML: this.row.title,
                  title: this.row.title,
                  className: 'tableNoData',
                  target: '_blank',
                  href: 'https://www.xxsghp.cn/weDream/detail/app1.html?uuid='+this.row.uuid+'',
                }
              })
            }
          },
          {
            prop: 'className',
            label: '所属分类'
          },
          {
            prop: "createName",
            label: "发布人"
          },
          {
            prop: "createTime",
            label: "创建时间"
          },
          {
            prop: "status",
            label: "状态",
            render: (h,param) => {
              if(param.row.status == 1) {
                return h('span', '推荐')
              }else{
                return h('span', '正常')
              }
            }
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items = [
                {label: "修改", func: {func: "update", uuid: param.row.uuid}},
                {label: "删除", func: {func: "del", uuid: param.row.uuid}},
              ];
              if(param.row.status != 1) {
                items.push({label: "推荐", func: {func: "recommend", uuid: param.row.uuid}},)
              } else{
                items.push({label: "取消推荐", func: {func: "crecommend", uuid: param.row.uuid}},)
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
                  del: this.del,
                  recommend: this.recommend,
                  crecommend: this.crecommend
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
      onSubmit() {
        this.$api.postAndJson('/backen/articles/queryAll', {
          type: this.classify,
          pageSize: this.pageSize,
          pageNum: 1,
          flag: 1,
          title: this.title,
        }).then(res=> {
          if (res.data.code == 200) {
            this.dataArray = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
      },
      onClickAdd() {
        this.$router.push({path: '/articleAdd'})
      },
      queryUserListPost(pageNum) {
        this.$api
          .postAndJson("/backen/articles/queryAll", {
            pageSize: this.pageSize,
            pageNum: pageNum,
            flag: 1,
            communityId: sessionStorage.getItem('communityId')
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
            this.$api.postAndJson('/backen/articles/update', {uuid: uuid, flag: 2}).then(data => {
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
      },
      update(uuid) {
        this.$router.push({path: '/articleAdd', query: {uuid: uuid}})
      },
      recommend(uuid) {
        this.$confirm("是否推荐该条文章?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.postAndJson('/backen/articles/update', {uuid: uuid, flag: 1, status: 1}).then(data => {
              if (data.data.code == 200) {
                this.$message({
                  message: "成功",
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
      },
      crecommend(uuid) {
        this.$confirm("是否取消推荐该文章?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.postAndJson('/backen/articles/update', {uuid: uuid, flag: 1, status: 0}).then(data => {
              if (data.data.code == 200) {
                this.$message({
                  message: "成功",
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
