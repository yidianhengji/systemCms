<template>
    <div class="__login">
        <div class="main">
            <div class="main-header">
                <h2>后台管理系统</h2>
            </div>
            <div class="main-contern">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                    <el-form-item prop="name">
                        <el-input type="text" placeholder="请输入账号" prefix-icon="fa fa-user-o" v-model="ruleForm2.name">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" placeholder="请输入密码" prefix-icon="fa fa-key" v-model="ruleForm2.pass" @keyup.enter.native="submitForm('ruleForm2')">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { getCookie, setCookie } from "@/util/cookie";
import { login } from "api/login/index";
export default {
    data() {
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请输入账号"));
            }
            setTimeout(() => {
                callback();
            }, 100);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            setTimeout(() => {
                callback();
            }, 100);
        };
        return {
            ruleForm2: {
                pass: "",
                name: ""
            },
            rules2: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                name: [{ validator: validateName, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        mobile: this.ruleForm2.name,
                        password: this.ruleForm2.pass,
                        loginType: '1',
                    };
                    login(params).then(response => {
                        if (response.data.code == 200) {
                            const loading = this.$loading({
                                lock: true,
                                text: '正在登陆系统中，请等候。',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            setTimeout(() => {
                                loading.close();
                                sessionStorage.setItem("userData", JSON.stringify(response.data.data));
                                sessionStorage.setItem("communityId", response.data.data.communityId);
                                sessionStorage.setItem("systemType", '1');
                                this.$router.push({ path: '/home/zhtSurvey' });
                            }, 1000);
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="stylus">
.__login {
    padding: 110px 0;
    .main {
        width: 375px;
        margin: 0 auto;
        box-sizing: border-box;
        .main-header {
            text-align: center;
            h2 {
                margin-bottom: 10px;
                font-weight: 300;
                font-size: 26px;
                color: #000;
            }
            p {
                font-weight: 300;
                color: #999;
            }
        }
        .main-contern {
            margin-top: 40px;
            padding: 0 20px;
        }
    }
}
</style>
