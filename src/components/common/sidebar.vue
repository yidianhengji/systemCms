<template>
  <div class="__sidebar">
    <el-row class="tac">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          :default-openeds="openeds"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="uniqueOpened"
          :router="openedRouter"
          :default-active="defaultActive"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#fff">
          <el-submenu v-for="(item,index) in sidebarMenu2" :key="index" :index="''+(index+1)">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-if="item.powers">
              <el-menu-item v-for="(itemList,indexList) in item.powers" :key="indexList" :index="''+itemList.frontPath">
                {{itemList.meunName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!--<el-submenu v-for="(item,index) in sidebarMenu" :key="index" :index="''+(index+1)">
			  <template slot="title">
				  <span>{{item.name}}</span>
			  </template>
			  <el-menu-item-group v-if="item.powers">
				  <el-menu-item v-for="(itemList,indexList) in item.powers" :key="indexList" :index="''+itemList.frontPath">
					  {{itemList.meunName}}
				  </el-menu-item>
			  </el-menu-item-group>
		  </el-submenu>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {queryAll} from "api/login/index";

  export default {
    data() {
      return {
        systemType: '',
        uniqueOpened: true,
        openedRouter: true,
        defaultActive: this.$route.path,
        openeds: ['1'],
        sidebarMenu: [],
        sidebarMenu2: [{
          "name": "内容管理",
          "powers": [{
            "meunName": "公告管理",
            "frontPath": "/home/sqContern/notice"
          },{
            "meunName": "活动管理",
            "frontPath": "/home/sqContern/activity"
          }, {
            "meunName": "任务管理",
            "frontPath": "/home/sqContern/task"
          }]
        }, {
          "name": "业务管理",
          "powers": [{
            "meunName": "业务类型",
            "frontPath": "/home/sqCommunity/personnel"
          },{
            "meunName": "业务办理",
            "frontPath": "/home/sqCommunity/personnel"
          }]
        },{
          "name": "邻里圈子",
          "powers": [{
            "meunName": "圈子管理",
            "frontPath": "/home/sqCircle/circleManage"
          }, {
            "meunName": "帖子管理",
            "frontPath": "/home/sqCircle/postManage"
          }, {
            "meunName": "圈子公告",
            "frontPath": "/home/sqCircle/circleNotice"
          }, {
            "meunName": "评论管理",
            "frontPath": "/home/sqCircle/circleComment"
          }]
        },{
          "name": "投诉管理",
          "powers": [{
            "meunName": "投诉建议",
            "frontPath": "/home/sqComplaint/complaintManage"
          }]
        },{
          "name": "用户管理",
          "powers": [{
            "meunName": "居民管理",
            "frontPath": "/home/sqCommunity/personnel"
          }, {
            "meunName": "志愿者管理",
            "frontPath": "/home/sqCommunity/volunteer"
          }]
        }, {
          "name": "权限管理",
          "powers": [{
            "meunName": "管理员",
            "frontPath": "/home/sqPower/powerUser"
          }, {
            "meunName": "权限组",
            "frontPath": "/home/sqPower/powerPowerGroup"
          }]
        }]
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
      //根据用户查询菜单权限
      queryAllPost() {
        var userData = JSON.parse(sessionStorage.getItem("userData"));
        queryAll({uuid: userData.roleId}).then(data => {
          if (data.data.code == 200) {
            this.sidebarMenu = data.data.data
          }
        })
      }
    },
    mounted() {
      if (sessionStorage.getItem("systemType") == '1') {
        this.systemType = 1
      } else if (sessionStorage.getItem("systemType") == '2') {
        this.systemType = 2
      }
      this.queryAllPost();
      /*
	  * 总后台
	  */
      //任务
      if (this.$route.path == '/home/zhtContern/taskAdd') {
        this.defaultActive = '/home/zhtContern/task'
      }
      //活动
      if (this.$route.path == '/home/zhtContern/activityAdd') {
        this.defaultActive = '/home/zhtContern/activity'
      }
      //社区管理
      if (this.$route.path == '/home/zhtCommunity/organizationAdd') {
        this.defaultActive = '/home/zhtCommunity/organization'
      }
      //商品管理
      if (this.$route.path == '/home/zhtGoods/goodsListAdd') {
        this.defaultActive = '/home/zhtGoods/goodsList'
      }
      /*
	  * 社区
	  */
      //任务
      if (this.$route.path == '/home/sqContern/taskAdd') {
        this.defaultActive = '/home/sqContern/task'
      }
      //活动
      if (this.$route.path == '/home/sqContern/taskAdd') {
        this.defaultActive = '/home/sqContern/task'
      }
      //居民
      if (this.$route.path == '/home/sqCommunity/personnelAdd') {
        this.defaultActive = '/home/sqCommunity/personnel'
      }
      //志愿者
      if (this.$route.path == '/home/sqCommunity/volunteerAdd') {
        this.defaultActive = '/home/sqCommunity/volunteer'
      }
    },
  }
</script>

<style lang="stylus">
  .sidebar {
    .el-menu-item-group__title {
      padding 0px;
    }
    .el-submenu .el-menu-item {
      background #16181d !important
    }
    .el-submenu .is-active {
      background #1E9FFF !important
    }

  }
</style>
