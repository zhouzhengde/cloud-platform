<template>
    <el-container>
        <el-aside width="auto">
            <ux-menu v-bind:menu_url="menu_url"/>
        </el-aside>
        <el-container>
            <el-header height="60px">
                <ux-header/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer height="56px">
                Smart Design &copy; Copyright, All Rights Reserved.
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import $ from 'jquery'
    import UxMenu from "./UxMenu"
    import UxHeader from "@/components/UxHeader";

    export default {
        name: "ux-window",
        components: {UxHeader, UxMenu},
        data() {
            return {}
        },
        props: ['menu_url']
    }

    let calc_height = function () {
        let total_height = $(window).height();
        let top_height = $("#app .el-header").outerHeight();
        let bottom_height = $("#app .el-footer").outerHeight();
        let padding_top = parseInt($("#app .el-main").css("paddingTop"));
        let padding_bottom = parseInt($("#app .el-main").css("paddingBottom"));
        $("#app .el-main").height(total_height - (top_height + bottom_height + padding_top + padding_bottom));
    }

    $(function () {
        calc_height();
    });

    $(window).resize(function () {
        calc_height();
    });

</script>

<style scoped>
    aside {
        overflow: hidden;
    }

    header {
        /*border-bottom: 1px solid #e6e6e6;*/
        background: #ffffff;
        padding-left: 0px;
        padding-right: 0px;
    }

    main {
        /*box-shadow: 0 1px 4px 0 rgba(0,0,0,.08);*/
    }

    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #e6e6e6;
        background: #ffffff;
    }

</style>