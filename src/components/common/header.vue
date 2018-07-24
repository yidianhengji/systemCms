<template>
    <div class="__header">
        <div class="left">
            <i class="el-icon-d-arrow-left"></i>
        </div>
        <ul class="right">
            <li>
                <a href="javascript:void(0);">
                    admin<i class="el-icon-arrow-down el-icon--right"></i>
                </a>
            </li>
            <li>
                <a href="javascript:void(0);">
                    退出
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.__header {
    position relative
    .left {
        position absolute;
        left 220px;
        line-height 50px;
        width 50px;
        text-align center;
    }
    .right {
        position absolute
        right 0px;
        box-sizing: border-box;
        li {
            height: 48px;
            line-height: 48px;
            position: relative;
            display: inline-block;
            vertical-align: middle;
            padding 0 20px;
            transition: all .3s;
            -webkit-transition: all .3s;
            border-top 2px solid transparent
            a {
                color #333;
                font-size 14px;
                transition: all .3s;
                -webkit-transition: all .3s;
            }
        }
        li:hover {
            border-top 2px solid #1E9FFF
        }
    }
}
</style>
