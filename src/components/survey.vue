<template>
    <div class="__survey">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            新增居民
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
    </div>
</template>

<script>
export default {

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
