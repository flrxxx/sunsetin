
import  './css/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './lib/rem.js';
import Axios from 'axios';
import {Icon,Dialog} from 'vant';
import vueMiniPlayer from 'vue-mini-player';
import 'vue-mini-player/lib/vue-mini-player.css';
import fifterUrl from './lib/filterUrl.js';
import qs from 'qs';

router.beforeEach((to,from,next)=>{

    // store.setTitlebar(to.meta.titlebar);
    // store.commit('setTitlebar',to.meta.titlebar)
    next();
})



var $http = Axios.create({
    baseURL: '/ajax_sunsetin',
    timeout: 0,  //请求超时时间
})

$http.interceptors.request.use(
    config => {
        if(fifterUrl.unbaseUrl.indexOf(config.url) >= 0){
            config.baseURL = '';
        }
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)

$http.interceptors.response.use((res) => {
    if(res.status == 200){
        if(res.data.res == 1){
            return res.data;
        }else if(res.data.res == 401){
            if(res.data.data.url){
                window.location.href = res.data.data.url + encodeURI(window.location.href);
            }else{
                Dialog.alert({
                    message:'登录状态已失效，请重新登录',
                }).then(() => {

                })
                return res.data;
            }

        }else{
            return res.data;
        }
    }else{
        if(fifterUrl.unErrorTip.indexOf(res.config.url) < 0){
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
    }
},(err)=>{
    if(fifterUrl.unErrorTip.indexOf(err.config.url) < 0) {
        Dialog.alert({
            message: '网络似乎有点问题，请检查您的网络连接，<br><span style="    ' +
                '    font-size: 0.75rem;\n' +
                '    color: #999;\n' +
                '    padding-top: 0.75rem;\n' +
                '    display: block;">ErrorCode：' + err.response.status + '</span>',
            confirmButtonText: '刷新',
            allowHtml: true,
        }).then(() => {
            window.location.reload(true);
        })
    }
})

const main = createApp(App);
main.config.globalProperties.$http = $http;
main.config.globalProperties.$IMGurl = window.IMGurl;
main.config.globalProperties.$android = window.android_app;
main.config.globalProperties.$ios = window.ios_app;
main.config.globalProperties.$qs = qs;
main.config.globalProperties.$cityid = window.cityid || '';
main.use(Icon);
main.use(store);
main.use(router);
main.use(vueMiniPlayer);
main.mount('#app');

var emtypfunction = function(){};

router.afterEach((to) => {
    try{
        store.commit('setTitlebar',to.meta.titlebar);
        document.title = to.meta.titlebar.title;
        if(window.android_app){
            window.LanCareWeb.showRightTextButton("", 'emtypfunction()',0);
        }else if(window.ios_app){
            window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'',funName:'emtypfunction()'});
        }



    }catch(err){

    }
})

export default main