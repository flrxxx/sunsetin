const path = require("path");
const webpack = require('webpack');
module.exports = {
    chainWebpack: config =>{
        config.plugin('html')
            .tap(args => {
                args[0].title = "绽放夕阳";
                return args;
            })
    },
    // publicPath:'./',
    outputDir:"../../../../vue/sunsetin",
    publicPath:process.env.NODE_ENV=="production"?"/themes/simplicity/html/vue/sunsetin/":"/",
    lintOnSave:true,
    devServer: {
        proxy: {
            "/ajax_sunsetin": {
                target: 'http://d.zhangjinkai.com',
                changeOrigin: true, // 是否改变域名
                ws: true,
                cookieDomainRewrite: {
                    'zhangjinkai.com': 'localhost'
                }
            },
            "/ajax_sunsetview":{
                target: 'http://d.zhangjinkai.com',
                changeOrigin: true, // 是否改变域名
                ws: true,
                cookieDomainRewrite: {
                    'zhangjinkai.com': 'localhost'
                }
            },
            "/ajax_wechatshare":{
                target: 'http://d.zhangjinkai.com',
                changeOrigin: true, // 是否改变域名
                ws: true,
                cookieDomainRewrite: {
                    'zhangjinkai.com': 'localhost'
                }
            }
        },
        overlay: {
            warning: false,
            errors: false
        },
    },
    css:{
        loaderOptions: {
            less:{
                modifyVars:{}
            },
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 16,
                        propList: ['*'],
                    })
                ]
            }
        }
    },

}
