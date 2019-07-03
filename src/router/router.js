import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import User from "@/views/User";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'default',
            component: Index
        }, {
            path: '/index',
            name: 'index',
            component: Index
        }, {
            path: '/system/user',
            name: 'system_user',
            component: User
        }
    ]
})
