<template>
    <div class="header-container">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-user"/>
                    工作台
                </template>
                <el-menu-item index="2-1">设置</el-menu-item>
                <el-menu-item index="2-3" v-on:click="doExit()">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import session from '@/assets/js/session'
    export default {
        name: "ux-header",
        data() {
            return {

            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            doExit(){
                session.logout();
                window.location = "/";
            }
        }
    }
</script>

<style scoped>
    .header-container {
        display: flex;
        flex-direction: row;

    }

    .header-container .el-menu {
        padding: 0px 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
</style>