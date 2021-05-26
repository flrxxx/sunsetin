<template>
    <div class="content">
        <div class="tabbox">
            <div class="tabitem"  v-for="item in tabsnav" :key="item.type" :class="selectdtab == item.type ? 'active' :''" @click="changetabs(item.type)">
                <div class="activebg">
                    <div class="itemtext">{{item.name}}</div>
                    <svg class="activebgsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 426" style="enable-background:new 0 0 1920 426;" xml:space="preserve">
                        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="960" y1="32.0914" x2="960" y2="369.7218"><stop offset="0" style="stop-color:#FFFFFF"/><stop offset="1" style="stop-color:#F2F6F9"/></linearGradient>
                        <path class="st0" d="M182.07,426c78.91,0,142.88-64.17,142.88-143.33V143.51c0-79.16,63.97-143.33,142.88-143.33h1002.17c78.91,0,142.88,64.17,142.88,143.33v139.16c0,79.16,46.12,143.33,125.04,143.33H182.07z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="cardlist" ref="list"  @scroll.passive="isScroll && scrollEvent($event)">

            <div class="carditem" @click="navigate(item)" v-for="item in activity" :key="item.id">
                <div class="card_title">{{item.title}}</div>
                <div class="card_line"><i class="icons elderlyicon-shijian"></i><div class="text">活动时间：{{item.time}}</div></div>
                <div class="card_img">
                    <div class="card_type" :class="item.vote"><i class="icons"></i></div>
                    <img :src="item.avatar">
                </div>
                <div class="card_foot">
                    <div class="textbox">
                        <label>浏览量：</label>
                        <div class="text">{{ item.checknum }}</div>
                    </div>
                    <div class="textbox">
                        <label>举办城市：</label>
                        <div class="text">{{ item.city }}</div>
                    </div>
                </div>
            </div>
            <drup_up :loadingtype="loadingtype" :errorClick="errorClick" />
        </div>
        <footerbar></footerbar>
    </div>
</template>

<script>
    import {defineComponent} from 'vue';
    import drup_up from '@/components/drup_up.vue';
    import footerbar from '@/components/footerbar.vue';
    import { Dialog,Toast} from 'vant';
    export default defineComponent({
        name: "home",
        components:{
            footerbar,
            drup_up,
            [Dialog.Component.name]: Dialog.Component,
            [Toast.name]:Toast,
        },
        data(){
            return {
                isScroll :false,
                selectdtab:1,
                tabsnav:[
                    {
                        type:1,
                        name:'正在投票'
                    },
                    {
                        type:2,
                        name:'往期回顾'
                    }
                ],
                loaddata : true,
                dataloading:true,
                activity:[],
                currentPage : 1,
                pageSize:5,
                loadingtype:'none',
                scrollTop:0,
            }
        },
        methods:{
            navigate:function(obj){
                this.$store.commit('saveActivity',obj);
                this.$router.push({path:'/activitylist'});
            },
            changetabs:function(id){
                this.selectdtab = id;
            },
            scrollEvent:function(e){
                this.scrollTop = e.srcElement.scrollTop;
                if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-100){
                    this.loadMore(); //加载更多
                }
            },
            loadMore:function(){
                if(this.loaddata){
                    this.loaddata = false;
                    this.currentPage += 1;
                    this.getData({tab:this.selectdtab,currentPage:this.currentPage});
                }
            },
            errorClick:function(){
                this.loadingtype = 'loading';
                this.isScroll = true;
                this.loaddata = false;
                this.getData({tab:this.selectdtab,currentPage:this.currentPage});
            },
            getData:function(page){
                var data = [
                    {
                        id:1,
                        title:'全国中老年人“好声音”选拔大赛',
                        time:'2020-12-1  ~  2020-12-30',
                        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                        type:'1',
                        checknum:'6987',
                        city:'沈阳'
                    },
                    {
                        id:2,
                        title:'全国中老年人“好声音”选拔大赛',
                        time:'2020-12-1  ~  2020-12-30',
                        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                        type:'1',
                        checknum:'6987',
                        city:'沈阳'
                    },
                    {
                        id:3,
                        title:'全国中老年人“好声音”选拔大赛',
                        time:'2020-12-1  ~  2020-12-30',
                        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                        type:'1',
                        checknum:'6987',
                        city:'沈阳'
                    },
                    {
                        id:4,
                        title:'全国中老年人“好声音”选拔大赛',
                        time:'2020-12-1  ~  2020-12-30',
                        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                        type:'1',
                        checknum:'6987',
                        city:'沈阳'
                    },
                    {
                        id:5,
                        title:'全国中老年人“好声音”选拔大赛',
                        time:'2020-12-1  ~  2020-12-30',
                        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                        type:'1',
                        checknum:'6987',
                        city:'沈阳'
                    },
                    {
                        id:6,
                        title:'全国中老年人“好声音”选拔大赛',
                        time:'2020-12-1  ~  2020-12-30',
                        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                        type:'0',
                        checknum:'6987',
                        city:'沈阳'
                    }
                ];
                data.filter(function(item){
                    if(item.type == '1'){
                        item.vote = 'isnow'
                    }else{
                        item.vote = 'ispass'
                    }
                    return item;
                })

                if(this.currentPage == 1){
                    this.activity= data;
                }else{
                    this.activity = this.activity.concat(data);
                }

                if(data.length >= this.pageSize){
                    this.loaddata = true;
                    this.loadingtype = 'loading';
                    this.isScroll = true;
                }
            }
        },
        created: function () {
        },
        mounted: function () {
            this.getData();
        },
        activated: function () {
            this.$refs.list.scrollTop = this.scrollTop;
        },
        deactivated: function () {
        }

    })
</script>

<style scoped lang="less">
    .st0{fill:url(#SVGID_1_);}
    .content {
        .tabbox{
            display: flex;
            align-items: center;
            background: #ff6050;
            background: -moz-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ff6050), color-stop(100%, #dd2b45));
            background: -webkit-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: -o-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: -ms-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            .tabitem{
                flex:1 0 auto;
                width: 50%;
                position: relative;
                text-align: center;
                height: 41px;
                z-index: 10;
                &.active{
                    .itemtext {
                        color: #dd2b45
                    }
                    .activebg .activebgsvg{
                        visibility: inherit;
                    }
                }
                .itemtext{
                    position: absolute;
                    top:0;
                    left: 0;
                    right: 0;
                    bottom:0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    color:#fff;
                }
                .activebg{
                    position: absolute;
                    padding-top: 22.18%;
                    left: 0;
                    right: 0;
                    bottom:0px;
                    .activebgsvg{
                        visibility: hidden;
                        position: absolute;
                        bottom:0;
                        left: 0;
                        right: 0;
                    }
                }
            }
        }
        .cardlist {
            background-color: #f1f5f9;
            padding:11px 11px 11px;
            flex: 1 0 auto;
            height: 0;
            overflow-y: auto;
            .carditem {
                background-color: #fff;
                border-radius: 10px;
                padding: 11px;
                margin-bottom:11px;
                .card_title {
                    font-size: 16px;
                    color: #111;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    margin-bottom: 10px;
                }
                .card_line {
                    display: flex;
                    align-items: center;
                    margin-bottom: 9px;

                    .icons {
                        width: 12px;
                        height: 12px;
                        font-size: 12px;
                        line-height: 12px;
                        margin-right: 5px;
                        flex: 0 0 auto;
                        color: #666;
                    }

                    .text {
                        flex: 1 0 auto;
                        font-size: 12px;
                        color: #666;
                        line-height: 12px;
                    }
                }
            }

            .card_img {
                display: block;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                margin-bottom: 11px;

                .card_type {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 10px;
                    border-radius: 10px;

                    .icons {
                        font-size: 60px;
                        color: #fff;
                    }

                    &.isnow {
                        background: #d73154;
                        background: -moz-linear-gradient(90deg, #d73154 0%, #ff6050 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, #d73154), color-stop(100%, #ff6050));
                        background: -webkit-linear-gradient(90deg, #d73154 0%, #ff6050 100%);
                        background: -o-linear-gradient(90deg, #d73154 0%, #ff6050 100%);
                        background: -ms-linear-gradient(90deg, #d73154 0%, #ff6050 100%);
                        background: linear-gradient(90deg, #d73154 0%, #ff6050 100%);
                        .icons:before{
                            content:'\e7ec'
                        }
                    }
                    &.ispass{
                        background: rgba(7,133,253,1);
                        background: -moz-linear-gradient(90deg,rgba(0,167,255,1) 0%, rgba(7,133,253,1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,167,255,1)), color-stop(100%,rgba(7,133,253,1)));
                        background: -webkit-linear-gradient(90deg, rgba(0,167,255,1) 0%,rgba(7,133,253,1) 100%);
                        background: -o-linear-gradient(90deg,rgba(0,167,255,1) 0%,rgba(7,133,253,1) 100%);
                        background: -ms-linear-gradient(90deg, rgba(0,167,255,1) 0%,rgba(7,133,253,1) 100%);
                        background: linear-gradient(90deg,rgba(0,167,255,1) 0%,rgba(7,133,253,1) 100%);
                        .icons:before{
                            content:'\e7f7'
                        }
                    }
                }

                img {
                    width: 100%;
                }
            }

            .card_foot {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .textbox {

                    color: #666;
                    display: flex;
                    align-items: center;

                    &:first-child {
                        justify-content: flex-start;
                        margin-right: 8px;
                        flex: 1 0 auto;

                        .text {
                            width: 0;
                        }
                    }

                    &:last-child {
                        justify-content: flex-end;
                        flex: 0 0 auto;

                        .text {
                            max-width: 6rem;
                        }
                    }

                    label {
                        flex: 0 0 auto;
                        font-size: 12px;
                    }

                    .text {
                        flex: 1 0 auto;
                        word-break: break-all;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 12px;
                    }
                }
            }
        }
    }

</style>