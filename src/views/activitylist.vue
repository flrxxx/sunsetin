<template>
    <div class="content">
        <div class="activity_info">
            <div class="activity_info_bg">
                <div class="activity_name">{{activityinfo.title}}</div>
                <div class="activity_infoline">
                    <div class="space_item">
                        <i class="icons elderlyicon-shijian"></i>
                        <div class="text">活动时间：{{activityinfo.time}}</div>
                    </div>
                    <div class="card_type" :class="activityinfo.vote"><i class="icons"></i></div>
                </div>
                <div class="activity_line">
                    <div class="space_item">
                        <label>参赛节目：</label>
                        <div class="text">{{ activityinfo.checknum }}</div>
                    </div>
                    <div class="space_item">
                        <label>举办城市：</label>
                        <div class="text">{{activityinfo.city}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="activitylistitem" ref="list" @scroll.passive="isScroll && scrollEvent($event)">
            <div class="item" v-for="item in activitylist" :key="item.id">
                <div class="title">
                    <div class="iteminfo">
                        <div class="itemheader">
                            <img :src="item.avatar">
                        </div>
                        <div class="itemtext">
                            <div class="number">
                                <span class="cardnum">{{item.index}}</span>号
                            </div>
                            <div class="text">{{item.name}}</div>
                        </div>
                    </div>
                    <div class="itemcard">
                        <i class="icons elderlyicon-toupiaoicon"></i>
                        <span class="cardnum">{{item.cardnum}}</span>
                        <span class="cardtext">票</span>
                    </div>
                </div>
                <router-link custom :to="{path:'/activitydetail'}" v-slot="{ navigate}">
                    <div class="item_img" @click="navigate">
                        <div class="item_title">{{item.title}}</div>
                        <img :src="item.images">
                    </div>
                </router-link>
                <div class="item_footer">
                    <div class="item_label">
                        <div class="box_item">
                            <i class="icons elderlyicon-dianzan"></i>
                            <div class="item_text">{{item.zan}}</div>
                        </div>
                        <div class="box_item">
                            <i class="icons elderlyicon-pinglunicon"></i>
                            <div class="item_text">{{item.talk}}</div>
                        </div>
                        <div class="box_item">
                            <i class="icons elderlyicon-fenxiang"></i>
                        </div>
                    </div>
                    <div class="item_time">{{item.time}}</div>
                </div>
            </div>
        </div>
        <drup_up :loadingtype="loadingtype" :errorClick="errorClick" />
    </div>
</template>

<script>

export default {
    name: "activitylist",
    components:{},
    data() {
        return {
            loadingtype:'none',//上滑加载暂不启动
            pageSize:5,//每页数据条数
            loaddata:false,
            currentPage:1,
            isScroll :false,
            scrollTop:0,
            activitylist:[]
        }
    },
    computed:{
        activityinfo:function(){
            if(Object.keys(this.$store.state.activityinfo).length == 0){
                this.$router.replace({path:'/'});
                return {};
            }else{
                var temp = JSON.parse(JSON.stringify(this.$store.state.activityinfo));
                temp.vote = this.$store.state.activityinfo.type == 1 ?  'isnow': 'ispass';
                return this.$store.state.activityinfo
            }

        }
    },
    methods:{
        errorClick:function(){
            this.loadingtype = 'loading';
            this.isScroll = true;
            this.loaddata = false;
            this.getData({tab:this.selectdtab,currentPage:this.currentPage});
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
        getData:function(obj){
            var data = [ {
                id:1,
                name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                title:'歌曲合唱《玉都我美丽的家乡》',
                index:'46',
                cardnum:'527221',
                avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                zan:'389',
                talk:'253',
                time:'2021-01-19'
            },
                {
                    id:2,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                },
                {
                    id:3,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                },
                {
                    id:4,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                },
                {
                    id:5,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                },
                {
                    id:6,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                },
                {
                    id:7,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                },
                {
                    id:8,
                    name:'玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团玉都老年文艺团',
                    title:'歌曲合唱《玉都我美丽的家乡》',
                    index:'46',
                    cardnum:'527221',
                    avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    images:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F01%2F215828tpmddz2d2bfcz5pk.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623549721&t=61e51fb424dcd6eb610326db7843f61a',
                    zan:'389',
                    talk:'253',
                    time:'2021-01-19'
                }
            ]
            if(this.currentPage == 1){
                this.activitylist= data;
            }else{
                this.activitylist = this.activitylist.concat(data);
            }

            if(data.length >= this.pageSize){
                this.loaddata = true;
                this.loadingtype = 'loading';
                this.isScroll = true;
            }
        },
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
}
</script>

<style scoped lang="less">
    .activity_info{
        background-color: #ff6050;
        background-image: -moz-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background-image: -webkit-gradient(linear, left top, right top, color-stop(0%, #ff6050), color-stop(100%, #dd2b45));
        background-image: -webkit-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background-image: -o-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background-image: -ms-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background-image: linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        flex:0 0 auto;
        .activity_info_bg{
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            background-image: url("../images/bannerbg.png");
            background-size: 100% 100%;
            height: 129px;
            width: 320px;
            padding:16px 12px;
            box-sizing: border-box;
            position: relative;
            .activity_name{
                font-size: 18px;
                color:#fff;
                line-height: 20px;
                word-break: break-all;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-bottom: 11px;
            }
            .activity_infoline{
                display: flex;
                align-items: center;
                height: 22px;
                justify-content: space-between;
                margin-bottom:12px;
                .card_type{
                    flex:0 0 auto;
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
                .space_item{
                    display: flex;
                    align-items: center;
                    flex:0 0 auto;
                    .icons {
                        width: 12px;
                        height: 12px;
                        font-size: 12px;
                        line-height: 12px;
                        margin-right: 5px;
                        flex: 0 0 auto;
                        color: #fff;
                    }
                    .text {
                        flex: 1 0 auto;
                        font-size: 12px;
                        color: #fff;
                        line-height: 12px;
                    }
                }
            }
            .activity_line{
                display: flex;
                align-items: center;
                .space_item{
                    font-size: 12px;
                    color:#fff;
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
            &:after{
                content:'';
                position: absolute;
                bottom:-1px;
                left: 0;
                right: 0;
                background-color: #f1f5f9;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                height: 20px;
            }
        }
    }
    .activitylistitem{
        background-color: #f1f5f9;
        flex: 1 0 auto;
        height: 0;
        overflow-y: auto;
        padding: 0px 15px;
        .item{
            background-color: #fff;
            padding: 15px 15px 0;
            margin-bottom:15px;
            .title{
                display: flex;
                align-items: center;
                margin-bottom: 11px;
                .iteminfo{
                    flex:1 0 auto;
                    display: flex;
                    align-items: center;
                    .itemheader{
                        flex:0 0 auto;
                        width: 45px;
                        height: 45px;
                        border-radius: 22.5px;
                        overflow: hidden;
                        margin-right: 9px;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .itemtext{
                        flex:1 0 auto;
                        width: 0;
                        .number{
                            display: flex;
                            align-items: baseline;
                            font-size: 14px;
                            .cardnum{
                                font-family: 'number';
                                color:#e93d49;
                                font-size: 25px;
                                margin-right: 5px;
                            }
                        }
                        .text{
                            font-size: 14px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            word-break: break-all;
                        }
                    }
                }
                .itemcard{
                    flex: 0 0 auto;
                    display: flex;
                    align-items:baseline;
                    .icons{
                        width: 18px;
                        height: 18px;
                        font-size: 18px;
                        color:#e93d49;
                        margin-right: 5px;
                        line-height: 18px;
                    }
                    .cardnum{
                        font-family: 'number';
                        color:#e93d49;
                        font-size: 25px;
                        margin-right: 4px;
                        line-height: 25px;
                    }
                    .cardtext{
                        font-size: 14px;
                        line-height: 25px;
                    }
                }
            }
            .item_img{
                display: block;
                position: relative;
                width: 260px;
                height: 148px;
                border-radius: 10px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
                .item_title{
                    position: absolute;
                    bottom:0;
                    left: 0;
                    right: 0;
                    height: 34px;
                    line-height: 34px;
                    padding: 0 15px;
                    padding-top: 20px;
                    color:#fff;
                    z-index: 5;
                    background: rgba(0,0,0,.6);
                    background: -moz-linear-gradient(0deg,rgba(0,0,0,.8) 0%, rgba(0,0,0,0) 100%);
                    background: -webkit-linear-gradient(0deg, rgba(0,0,0,.8) 0%,rgba(0,0,0,0) 100%);
                    background: -o-linear-gradient(0deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,0) 100%);
                    background: -ms-linear-gradient(0deg, rgba(0,0,0,.8) 0%,rgba(0,0,0,0) 100%);
                    background: linear-gradient(0deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,0) 100%);
                }
            }
            .item_footer{
                display: flex;
                align-items: center;
                .item_label{
                    display: flex;
                    align-items: center;
                    flex:1 0 auto;
                    padding: 9px 0;
                    .box_item{
                        display: flex;
                        align-items: center;
                        margin-right: 15px;
                        .icons{
                            margin-right: 5px;
                        }
                        .item_text{
                            font-family: 'number';
                            color:#e93d49;
                            font-size: 18px;
                            margin-right: 4px;
                            line-height: 25px;
                        }
                    }
                }
                .item_time{
                    flex:0 0 auto;

                }
            }
        }
    }
</style>