<template>
    <div class="__survey">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            新增居民1
                            <span class="layui-badge layui-bg-blue layuiadmin-badge">周</span>
                            </div>
                            <div class="layui-card-body layuiadmin-card-list">
                            <p class="layuiadmin-big-font">9,999,666</p>
                            <p>
                                总计访问量 
                                <span class="layuiadmin-span-color">88万</span>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            活动数量
                            <span class="layui-badge layui-bg-blue layuiadmin-badge">周</span>
                            </div>
                            <div class="layui-card-body layuiadmin-card-list">
                            <p class="layuiadmin-big-font">9,999,666</p>
                            <p>
                                总计访问量 
                                <span class="layuiadmin-span-color">88万</span>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            任务数量
                            <span class="layui-badge layui-bg-blue layuiadmin-badge">周</span>
                            </div>
                            <div class="layui-card-body layuiadmin-card-list">
                            <p class="layuiadmin-big-font">9,999,666</p>
                            <p>
                                总计访问量 
                                <span class="layuiadmin-span-color">88万</span>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            发起积分
                            <span class="layui-badge layui-bg-blue layuiadmin-badge">周</span>
                            </div>
                            <div class="layui-card-body layuiadmin-card-list">
                            <p class="layuiadmin-big-font">9,999,666</p>
                            <p>
                                总计访问量 
                                <span class="layuiadmin-span-color">88万</span>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 15px;">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>新增用户</span>
                    </div>
                    <div class="addFromListBox">
                        <schart style="width: 100%; height: 500px;"
                            :width="canvas1.width"
                            :canvasId="canvas1.canvasId"
                            :type="canvas1.canvasType"
                            :data="canvas1.data"
                            :options="canvas1.options"
                        ></schart>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>新增社区</span>
                    </div>
                    <div class="addFromListBox">
                        <schart style="width: 100%; height: 500px;"
                            :canvasId="canvas2.canvasId"
                            :type="canvas2.canvasType"
                            :data="canvas2.data"
                            :options="canvas2.options"
                        ></schart>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    data() {
        return {
            canvas1: {
                canvasId: 'myCanvas1',
                canvasType: 'line',
                data: [
                    {name: '2014', value: 1342},
                    {name: '2015', value: 2123},
                    {name: '2016', value: 1654},
                    {name: '2017', value: 1795},
                ],
                options: {
                    padding: 50,                   // canvas 内边距
                    bgColor: '#FFFFFF',            // 默认背景颜色
                    title: '新增用户统计',// 图表标题
                    titleColor: '#000000',         // 图表标题颜色
                    titlePosition: 'top',      // 图表标题位置: top / bottom
                    yEqual: 5,                     // y轴分成5等分
                    fillColor: '#1E9FFF',          // 默认填充颜色
                    contentColor: '#eeeeee',       // 内容横线颜色
                    axisColor: '#666666',          // 坐标轴颜色
                    
                }
            },
            canvas2: {
                canvasId: 'myCanvas2',
                canvasType: 'line',
                data: [
                    {name: '2014', value: 1342},
                    {name: '2015', value: 2123},
                    {name: '2016', value: 1654},
                    {name: '2017', value: 1795},
                ],
                options: {
                    padding: 50,                   // canvas 内边距
                    bgColor: '#FFFFFF',            // 默认背景颜色
                    title: '新增社区统计',// 图表标题
                    titleColor: '#000000',         // 图表标题颜色
                    titlePosition: 'top',      // 图表标题位置: top / bottom
                    yEqual: 5,                     // y轴分成5等分
                    fillColor: '#1E9FFF',          // 默认填充颜色
                    contentColor: '#eeeeee',       // 内容横线颜色
                    axisColor: '#666666',          // 坐标轴颜色
                    
                }
            }
        }
    },
    components:{
        Schart
    }
}
</script>

<style lang="stylus">
.__survey {
    .layui-card {
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        .layui-card-header {
            position: relative;
            height: 42px;
            line-height: 42px;
            padding: 0 15px;
            border-bottom: 1px solid #f6f6f6;
            color: #333;
            border-radius: 2px 2px 0 0;
            font-size: 14px;
            .layui-badge {
                position: absolute;
                right: 15px;
                height: 18px;
                line-height: 18px;
                display: inline-block;
                padding: 0 6px;
                font-size: 12px;
                text-align: center;
                background-color: #FF5722;
                color: #fff;
                border-radius: 2px;
                background-color: #1E9FFF !important;
                top: 50%;
                margin-top: -9px;
            }
        }
        .layui-card-body {
            position: relative;
            padding: 15px;
            line-height: 24px;
            color: #666;
            .layuiadmin-big-font {
                font-size: 36px;
                color: #666;
                line-height: 36px;
                padding: 5px 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: nowrap;
            }
            p {
                color: #666;
                font-size 14px;
            }
            .layuiadmin-span-color {
                position: absolute;
                right: 15px;
            }
        }
    }
}
</style>
