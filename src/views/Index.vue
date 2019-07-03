<template>
    <div class="index container">
        <div class="panel">
            <el-tabs active-name="default">
                <el-tab-pane label="用户管理" name="default" class="list-container">
                    <el-form class="form-container" ref="form" :model="condition"
                             label-position="left">
                        <el-form-item>
                            <el-input class="form-control" v-model="condition.username" placeholder="请输入用户姓名">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <el-select class="form-control" v-model="condition.roleId" placeholder="请选择用户角色">
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="普通用户" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="opt-container">
                            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
                            <el-button type="danger" icon="el-icon-delete">删除</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table class="table-container"
                              height="250"
                              stripe
                              border
                              highlight-current-row
                              :data="tableData">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination-container"
                                   background
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage4"
                                   :page-sizes="[10, 20, 50, 100]"
                                   :page-size="10"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="400">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input class="form-control" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select class="form-control"  v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import http from "@/assets/js/http";
    import $ from 'jquery';
    import Vue from 'vue';
    import {} from 'element-ui'

    let calc_height = function () {
        let total_height = $('.container .panel').height();
        let top_height = $(".container .panel .list-container .form-container").outerHeight();
        let bottom_height = $(".container .panel .list-container .pagination-container").outerHeight();
        let table_header_height = $(".container .panel .list-container .el-table__header-wrapper").outerHeight();
        let tabs_header_height = $(".container .panel .list-container .form-container .el-tabs__header").outerHeight() || 55;
        let height = total_height - (top_height + bottom_height + table_header_height + tabs_header_height);
        $(".container .panel .list-container .el-table__body-wrapper").height(height);
    };

    $(function () {
        calc_height();
    });

    $(window).resize(function () {
        calc_height();
    });


    export default {
        name: 'index',
        components: {},
        data() {

            let $data = {
                tableData: null,
                condition: {},
                form:{},
                dialogFormVisible: false,
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4
            };

            http.ajax({
                url: '/mock/user-list.json'
            }).then(function (data) {
                $data.tableData = data;
            }).catch(function (data) {

            });
            return $data;
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            doSearch() {

            }
        }
    }


</script>

<style scoped>
    .container {
        background: #ffffff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .13);
        height: 100%;
        display: flex;
    }

    .panel {
        width: 100%;
        padding: 20px;
        display: flex;
        overflow: scroll;
        flex-direction: column;
    }

    .panel > div {
        /*overflow: scroll;*/
    }

    .list-container {
        display: flex;
        flex-direction: column;
    }

    .form-container .el-form-item {
        margin: 0px;
        padding: 10px 0px;
    }

    .form-container .el-form-item:last-child {
        padding-bottom: 20px;
    }

    .table-container {
        /*border-top: 1px solid #e6e6e6;*/
    }

    .el-form-item.opt-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .el-form-item .form-control {
        width: 240px;
        margin-right: 10px;
    }

    .el-form-item .el-input:last-child {
        margin-right: 0px;
    }

    .pagination-container {
        padding: 20px 0px 0px;
        display: flex;
        align-items: center;
    }
</style>
