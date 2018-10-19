<template>
  <div class="__meun__">
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增菜单</el-button>
    </div>
    <div class="tableList">
      <div class="el-table el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--mini">
        <div class="el-table__header-wrapper">
          <table class="el-table__header" v-html="html" @click="click($event)" width="100%" cellpadding="0" cellspacing="0">

          </table>
        </div>
      </div>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table>
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import MyDropDown from 'src/components/common/MyDropDown'
  import table from '@/components/common/table'
  import { queryAll } from "api/role/index";//查询所有菜单

  export default {
    name: "classify",
    components: {
      vtable: table
    },
    data() {
      return {
        dialogTableVisible: false,
        tree: [],
        html: ` <tr>
          <th style="width: 20%;">名称</th>
          <th style="width: 20%;">创建时间</th>
          <th style="width: 20%;">front-path</th>
          <th style="width: 20%;">权重</th>
          <th style="width: 20%;">操作</th>
        </tr>`,
        iv: 0,
      }
    },
    created() {
      queryAll().then(res => {
        this.tree = res.data.data;

        this.bj(this.tree)
      })
    },
    methods: {
      onClickAdd() {
        this.$router.push({path: '/meunAdd'})
      },
      del() {
      },
      click(e) {
        let id = e.target.id;
        let method = e.target.name;
        if (method && id)
          this[method](id);
      },
      update(uuid) {
        this.$router.push({path: '/classifyAdd', query: { uuid: uuid }})
      },
      del(uuid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.postAndToken('/backen/permiss/powers/del', {
            uuid: uuid,
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
      bj(arr) {
        arr.forEach((v, i) => {
          if(!v.frontPath) {
            this.iv = 1;
          }else{
            this.iv = 2;
          }
          this.html +=
            `<tr class="el-table__row">
            <td style="padding-left: ${this.iv * 30}px">${v.meunName || v.name}</td>
            <td>${v.createTime}</td>
            <td>${v.frontPath || ''}</td>
            <td>${v.weight}</td>
            <td><a id="${v.uuid}" name="del">删除</a></td>
          </tr>`
          if (v.powers && v.powers.length > 0) {
            this.bj(v.powers)
          }
        })
      },
    }
  }
</script>

<style lang="stylus" >
  .__meun__ {
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
    .el-table--mini th {
      padding: 14px 11px;
      background #f5f7fa
    }
    .el-table__header td {
      padding: 15px;
    }
    .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
      background #fff
    }
  }
</style>
