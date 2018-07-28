<template>
    <div class="__login">
        <div class="main">
            <div class="main-header">
                <h2>后台管理系统</h2>
            </div>
            <div class="main-contern">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                    <el-form-item prop="name">
                        <el-input
                            placeholder="请输入账号"
                            prefix-icon="fa fa-user-o"
                            v-model="ruleForm2.name">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input
                            placeholder="请输入密码"
                            prefix-icon="fa fa-key"
                            v-model="ruleForm2.pass">
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
                    this.$router.push({ path: '/home/survey' });
                    // let params = {
                    //     userName:this.ruleForm2.name,
                    //     passWord:this.ruleForm2.pass,
                    // };
                    // login(params).then(response => {
                    //     if(response.data.status==200){
                    //         let expireDays = 1000 * 60 * 60;
                    //         setCookie("user_id",response.data.data.user_id,expireDays);
                    //         this.$router.push({ path: '/home/resident' });
                    //     }else {
                    //         this.$alert(response.data.msg, '温馨提示', {
                    //             confirmButtonText: '确定',
                    //             callback: action => {}
                    //         });
                    //     }
                    // })
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
