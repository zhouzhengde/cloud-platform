<template>
    <div class="login">
        <div class="input_panel">
            <h3>Smart Design easy for you</h3>
            <el-form ref="form" :model="user" label-width="80px" label-position="top">
                <el-form-item label="用户名">
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-button style="width: 100%; margin-top: 10px " type="primary" @click="doLogin()">登入</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import session from '@/assets/js/session';
    import http from '@/assets/js/http';
    import url from '@/assets/js/url';

    export default {
        name: 'login',
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            doLogin: function () {
                let self = this;
                http.ajax({
                    url: url.LOGIN,
                    method: 'GET'
                }).then(function (data) {
                    // debugger
                    session.setUserInfo(data);
                    window.location = "/";
                }).catch(function () {
                    session.logout();
                });
            }
        }
    }

    let calc_height = function () {
        let total_height = $(window).height();
        $(".login").height(total_height);
    };

    $(function () {
        calc_height();
    });

    $(window).resize(function () {
        calc_height();
    });

</script>

<style scoped>
    .login {
        width: 100%;
        margin: 0;
        background: url("../assets/images/login_bg.jpg") no-repeat 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /*background: #7dd1ff;*/
    }

    .input_panel {
        width: 400px;
        background: rgba(20, 20, 20, 0.3);
        border-radius: 5px;
        border-color: #f3f3f3;
        box-shadow: 0 0 5px #333;
        padding: 0px;
    }

    .input_panel > h3 {
        display: flex;
        letter-spacing: 1px;
        font-family: "Helvetica Neue", Helvetica, "Microsoft YaHei", Arial, sans-serif;
        /*border-bottom: 1px solid #c3c3c3;*/
        height: 70px;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 20px;
        color: #ffffff;
    }

    .input_panel > form {
        padding: 10px 20px 20px;
    }

</style>
