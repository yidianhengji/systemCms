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
                            <span>{{item.parentItem.name}}</span>
                        </template>
                        <el-menu-item-group v-if="item.childItem">
                            <el-menu-item v-for="(itemList,indexList) in item.childItem" :key="indexList" :index="''+itemList.path">
                                {{itemList.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            systemType: '',
            uniqueOpened: true,
            openedRouter: true,
            defaultActive: this.$route.path,
            openeds: ['1'],
            sidebarMenu1: [
                {
                    parentItem: { name: '内容管理' },
                    childItem: [
                        { name: '活动管理', path: '/home/contern/activity' },
                        { name: '任务管理', path: '/home/contern/task' },
                        { name: '垃圾分类', path: '/home/contern/garbageType' },
                    ],
                },
                {
                    parentItem: { name: '社区管理' },
                    childItem: [
                        { name: '社区管理', path: '/home/community/organization' },
                        { name: '居民管理', path: '/home/community/personnel' },
                    ],
                },
                {
                    parentItem: { name: '商品管理' },
                    childItem: [
                        { name: '商品管理', path: '/home/goods/goodsList' },
                    ],
                },
                {
                    parentItem: { name: '权限管理' },
                    childItem: [
                        { name: '管理员', path: '/home/power/powerUser' },
                        { name: '权限组', path: '/home/power/powerPowerGroup' },
                    ],
                }
            ],
            sidebarMenu2: [
                {
                    parentItem: { name: '内容管理' },
                    childItem: [
                        { name: '活动管理', path: '/home/contern/activity' },
                        { name: '任务管理', path: '/home/contern/task' },
                    ],
                },
                {
                    parentItem: { name: '用户管理' },
                    childItem: [
                        { name: '居民管理', path: '/home/community/organization' },
                        { name: '志愿队管理', path: '/home/community/personnel' },
                    ],
                },
                {
                    parentItem: { name: '权限管理' },
                    childItem: [
                        { name: '管理员', path: '/home/power/powerUser' },
                        { name: '权限组', path: '/home/power/powerPowerGroup' },
                    ],
                }
            ]
        }
    },
    methods: {
        handleOpen(key, keyPath) {
           	
        },
        handleClose(key, keyPath) {
            
        },
    },
    mounted() {
        if(sessionStorage.getItem("systemType")=='zonghoutai'){
            this.systemType = 1
        }else if(sessionStorage.getItem("systemType")=='shequ'){
            this.systemType = 2
        }

        //活动
        if(this.$route.path=='/home/contern/taskAdd'){
            this.defaultActive = '/home/contern/task'
        }
        //任务
        if(this.$route.path=='/home/contern/activityAdd'){
            this.defaultActive = '/home/contern/activity'
        }
        //垃圾分类
        if(this.$route.path=='/home/contern/garbageTypeAdd'){
            this.defaultActive = '/home/contern/garbageType'
        }
        //社区管理
        if(this.$route.path=='/home/community/organizationAdd'){
            this.defaultActive = '/home/community/organization'
        }
        //居民管理
        if(this.$route.path=='/home/community/personnel'){
            this.defaultActive = '/home/community/organization'
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
