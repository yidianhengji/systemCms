<template>
  <div class="wrapper">
    <div class="header">
      <headerList></headerList>
    </div>
    <div class="sidebar">
      <div class="sidebar-scroll">
        <div class="logo">
          <span>{{sysName}}</span>
        </div>
        <div class="sidebar-nav-tree">
          <sidebarMenu></sidebarMenu>
        </div>
      </div>
    </div>
    <div class="sidebarMain">
      <div class="breadcrumb-nav" v-if="$route.path!='/home/survey'">
        <el-breadcrumb separatorarticleAdd-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/survey' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sidebarMain-contern">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <footerData></footerData>
    </div>
  </div>
</template>

<script>
  import headerList from '@/components/common/header';//导航
  import sidebarMenu from '@/components/common/sidebar';//菜单
  import footerData from '@/components/common/footer';//页脚
  export default {
    components: {
      headerList,
      sidebarMenu,
      footerData
    },
    data() {
      return {
        sysName: ''
      }
    },
    mounted() {
      var userData = JSON.parse(sessionStorage.getItem("userData"));
      if (sessionStorage.getItem("systemType") == '1') {
        this.sysName = userData.sysName
      } else if (sessionStorage.getItem("systemType") == '2') {
        this.sysName = userData.communityName
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .wrapper {
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background #ffffff;
      z-index: 8;
    }
    .sidebar {
      position: fixed;
      width: 220px;
      top: 0;
      bottom: 0;
      z-index: 9;
      background #20222A;
      overflow-x: hidden;
      padding-bottom: 10000px;
      margin-bottom: -10000px;
      color #ffffff;
      .sidebar-scroll {
        position: relative;
        width: 240px;
        height: 100%;
        overflow-x: hidden;
        .logo {
          background-color: #20222A !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
          -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
          -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1002;
          width: 220px;
          height: 49px;
          padding: 0 15px;
          box-sizing: border-box;
          overflow: hidden;
          font-weight: 300;
          background-position: center center;
          text-align center;
          span {
            line-height 50px;
          }
        }
        .sidebar-nav-tree {
          width 220px;
          margin-top: 50px;
        }
      }
    }
    .sidebarMain {
      position: absolute;
      left: 220px;
      right: 0;
      top: 51px;
      bottom: 50px;
      z-index: 98;
      width: auto;
      overflow: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      .breadcrumb-nav {
        width: 100%;
        background: #fff;
        height: 50px;
        .el-breadcrumb {
          height: 50px;
          line-height: 50px;
          padding: 0 15px;
        }
      }
      .sidebarMain-contern {
        padding 15px;
      }
    }
    .footer {
      position: fixed;
      left: 220px;
      right: 0;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      text-align center;
      z-index 9;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .15);
      -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .15);
      -moz-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .15);
    }
    .el-menu {
      border-right 0px;
    }
  }
</style>
