<template>
  <div class="__complaintManage">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状态：">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="已回复" value="2"></el-option>
            <el-option label="未回复" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增建议投诉</el-button>
    </div>
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>

    <el-dialog
      title="回复内容"
      :visible.sync="dialogVisible"
      :modal="false"
      width="30%">
      <span>{{comment}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import MyDropDown from '@/components/common/MyDropDown'
  import table from '@/components/common/table'
  import {query, del} from "@/api/complaint/index";

  export default {
    components: {
      vtable: table
    },
    data() {
      const _this = this;
      return {
        comment: '',
        dialogVisible: false,
        formInline: {
          name: '',
          status: ''
        },
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dataArray: [],
        columns: [
          {
            prop: "content",
            label: "投诉内容",
          },
          {
            prop: "createName",
            label: "投诉人姓名",
          },
          {
            prop: "phone",
            label: "投诉人电话",
          },
          {
            prop: "createTime",
            label: "创建时间",
          },
          {
            prop: "status",
            label: "状态",
            render: (h, param) => {
              var html = ''
              if (param.row.status == 1) {
                html = '未回复'
              } else {
                html = '已回复'
              }
              return h('span', html);
            }
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items;
              if (param.row.status == 1) {
                // 未回复
                items = [
                  {label: "回复", func: {func: "update", uuid: param.row.uuid, status: param.row.status}},
                  {label: "删除", func: {func: "del", uuid: param.row.uuid}}
                ]
              } else {
                // 已回复
                items = [
                  {label: "查看回复", func: {func: "chf", uuid: param.row.uuid, status: param.row.status}},
                  {label: "删除", func: {func: "del", uuid: param.row.uuid}}
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
                  del: this.del,
                  chf: this.chf
                }
              });
            }
          }
        ],
      }
    },
    mounted() {
      this.queryUserListPost(this.pageNum);
    },
    methods: {
      //查询所有公告
      queryUserListPost(pageNum, status) {
        let params = {
          pageSize: this.pageSize,
          pageNum: pageNum,
          flag: 1,
          status: status
        }
        this.$api.postAndJson('/backen/complaint/queryAll', params).then(data => {
          if (data.data.code == 200) {
            this.dataArray = data.data.data.list
            this.total = data.data.data.total
          }
        })
      },
      //搜索
      onSubmit() {
        this.queryUserListPost(this.pageNum, this.formInline.status);
      },
      //修改
      update(obj, status) {
        this.$prompt('请输入回复内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入回复内容'
        }).then(({value}) => {
          this.$api.postAndJson('/backen/complaintComment/add', {
            complaintUuid: obj,
            content: value
          }).then(res => {
            //this.comment = res.data.data.list[0].content
            setTimeout(() => {
              location.reload();
            },500)
          })
        }).catch(() => {

        });
      },
      chf(obj) {
        this.dialogVisible = true;
        this.$api.postAndJson('/backen/complaintComment/queryAll', {
          complaintUuid: obj
        }).then(res => {
          this.comment = res.data.data.list[0].content;
        })
      },
      //删除
      del(obj) {
        this.$confirm('是否删除该条记录?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/complaint/update',{uuid: obj, flag: 2}).then(data => {
            if (data.data.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: '500',
                onClose: function () {
                  window.location.reload();
                }
              });
            }
          })
        }).catch(() => {

        });
      },
      onClickAdd() {
        this.$router.push({path: '/complaintManageAdd'})
      }
    }
  }
</script>

<style lang="stylus">
  .__complaintManage {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    .el-popper {
      z-index: 2019 !important;
    }
    .formBox {
      border-bottom 1px solid #eee
    }
    .btnBox {
      margin 10px 0;
    }
    .circleImg {
      width 48px;
      height 48px;
      border-radius 50%;
      vertical-align: middle;
    }
  }
</style>
