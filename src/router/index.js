import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home.vue'
import signup from '../views/signup.vue'
import my from '../views/my.vue'
import activitylist from '../views/activitylist'
import activitydetail from '../views/activityDetails'
import testvideo from '../views/testvideo'
import activityEnroll_list from '../views/activityEnroll_list'
import activity_notice from '../views/activity_notice'
import activity_detail from '../views/activity_detail'
import bmpage from '../views/bmpage'
import itempage from '../views/itempage'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            titlebar:{
                title:'活动列表',
            },
            keepAlive: true,
        },
    },
    {
        path:'/activityEnroll_list',
        name:'activityEnroll_list',
        component: activityEnroll_list,
        meta: {
            titlebar:{
                title:'报名活动',
            },
            keepAlive: true,
        },
    },
    {
        path:'/itempage',
        name:'itempage',
        component: itempage,
        meta: {
            titlebar:{
                title:'报名活动',
            },
            keepAlive: true,
        },
    },
    {
        path:'/activity_detail',
        name:'activity_detail',
        component: activity_detail,
        meta: {
            titlebar:{
                title:'报名活动',
            },
            keepAlive: true,
        },
    },
    {
        path:'/bmpage',
        name:'bmpage',
        component: bmpage,
        meta: {
            titlebar:{
                title:'报名活动',
            },
            keepAlive: true,
        },
    },
    {
        path:'/activity_notice',
        name:'activity_notice',
        component: activity_notice,
        meta: {
            titlebar:{
                title:'活动通知',
            },
        },
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup,
        meta: {
            title: '报名',
            keepAlive: false,
        }
    },
    {
        path: '/my',
        name: 'my',
        component: my,
        meta: {
            title: '我的',
            keepAlive: false,
        }
    },
    {
        path: '/activitylist',
        name: 'activitylist',
        component: activitylist,
        meta: {
            titlebar:{
                title:'节目列表',
            },
            keepAlive: true,
        }
    },{
        path: '/activitydetail',
        name: 'activitydetail',
        component: activitydetail,
        meta: {
            titlebar:{
                title:'节目详情',
            },
            keepAlive: true,
        }
    },
    {
        path: '/testvideo',
        name: 'testvideo',
        component: testvideo,
        meta: {
            titlebar:{
                title:'节目详情',
            },
            keepAlive: false,
        }
    }
]

const router = createRouter({
    history: createWebHistory('/sunsetin/'),
    routes,
})


export default router
