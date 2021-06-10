import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home.vue'
import signup from '../views/signup.vue'
import my from '../views/my.vue'
import activitylist from '../views/activitylist'
import activitydetail from '../views/activityDetails'
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
            keepAlive: false,
        }
    }
]

const router = createRouter({
    history: createWebHistory('/sunsetin/'),
    routes,
})


export default router
