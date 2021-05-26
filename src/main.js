import  './css/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './lib/rem.js';
import Axios from 'axios';
import {Icon} from 'vant';
router.beforeEach((to,from,next)=>{
    console.log(to);
    next();
})


router.afterEach((to) => {
    document.title = to.meta.title
})

const main = createApp(App);
main.use(Icon);
main.use(store);
main.use(router);
main.mount('#app');
