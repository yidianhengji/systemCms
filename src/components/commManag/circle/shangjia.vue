<template>
  <div class="__shangjia__">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="formInline.name" placeholder="请输入商家店铺名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增商家店铺</el-button>
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
    name: "shangjia",
    components: {
      vtable: table
    },
    data() {
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
            prop: "name",
            label: "店铺名称",
          },
          {
            prop: "label",
            label: "标签",
          },
          {
            prop: 'address',
            label: '地址'
          },
          {
            prop: "weight",
            label: "权重",
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
                {label: "删除", func: {func: "del", uuid: param.row.uuid}},
                {label: "优惠券新增", func: {func: "add", uuid: param.row.uuid}},
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
                  add: this.add
                }
              });
            }
          }
        ],
      }
    },
    created() {
      this.$api.postAndJson('/backen/merchant/queryAll', {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        flag: 1
      }).then(res => {
        this.dataArray = res.data.data.list
        this.total = res.data.data.total
      })
    },
    methods: {
      add(uuid) {
        this.$router.push({path: '/couponAdd', query: { uuid:  uuid}})
      },
      onSubmit() {
        this.$api.postAndJson('/backen/merchant/queryAll', {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          flag: 1,
          name: this.formInline.name
        }).then(res => {
          this.dataArray = res.data.data.list
          this.total = res.data.data.total
        })

      },
      onClickAdd() {
        this.$router.push({path: '/shangjiaAdd'})
      },
      queryUserListPost() {

      },
      getArticle() {
      },
      del(uuid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/merchant/update', {
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
        this.$router.push({path: '/shangjiaAdd', query: { uuid: uuid }})
      }
    }
  }
</script>

<style lang="stylus">
  .__shangjia__ {

  }
</style>
