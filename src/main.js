import  './css/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './lib/rem.js';
import Axios from 'axios';
import {Icon,Dialog} from 'vant';
router.beforeEach((to,from,next)=>{
    // store.setTitlebar(to.meta.titlebar);
    // store.commit('setTitlebar',to.meta.titlebar)
    next();
})

router.afterEach((to) => {
    try{
        store.commit('setTitlebar',to.meta.titlebar);
        document.title = to.meta.titlebar.title
    }catch(err){

    }
})

var $http = Axios.create({
    baseURL: '/ajax_sunsetin',
    timeout: 0,  //请求超时时间
})
$http.interceptors.response.use((res) => {
    if(res.status == 200){
        if(res.data.res == 1){
            return res.data;
        }else{
            return res.data;
        }
    }else{
        var text = '';
        if(res.data.msg){
            text  =  res.data.msg;
        }else{
            text ='网络似乎有点问题，请先检查您的网络连接'
        }
        Dialog.alert({
            message: text+'<br><span style="    ' +
                '    font-size:0.75rem;\n' +
                '    color: #999;\n' +
                '    padding-top: 0.75rem;\n' +
                '    display: block;">ErrorCode：'+res.status  + '</span>',
            confirmButtonText:'刷新',
        }).then(() => {
            window.location.reload(true);
        })
    }
},(err)=>{
    Dialog.alert({
        message: '网络似乎有点问题，请检查您的网络连接，<br><span style="    ' +
            '    font-size: 0.75rem;\n' +
            '    color: #999;\n' +
            '    padding-top: 0.75rem;\n' +
            '    display: block;">ErrorCode：'+err.response.status+'</span>',
        confirmButtonText:'刷新',
    }).then(() => {
        window.location.reload(true);
    })
})

const main = createApp(App);
main.config.globalProperties.$http = $http;
main.use(Icon);
main.use(store);
main.use(router);
main.mount('#app');
