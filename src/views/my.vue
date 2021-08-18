<template>
    <div class="content">
        <div class="mypage">
            <div class="userbox">
                <div class="userlines" @click="changeinfo">
                    <div class="userhead">
                        <van-image :src="userinfo.userhead">
                            <template v-slot:error><van-icon name="photo-fail" /></template>
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                    </div>
                    <div class="userinfo">
                        <div class="userline">
                            <div class="username">{{userinfo.username}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="itembox" v-for="(item,index) in navitem" :key="index">
                <div class="itemline" v-for="(child,dndex) in item" :key="dndex" @click="jump(child)">
                    <div class="itemline_texticon">
                        <i class="itemline_icon" v-html="child.icon"></i>
                        <div class="itemline_text" v-html="child.name"></div>
                    </div>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <footerbar></footerbar>
    </div>
</template>

<script>
import footerbar from '@/components/footerbar.vue';
import {Loading, Skeleton, Lazyload, Image as VanImage} from 'vant';
export default {
    name: "my",
    components:{
        footerbar,
        [Loading.name]:Loading,
        [Lazyload.name]:Lazyload,
        [VanImage.name]:VanImage,
    },
    data(){
        return {
            userinfo:{
                userhead:'',
                username:'',
                userid:''
            },
            navitem:[
                [
                    {
                        icon:'<i class="elderlyicon-shenhe"></i>',
                        path:'/my_examine',
                        name:'报名作品审核',
                        needvip:2
                    },
                    {
                        icon:'<i class="elderlyicon-zuopin"></i>',
                        path:'/my_works',
                        name:'我的作品'
                    },
                    {
                        icon:'<i class="elderlyicon-shoucang"></i>',
                        path:'/my_collection',
                        name:'我的收藏'
                    },
                    {
                        icon:'<i class="elderlyicon-zan"></i>',
                        path:'/my_comment',
                        query:{
                            tab:1,
                        },
                        name:'我的点赞'
                    },
                    {
                        icon:'<i class="elderlyicon-pinglun1"></i>',
                        path:'/my_comment',
                        query:{
                            tab:2,
                        },
                        name:'我的评论'
                    },
                ]
            ]
        }
    },
    methods:{
        jump:function(link){
            if(link.query){
                this.$router.push({path:link.path,query:{tab:link.query.tab}});
            }else{
                this.$router.push({path:link.path});
            }
        },
    },
    created(){
        this.$http.post('/tab:my_base').then((data)=>{
            if(data.res == 1){
                this.userinfo.userhead = data.data.avatar;
                this.userinfo.username = data.data.fullname;
                this.userinfo.userid = data.data.id;
            }
        })
    },
    activated() {
        if(this.$android){
            window.LanCareWeb.showRightTextButton("", 'emtypfunction()',0);
        }else if(this.$ios){
            window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'',funName:'emtypfunction()'});
        }
    },
}
</script>

<style scoped lang="less">
    .userbox{
        display: flex;
        align-items: center;
        padding:0px 15px;
        background-size: contain;
        background-image:url('../images/userbanner.jpg');
        border-bottom:12px solid #f9fafc;
        height: 106px;
        .userlines{
            display: flex;
            align-items: center;
            flex: 1 0 auto;
            .userhead{
                flex:0 0 auto;
                width: 60px;
                height: 60px;
                overflow: hidden;
                border-radius: 40px;
                margin-right: 16px;
                /deep/ .van-image{
                    width: 100%;
                    height: 100%;
                }
                /deep/ .van-icon{
                    font-size: 32px;
                    color:#dcdee0;
                }
            }
            .rightbtn{
                display: flex;
                align-items: center;
                flex:0 0 auto;
                white-space: nowrap;
                .rightbtntext{
                    font-size: 14px;
                    color:#999;
                    height: 16px;
                    line-height: 16px;
                }
            }
            .userinfo{
                flex: 1 0 auto;
                width: 0;
                .userline{
                    display: flex;
                    align-items: center;
                    .username{
                        max-width: 120px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 20px;
                        font-size: 14px;
                        line-height: 20px;
                        margin-right: 8px;
                        color:#fff;
                    }
                    .vipicon{
                        flex: 0 0 auto;
                        width: 32px;
                        height: 16px;
                        overflow: hidden;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(270deg, #FFAB64 0%, #FF7238 100%);
                        i.svip{
                            color: #fff;
                            line-height: normal;
                            font-size: 36px;
                        }
                        i.vip{
                            color: #fff;
                            line-height: normal;
                            font-size: 26px;
                        }
                    }
                }
            }
        }
    }
    .itembox{
        padding: 0 15px;
        border-bottom:12px solid #f9fafc;
        .itemline:last-child{
            border-bottom:none;
        }
        .itemline{
            display: flex;
            align-items: center;
            padding: 10px 0;
            display: flex;
            align-items: center;
            border-bottom:1px solid #e6e6e6;
            .itemline_texticon{
                display: flex;
                align-items: center;
                flex:1 0 auto;
                .itemline_icon{
                    width: 24px;
                    height: 24px;
                    flex:0 0 auto;
                    margin-right: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #2395ff;
                    background: -moz-linear-gradient(180deg, #1d93fd 0%, #7ec6ee 100%);
                    background: -webkit-gradient(linear,  top,  buttom, color-stop(0%, #1d93fd), color-stop(100%, #7ec6ee));
                    background: -webkit-linear-gradient(180deg, #1d93fd 0%, #7ec6ee 100%);
                    background: -o-linear-gradient(180deg, #1d93fd 0%, #7ec6ee 100%);
                    background: -ms-linear-gradient(180deg, #1d93fd 0%, #7ec6ee 100%);
                    background: linear-gradient(180deg, #1d93fd 0%, #7ec6ee 100%);
                    border-radius: 12px;
                    color:#fff;
                    /deep/ i{
                        font-size: 14px;
                    }
                    /deep/ .icon{
                        width: 28px;
                        height: 28px;

                    }
                }
            }
            .itemline_text{
                height: 16px;
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                line-height: 16px;
                flex:1 0 auto;
                display: flex;
                align-items: center;
                /deep/ .svipicon{
                    flex: 0 0 auto;
                    width: 32px;
                    height: 16px;
                    overflow: hidden;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(270deg, #FFAB64 0%, #FF7238 100%);
                    margin-left: 15px;
                    i.svip{
                        color: #fff;
                        line-height: normal;
                        font-size: 36px;
                    }
                }
            }
            /deep/ .van-icon{
                font-size: 20px;
                color:#999;
            }
        }
    }
</style>