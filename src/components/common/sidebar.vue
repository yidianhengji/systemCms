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
                    <!-- <el-submenu v-for="(item,index) in sidebarMenu2" :key="index" :index="''+(index+1)">
                        <template slot="title">
                            <span>{{item.parentItem.name}}</span>
                        </template>
                        <el-menu-item-group v-if="item.childItem">
                            <el-menu-item v-for="(itemList,indexList) in item.childItem" :key="indexList" :index="''+itemList.path">
                                {{itemList.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu> -->

                    <el-submenu v-for="(item,index) in sidebarMenu" :key="index" :index="''+(index+1)">
                        <template slot="title">
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item-group v-if="item.powers">
                            <el-menu-item v-for="(itemList,indexList) in item.powers" :key="indexList" :index="''+itemList.frontPath">
                                {{itemList.meunName}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { queryAll } from "api/login/index";
export default {
    data(){
        return {
            systemType: '',
            uniqueOpened: true,
            openedRouter: true,
            defaultActive: this.$route.path,
            openeds: ['1'],
            sidebarMenu: [],
        }
    },
    methods: {
        handleOpen(key, keyPath) {
           	
        },
        handleClose(key, keyPath) {
            
        },
    },
    mounted() {
        if(sessionStorage.getItem("systemType")=='1'){
            this.systemType = 1
            this.sidebarMenu = JSON.parse(sessionStorage.getItem("sidebarMenu1"))
        }else if(sessionStorage.getItem("systemType")=='2'){
            this.systemType = 2
            this.sidebarMenu = JSON.parse(sessionStorage.getItem("sidebarMenu2"))
        }
        /*
        * 总后台
        */
        //任务
        if(this.$route.path=='/home/zhtContern/taskAdd'){
            this.defaultActive = '/home/zhtContern/task'
        }
        //活动
        if(this.$route.path=='/home/zhtContern/activityAdd'){
            this.defaultActive = '/home/zhtContern/activity'
        }
        //社区管理
        if(this.$route.path=='/home/zhtCommunity/organizationAdd'){
            this.defaultActive = '/home/zhtCommunity/organization'
        }
        //商品管理
        if(this.$route.path=='/home/zhtGoods/goodsListAdd'){
            this.defaultActive = '/home/zhtGoods/goodsList'
        }
        /*
        * 社区
        */
        //任务
        if(this.$route.path=='/home/sqContern/taskAdd'){
            this.defaultActive = '/home/sqContern/task'
        }
        //活动
        if(this.$route.path=='/home/sqContern/taskAdd'){
            this.defaultActive = '/home/sqContern/task'
        }
        //居民
        if(this.$route.path=='/home/sqCommunity/personnelAdd'){
            this.defaultActive = '/home/sqCommunity/personnel'
        }
        //居民
        if(this.$route.path=='/home/sqCommunity/volunteerAdd'){
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
