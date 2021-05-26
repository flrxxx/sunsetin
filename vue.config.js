const path = require("path");
const webpack = require('webpack')
module.exports = {
    // publicPath:'./',
    publicPath:process.env.NODE_ENV=="production"?"/themes/simplicity/html/vue/sunsetin/":"/",
    lintOnSave:true,
    devServer: {
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
