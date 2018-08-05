<template>
    <div class="__header">
        <ul class="right">
            <li>
                <a href="javascript:void(0);" class="userBox">
                    <img v-if="headPic!=''" src="../../assets/img/user.png" alt="">
                    <img v-else :src="headPic" alt="">
                    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </a>
            </li>
            <li>
                <a href="javascript:void(0);" class="signOut" @click="signOut">
                    <img src="../../assets/img/out.png" alt=""> 退出
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { signOut } from "api/login/index";
export default {
    data(){
        return {
            userName: '用户名',
            headPic: ''
        }
    },
    mounted(){
        var userData = JSON.parse(sessionStorage.getItem("userData"));
        //判断头像
        this.headPic = userData.headPic;
        //判断姓名
		if(userData.truename!=null){
            this.userName = userData.truename
		}else if(userData.nickname!=null){
            this.userName = userData.nickname
        }
    },
    methods: {
        signOut(){
            this.$confirm('是否退出该系统?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                signOut().then(response => {
                    if (response.data.code == 200) {
                        const loading = this.$loading({
                            lock: true,
                            text: '正在登陆系统中，请等候。',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                            this.$router.push({ path: '/zhtLogin' });
                        }, 500);
                    }
                });
            }).catch(() => {
                
            });
            
        }
    }
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
            padding 0 15px;
            transition: all .3s;
            -webkit-transition: all .3s;
            border-top 2px solid transparent
            a {
                color #333;
                font-size 14px;
                transition: all .3s;
                -webkit-transition: all .3s;
            }
            .userBox {
                img {
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                    margin-top: -4px;
                    border-radius: 50%;
                }
            }
            .signOut {
                img {
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                    margin-top: -2px;
                    border-radius: 50%;
                }
            }
        }
        li:hover {
            border-top 2px solid #1E9FFF
        }
    }
}
</style>
