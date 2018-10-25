<template>
  <div class="coupon__">
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增社区优惠券</el-button>
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
    name: "coupon",
    components: {
      vtable: table
    },
    data() {
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
            prop: "name",
            label: "标题",
          },
          {
            prop: "merchantName",
            label: "所属",
            render: (h, params) => {
              if(!params.row.merchantId) {
                return h('span', '社区')
              }else{
                return h('span', params.row.merchantName)
              }
            }
          },
          {
            prop: "时间",
            label: "有效期",
            render: (h, param) => {
              return h("span",param.row.startTime + '至' + param.row.endTime);
            }
          },
          {
            prop: "updateTime",
            label: "更新时间",
          },
          {
            prop: '',
            label: '删除',
            render: (h, param) => {
              var items = [
                {label: "删除", func: {func: "del", uuid: param.row.uuid}},
              ]
              const dropDownData = {
                label: "操作",
                items: items
              };
              return h(MyDropDown, {
                props: {
                  dropDownData: dropDownData
                },
                on: {
                  del: this.del,
                }
              });
            }
          }
        ],
      }
    },
    created() {
      this.$api.postAndJson('/backen/coupon/queryAll', {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        flag: 1,
        merchantId: ''
      }).then(res => {
        this.dataArray = res.data.data.list
        this.total = res.data.data.total
      })
    },
    methods: {
      queryUserListPost() {
      },
      onClickAdd() {
        this.$router.push({path: '/couponAdd'})
      },
      onSubmit() {},
      del(uuid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndJson('/backen/coupon/update', {
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
      }
    }
  }
</script>

<style scoped>

</style>
