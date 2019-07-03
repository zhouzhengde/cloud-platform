<template>
    <ux-list-view v-bind:config="list"/>
</template>

<script>
    import UxListView from "@/components/UxListView";
    import Vue from 'vue';

    let $notify = Vue.prototype.$notify;

    export default {
        name: "User",
        components: {UxListView},
        data() {
            let config = {
                url: '/mock/user-list.json',
                method: 'GET',
                title: '用户列表',
                strip: false,
                initLoad: true,
                columns: [
                    {
                        label: "日期",
                        prop: "date",
                        sortable: false
                    },
                    {
                        label: "名称",
                        prop: "name",
                        sortable: false,
                        align: 'left'
                    }, {
                        label: "主键",
                        prop: "id",
                        sortable: false
                    }
                ],
                conditions: [
                    [
                        {
                            "label": "用户名2",
                            "model": "username",
                            "placeholder": "请指定",
                            "type": "text"
                        },
                        {
                            "label": "性别",
                            "model": "gender",
                            "placeholder": "请指定",
                            "type": "select",
                            "data": [
                                {"value": "1", "label": "男"},
                                {"value": "2", "label": "女"}
                            ]
                        }
                    ]
                    // [
                    //     {
                    //         "label": "职位",
                    //         "model": "position",
                    //         "type": "text"
                    //     }
                    // ]
                ],
                operations: [
                    {
                        "name": "新增",
                        "icon": "add",
                        "path": "/add",
                        "enable": true,
                    },
                    {
                        "name": "批量删除",
                        "icon": "delete_forever",
                        "path": "/add",
                        "enable": true,
                    },
                    {
                        "name": "刷新",
                        "icon": "refresh",
                        "path": "/add",
                        "enable": false,
                    }
                ],
                dataOperations: {
                    width: "200px",
                    data: [
                        {
                            "label": "编辑",
                            "icon": "edit",
                            "path": "/user/edit/{id}",
                            "enable": function (item) {
                                return item.id > 5;
                            }
                        },
                        {
                            "label": "删除",
                            "icon": "delete_forever",
                            "callback": function (item) {
                                Vue.prototype.$confirm("确认删除吗？id = " + item.id).then(function () {
                                    $notify.info("删除成功！");
                                }, function () {
                                    $notify.info("已经取消操作")
                                })
                            }
                        }
                    ]
                },
                methods: {}
            };

            return {
                list: config
            }
        }
    }
</script>

<style scoped>

</style>