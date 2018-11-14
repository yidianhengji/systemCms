<template>
  <div class="__postManage__">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="formInline.title" placeholder="请输入帖子名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="待审核" value="1"></el-option>
            <el-option label="已通过" value="2"></el-option>
            <el-option label="草稿" value="3"></el-option>
            <el-option label="推荐" value="4"></el-option>
            <el-option label="已驳回" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增帖子</el-button>
    </div>
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>
  </div>
</template>

<script>
  import MyDropDown from '@/components/common/MyDropDown'
  import table from '@/components/common/table'

  export default {
    name: 'postManage',
    components: {
      vtable: table
    },
    data() {
      const _this = this;
      return {
        formInline: {
          name: '',
          title: ''
        },
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dataArray: [],
        columns: [
          {
            prop: "title",
            label: "标题",
          },
          {
            prop: "thumbs",
            label: "点赞次数",
          },
          {
            prop: "status",
            label: "状态",
            render: (h, param) => {
              var html = ''
              console.log(param.row.status);
              if(param.row.status == 1) {
                html = '待审核'
              }else if(param.row.status == 2) {
                html = '已通过'
              }else if(param.row.status == 3) {
                html = '草稿'
              }
              else if(param.row.status == 4) {
                html = '推荐'
              }
              else if(param.row.status == 5){
                html = '已驳回'
              }

              return h("span",html);
            }
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
                {label: "修改", func: {func: "update", uuid: param.row.uuid}},
                {label: "删除", func: {func: "del", uuid: param.row.uuid}}
              ]
              if(param.row.status == 1) {
                items.push({label: "通过", func: {func: "pass", uuid: param.row.uuid}},)
              }

              if(param.row.status == 2) {
                items.push({label: "推荐", func: {func: "recommend", uuid: param.row.uuid}},)
              }

              if(param.row.status == 4) {
                items.push({label: "取消推荐", func: {func: "cancelrecommend", uuid: param.row.uuid}},)
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
                  pass: this.pass,
                  recommend: this.recommend,
                  cancelrecommend: this.cancelrecommend
                }
              });
            }
          }
        ],
      }
    },
    created() {
      this.queryUserListPost(this.pageNum)
    },
    methods: {
      cancelrecommend(uuid) {
        this.$confirm('是否取消推荐此帖子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/post/update', {
            uuid: uuid,
            status: 2,
            flag: 1
          }).then(res=>{
            setTimeout(()=>{
              location.reload()
            },200)
          })
        })
      },
      recommend(uuid) {
        this.$confirm('是否推荐此帖子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/post/update', {
            uuid: uuid,
            status: 4,
            flag: 1
          }).then(res=>{
            setTimeout(()=>{
              location.reload()
            },200)
          })
        })
      },
      pass(uuid) {
        this.$confirm('是否通过此帖子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/post/update', {
            uuid: uuid,
            status: 2,
            flag: 1
          }).then(res=>{
            setTimeout(()=>{
              location.reload()
            },200)
          })
        })
      },
      onSubmit() {
        this.$api.postAndJson('/backen/post/query', {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          title: this.formInline.title,
          flag: 1,
          status: this.formInline.status
        }).then(res => {
          this.dataArray = res.data.data.list
          this.total = res.data.data.total
        })
      },
      onClickAdd() {
        this.$router.push({path: '/postAdd'})
      },
      queryUserListPost(pageNum) {
        this.$api.postAndJson('/backen/post/query', {
          pageSize: this.pageSize,
          pageNum: pageNum,
          flag: 1,
          communityId: sessionStorage.getItem('communityId')
        }).then(res => {
          this.dataArray = res.data.data.list
          this.total = res.data.data.total
        })
      },
      getArticle() {
      },
      del(uuid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/post/update', {
            uuid: uuid,
            flag: 2
          }).then(res=>{
            setTimeout(()=>{
              location.reload()
            },200)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      update(uuid) {
        this.$router.push({path: '/postAdd', query: { uuid: uuid }})
      }
    }
  };
</script>

<style lang="stylus">
  .__postManage__ {

  }
</style>
