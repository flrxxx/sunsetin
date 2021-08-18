import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home.vue'
import signup from '../views/signup.vue'
import my from '../views/my.vue'
import activitylist from '../views/activitylist'
import activityhdlist from '../views/activity_hdlist'
import activitydetail from '../views/activityDetails'
import testvideo from '../views/testvideo'
import activityEnroll_list from '../views/activityEnroll_list'
import my_works from '../views/my_works.vue' //我的作品
import my_collection from '../views/my_collection.vue' //我的收藏
import my_comment from '../views/my_comment.vue' //点赞收藏
import my_examine from '../views/my_examine.vue' //报名作品审核
import activity_notice from '../views/activity_notice'
import notice from '../views/notice'
import activity_detail from '../views/activity_detail'
import bmpage from '../views/bmpage'
import itempage from '../views/itempage'
import activity_notice_detail from '../views/activity_notice_detail'
const routes = [
    {
        path: "/:pathMatch(.*)*",
        redirect: { path: 'activityindex' }
    },
    {
        path: '/activityindex',
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
        path:'/notice',
        name:'Notice',
        component: notice,
        children:[{
            path:'',
            name:'Activity_notice',
            component: activity_notice,
            meta: {
                titlebar:{
                    title:'活动通知',
                },
                keepAlive: true,
            },
        }, {
            path:'detail',
            name:'Activity_notice_detail',
            component: activity_notice_detail,
            meta: {
                titlebar:{
                    title:'通知详情',
                },
            },
        }]
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
        name: 'activity_hdlist',
        component:activityhdlist,
        children:[{
            path: 'activitydetail',
            name: 'Activitydetail',
            component: activitydetail,
            meta: {
                titlebar:{
                    title:'节目详情',
                },
                keepAlive: false,
            }
        },{
            path:'',
            name:'Activitylist',
            meta: {
                titlebar:{
                    title:'节目列表',
                },
                keepAlive: true,
            },
            component: activitylist,
        }]
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
    },
    {
        path: '/my_collection',
        name: 'my_collection',
        component: my_collection,
        meta: {
            titlebar:{
                title:'我的收藏',
                righttext:'编辑',
            },
            keepAlive: false,
        }
    },
    {
        path: '/my_works',
        name: 'my_works',
        component: my_works,
        meta: {
            titlebar:{
                title:'我的作品',
                //righttext:'编辑',
            },
            keepAlive: false,
        }
    },
    {
        path: '/my_comment',
        name: 'my_comment',
        component: my_comment,
        meta: {
            titlebar:{
                title:'我的点赞/评论',
                righttext:'编辑',
            },
            keepAlive: false,
        }
    },
    {
        path: '/my_examine',
        name: 'my_examine',
        component: my_examine,
        meta: {
            titlebar:{
                title:'报名作品审核',
            },
            keepAlive: false,
        }
    },
]

const router = createRouter({
    history: createWebHistory('/sunsetin/'),
    routes,
})


export default router
