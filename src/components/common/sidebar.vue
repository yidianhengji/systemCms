<template>
    <div class="__sidebar">
        <el-row class="tac">
            <el-col>
                <el-menu
                default-active="0"
                class="el-menu-vertical-demo"
                :default-openeds="openeds"
                @open="handleOpen"
                @close="handleClose"
                :unique-opened="uniqueOpened"
                :router="openedRouter"
                background-color="#20222a"
                text-color="#fff"
                active-text-color="#fff">
                    <el-submenu v-for="(item,index) in sidebarMenu" :key="index" :index="''+(index+1)">
                        <template slot="title">
                            <i :class="item.parentItem.icon"></i>
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
            uniqueOpened: true,
            openedRouter: true,
            openeds: ['1'],
            sidebarMenu: [
                {
                    parentItem: { name: '内容管理', icon: 'el-icon-location' },
                    childItem: [
                        { name: '文章管理', path: '/home/contern/article' },
                        { name: '栏目管理', path: '/home/contern/column' },
                        { name: '活动管理', path: '/home/contern/activity' },
                        { name: '任务管理', path: '/home/contern/task' },
                        //{ name: '垃圾分类', path: '/home/contern/article' },
                        { name: '公告管理', path: '/home/contern/notice' },
                    ],
                },
                {
                    parentItem: { name: '内容管理', icon: 'el-icon-location' },
                    childItem: [
                        { name: '文章管理', path: '/home/contern/article' },
                        { name: '栏目管理', path: '/home/contern/column' },
                        { name: '活动管理', path: '/home/contern/activity' },
                        { name: '任务管理', path: '/home/contern/task' },
                        { name: '垃圾分类', path: '/home/contern/article' },
                        { name: '公告管理', path: '/home/contern/notice' },
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
