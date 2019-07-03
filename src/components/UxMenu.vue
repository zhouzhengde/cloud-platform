<template>
    <div v-bind:class="[isCollapse ? 'collapse' : 'expand']" height="100%" class="menu-container">
        <header class="header">
            <img src="../assets/images/logo.png">
        </header>
        <el-menu default-active="200202" class="el-menu-vertical-container" @open="handleOpen"
                 @close="handleClose"
                 :router="true"
                 :collapse="isCollapse">
            <!-- 第一层 -->
            <el-submenu v-for="item in menuList" v-if="item.nodeList != null && item.nodeList.length > 0"
                        v-bind:index="item.path">
                <template slot="title">
                    <i v-if="item.icon" v-bind:class="item.icon"></i>
                    <span slot="title">{{item.text}}</span>
                </template>

                <!-- 第二层 -->
                <el-submenu v-for="submenu in item.nodeList"
                            v-if="submenu.nodeList != null && submenu.nodeList.length > 0"
                            v-bind:index="submenu.path">
                    <template slot="title">
                        <i v-if="submenu.icon" v-bind:class="submenu.icon"></i>
                        <span slot="title">{{submenu.text}}</span>
                    </template>

                    <!-- 第三层 -->
                    <el-submenu v-for="thdmenu in submenu.nodeList"
                                v-if="thdmenu.nodeList != null && thdmenu.nodeList.length > 0"
                                v-bind:index="thdmenu.path">
                        <template slot="title">
                            <i v-if="thdmenu.icon" v-bind:class="thdmenu.icon"></i>
                            <span slot="title">{{thdmenu.text}}</span>
                        </template>
                    </el-submenu>
                    <el-menu-item v-else v-bind:index="thdmenu.path">
                        <i v-if="thdmenu.icon" v-bind:class="thdmenu.icon"></i>
                        <span slot="title">{{thdmenu.text}}</span>
                    </el-menu-item>

                </el-submenu>
                <el-menu-item v-else v-bind:index="submenu.path">
                    <i v-if="submenu.icon" v-bind:class="submenu.icon"></i>
                    <span slot="title">{{submenu.text}}</span>
                </el-menu-item>

            </el-submenu>
            <el-menu-item v-else v-bind:index="item.path">
                <i v-if="item.icon" v-bind:class="item.icon"></i>
                <span slot="title">{{item.text}}</span>
            </el-menu-item>
        </el-menu>
        <el-button class="el-menu-control-btn" v-on:click="handleCollapse()" title="收起/展开">
            <font-awesome-icon v-if="!isCollapse" :icon="['fas', 'compress-arrows-alt']"/>
            <font-awesome-icon v-else :icon="['fas', 'expand-arrows-alt']"/>
        </el-button>
    </div>
</template>

<script>

    import http from '@/assets/js/http.js'
    import $ from 'jquery'
    import url from '@/assets/js/url'

    let calc_height = function () {
        let total_height = $(window).height();
        let top_height = $(".menu-container .header").outerHeight();
        let bottom_height = $(".menu-container .el-menu-control-btn").outerHeight();
        let height = total_height - (top_height + bottom_height);
        $(".el-menu-vertical-container").height(height);
    };

    $(function () {
        calc_height();
    });

    $(window).resize(function () {
        calc_height();
    });

    export default {
        name: "ux-menu",
        data() {
            let vm = this;
            let obj = {
                isCollapse: true,
                menuList: []
            };
            let url = this.menu_url || url.SIDEBAR_MENU;
            http.ajax({
                url: url
            }).then(function (data) {
                obj.menuList = data;
            });
            return obj;
        },
        props: ['menu_url'],
        computed: {},
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
                calc_height();
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
                calc_height();
            },
            handleCollapse() {
                this.isCollapse = !this.isCollapse;
                calc_height();
            }
        }
    }

</script>

<style scoped>

    .menu-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .menu-container.collapse {
        width: 65px;
        animation: collapse_animate 0.07s;
    }

    .menu-container.expand {
        width: 250px;
        animation: expand_animate 0.7s;
    }

    @keyframes collapse_animate {
        from {
            width: 250px;
        }
        to {
            width: 65px;
        }
    }

    @keyframes expand_animate {
        0% {
            width: 65px;
        }
        50% {
            width: 65px;
        }
        100% {
            width: 250px;
        }
    }

    .menu-container .header {
        padding: 8px 0px 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        /*border-bottom: 1px solid #e6e6e6;*/
        /*border-right: 1px solid #e6e6e6;*/
        background: #ffffff;
    }

    .menu-container .header > img {
        height: 45px;
    }

    .menu-container .el-menu-vertical-container {
        overflow: scroll;
        height: 100%;
    }

    .menu-container .el-menu-control-btn {
        width: 100%;
        /*border-left-width: 0px;*/
        /*border-right-width: 0px;*/
        border: none;
        border-radius: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        margin: 0px;
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        color: #909399;
    }

    .menu-container .el-menu {
        /*border-right: none !important;*/
    }
</style>