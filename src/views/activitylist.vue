<template>
    <van-pull-refresh ref="list" v-model="isLoading" success-duration="700" success-text="刷新成功" @refresh="onRefresh"  @scroll.passive="scrollEvent($event)">
        <van-search
            v-model="search"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            background="linear-gradient(90deg, #ff6050 0%, #dd2b45 100%)"
        >
            <template #right-icon >
                <div @click="onSearch" style="display: flex;align-items: center;color:#dd2b45"><van-icon name="filter-o" />搜索</div>
            </template>
        </van-search>
        <div class="activity_info" >
            <div class="activity_info_bg" :class="loading ? 'isloading':''">
                <div class="activity_name">{{activityinfo.title}}</div>
                <div class="activity_infoline">
                    <div class="space_item">
                        <i class="icons elderlyicon-shijian"></i>
                        <div class="text">投票时间：{{activityinfo.time}}</div>
                    </div>
                    <div class="card_type" :class="activityinfo.vote"><i class="icons"></i></div>
                </div>
                <div class="activity_line">
                    <div class="space_item">
                        <label>浏览量：</label>
                        <div class="text">{{ activityinfo.checknum }}</div>
                    </div>
                    <div class="space_item">
                        <label>举办城市：</label>
                        <div class="text">{{activityinfo.city}}</div>
                    </div>
                </div>
            </div>
        </div>

        <listloading v-if="loading"></listloading>
        <div class="activitylistitem" v-else>
            <div v-if="errorinfo.show">
                <emptydate :Emptytype="type" :Emptytext="text"></emptydate>
            </div>
            <div v-else>
                <hdlist :activitylist="activitylist" @itemclick="itemclick" @sharediashow="sharediashow"></hdlist>
                <drup_up :loadingtype="loadingtype" :errorClick="errorClick" v-if="activitylist.length  > 0" />
            </div>
        </div>
        <div class="popupshare" v-if="shareshow" @click="shareshow = false">
            <div class="popupsharearrow"></div>
            <div class="popupsharetext">点击右上角 "<span>···</span>" 进行分享
            </div>
            <div class="popupbg"></div>
        </div>
    </van-pull-refresh>
</template>

<script>
import drup_up from '@/components/drup_up.vue';
import emptydate from '@/components/emptydate.vue';
import hdlist from '@/components/hd_list.vue';
import listloading from '@/components/listloading';
import {Search,Loading,PullRefresh,Dialog} from 'vant';
import wx from 'weixin-js-sdk';
export default {
    name: "Activitylist",
    components:{
        drup_up,
        hdlist,
        [Search.name]:Search,
        [Loading.name]:Loading,
        [PullRefresh.name]:PullRefresh,
        [Dialog.name]:Dialog,
        emptydate,
        listloading
    },
    data() {
        return {
            activityinfo:{
                title:'',
                time:'',
                vote:'',
                checknum:'',
                city:'',
            },
            eventid:this.$route.query.id,
            title:'',
            loading:false,
            loadingtype:'none',//上滑加载暂不启动
            pageSize:10,//每页数据条数
            loaddata:false,
            currentPage:1,
            isScroll :false,
            isLoading:false,
            shareshow:false,
            scrollTop:0,
            activitylist:[],
            gogo:0,
            search:'',
            upload:false,
            errorinfo:{
                show:false,
                type:'error',
                text:'网络连接失败'
            }
        }
    },
    // computed:{
        // activityinfo:function(){

            // if(Object.keys(this.$store.state.activityinfo).length == 0){
            //     this.$router.replace({path:'/'});
            //     return {};
            // }else{
            //     var temp = JSON.parse(JSON.stringify(this.$store.state.activityinfo));
            //     temp.vote = this.$store.state.activityinfo.vote;
            //     return this.$store.state.activityinfo;
            // }
        // }
    // },
    methods:{
        leftBtnClick(){
            this.$router.push({path:'/',query:{id:this.event_id}});
            return true;
        },
        itemclick:function(item){
            this.$router.push({path:'/activitylist/activitydetail',query:{id:item.id}})
        },
        errorClick:function(){
            this.loadingtype = 'loading';
            this.isScroll = true;
            this.loaddata = false;
            this.getData({tab:this.selectdtab,currentPage:this.currentPage});
        },
        scrollEvent:function(e){
            // this.scrollTop = e.srcElement.scrollTop;
            if(this.isScroll){
                if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-100){
                    this.loadMore(); //加载更多
                }
            }
        },
        loadMore:function(){
            if(this.loaddata){
                this.loaddata = false;
                this.currentPage += 1;
                this.getData({tab:this.selectdtab,currentPage:this.currentPage});
            }
        },
        onSearch(){
            this.currentPage = 1;
            this.getData();
        },
        onRefresh(){
            this.loading = true;
            this.currentPage = 1;
            this.getData();
        },
        sharediashow(item){
            this.shareshow = true;
        },
        getData:function(){

            let param = new URLSearchParams();
            param.append('page', this.currentPage);
            param.append('pageSize', this.pageSize);
            param.append('keyword', this.search);
            param.append('event_id',this.eventid);
            var _this = this;
            this.$http.post('/tab:enter_list',param).then((res)=>{
                this.loading = false;
                if(res.res == 1){
                    if(this.currentPage == 1){
                        this.activitylist= [];
                        // setTimeout(() => {
                        this.isLoading = false;
                        // }, 1000);
                    }
                    if(res.data.length > 0){
                        res.data.filter((item)=>{
                            item.name = item.team_name;
                            item.title = item.work_name;
                            item.index = item.enter_number;
                            item.cardnum = item.ticket_num;
                            item.images = item.image;
                            item.zan = item.like_num;
                            item.talk = item.comment_num;
                            item.time = item.create_time;
                            item.isdianzaning = false;
                            item.talklike = false;
                            _this.activitylist.push(item);
                        })
                    }

                    if(res.data.length >= this.pageSize){
                        this.loaddata = true;
                        this.loadingtype = 'loading';
                        this.isScroll = true;
                    }else{
                        this.loaddata = false;
                        this.loadingtype = 'end';
                        this.isScroll = false;
                    }

                }else{
                    this.errorinfo.show = true;
                    this.errorinfo.text = res.msg;
                }
            })

        },
    },

    mounted:function () {
        this.search = '';
        this.loading = true;
        let param = new URLSearchParams();
        param.append('id', this.eventid);
        this.$http.post('/tab:event_detail',param).then((res)=>{
            this.loading = false;
            if(res.res == 1){
                this.activityinfo.title = res.data.title;
                this.activityinfo.time = res.data.match_begintime + '-' + res.data.match_endtime;
                this.activityinfo.checknum = res.data.view_num;
                this.activityinfo.city = res.data.city;
                this.activityinfo.vote = res.data.status_name == '正在投票' ? 'isnow':'ispass';
                this.$store.commit('setTitlebar', {title: this.activityinfo.title});
                document.title = this.activityinfo.title;
                var hdimg = res.data.img;
                var text =res.data.description;
                param = new URLSearchParams();
                param.append('urlrtn', window.location.href);
                this.$http.post('/ajax_wechatshare',param).then((res)=>{
                    if(res.res == 1){
                        wx.config({
                            debug: false,
                            appId: res.data.appid,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.nonceStr,
                            signature: res.data.signature,
                            jsApiList: ['onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQZone',
                                'onMenuShareWeibo',
                                'onMenuShareQQ',]
                        })
                        wx.ready(function () {
                            wx.onMenuShareTimeline({
                                title: this.activityinfo.title, // 分享标题
                                link: window.location.href,
                                imgUrl: hdimg, // 分享图标
                                desc: text,
                                success: function () {}
                            });
                            wx.onMenuShareAppMessage({
                                title: this.activityinfo.title, // 分享标题
                                link: window.location.href,
                                imgUrl: hdimg, // 分享图标
                                desc: text,
                                success: function () {

                                }
                            });
                            wx.onMenuShareQZone({
                                title: this.activityinfo.title, // 分享标题
                                link: window.location.href,
                                imgUrl: hdimg, // 分享图标
                                desc: text,
                                success: function () {

                                }
                            });
                            wx.onMenuShareWeibo({
                                title: this.activityinfo.title, // 分享标题
                                link: window.location.href,
                                imgUrl: hdimg, // 分享图标
                                desc: text,
                                success: function () {

                                }
                            });
                            wx.onMenuShareQQ({
                                title: this.activityinfo.title, // 分享标题
                                link: window.location.href,
                                imgUrl: hdimg, // 分享图标
                                desc: text,
                                success: function () {

                                }
                            })
                        })
                    }

                })


            }else{
                Dialog.alert({
                    title: '提示',
                    message: '活动信息获取失败',
                    theme: 'round-button',
                }).then(() => {
                    this.$router.push({path:'/'});
                });
            }
        })

        this.getData();

    },

    activated: function () {
        this.$refs.list.$el.scrollTop = this.scrollTop;
    },
    deactivated: function () {

    },
    beforeRouteLeave(to, from, next) {
        if(to.name == 'Activitydetail'){
            this.scrollTop = this.$refs.list.$el.scrollTop;
        }else{
            this.scrollTop = 0;
        }
        next();
    }
}
</script>

<style scoped lang="less">
.content{
    height: 0;
}
.van-search{
    flex: 0 0 auto;
}
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
            &.isloading:after{
                background-color: #fff;
            }
        }
    }
    .activitylistitem{
        background-color: #f1f5f9;
        flex: 1 0 auto;
        padding: 0px 15px;
    }
    .activityloading{
        background-color: #f1f5f9;
        flex:1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .emptybox{
        background-color: #fff;
    }
/deep/ .van-pull-refresh__track{
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: auto;
}
/deep/ .van-pull-refresh__head{
    flex: 0 0 auto;
}
.popupshare {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 99;

    .popupsharearrow {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 2;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABuCAMAAAAj1dyRAAAAgVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9d3yJTAAAAKnRSTlMAA/kTcizpPPbvI+O8sAmd3shN08+2emkbDtmmlPPChzVigFcfjVxSRaptVV1IAAAD9UlEQVRo3rzY13bqQAwF0DPNNRgwpncCgZz//8BrY1ghXOxhHPB+pGkhJI0GtEj4OkWbjO4sSY7REvXVjVnK0Ab/MOANhffT/O0T75extOzzrIv3W5CU/Z2fXDIc4/0SfThOAWyL2JKkQVuSuMjrsM1uwYhkMNEkO2iJCkmuYUiGAu2Yk/SmgEfSRyt85vQl9g5tEAOSmbhU7wfaoHlN6USSK7QgWv7Mn5H0fLTgg6SnUEoEWjBmbotmlFJwt182rJtId3qSpJx9a+Oe2WUER+LY562ZVo41q+Fok/FeOEqefbNsktmR5IUMA17FJzxjOiMZTuBEzHnW174CoHw9lDxbC9h1mTvCzTcLHYMfk5FXPiiea5MF3KyZ81L8pg6SuaEtqC/LOevkyFwvevBp8RP71CQmGUZwojyS8eThU5l1cRQr9x+zrABp8JCalVO02pwNDksj69rZBCQXllLooMHXHIjaCROo2pIdTOFGSZIpKom4Jg2pJOlFcLQlObON0j4eOgUkgw3QYByMbImQD7PnFyFlCmeeddHPKjbHTcjcF5wpkkthLbJxVcgx3G3st+LRwwb0G4fEieSHfYQfcCcNmNNoIiU5RC39IOZYNg8Jn9b1d/dfbsWBOblFM5H9Ujy/XyKTDnNBioZEYP2XY3bXK1HGXOijsb6tx/Ykg+SmAjzmegbNrW2Fq3+9IDmw8KHwB4aWQTS4LVAzYGEh8Cer+m7xSUqFM1FupMsv/FFav34Mf85kf8BCFr3mEheautSXF9kuC3KRwEHd+hHvq5uzD2C6W7LQ8194dYxN5bKUYqo9FuQhwYssKiujQzLbr0OerQwsnK8rQ/PopKMneRZ/4pXEggX5nYr7PrrytMCLbQOeeZ3RySilos1xN/R41dMJXs+sWKn/KfAe/3q1ux0FYSAMw19pUIvyt64G0KCuZEXu/wI3dg6abDz1fW5gEtqmnW+475d3mkuuD5pPYfnn+cGCaSBTj0MIYft9yKw9It3s9Urqgt2bpIOFTJgUMoHsrhmdQHE0EyaRan7P/r5KngSyxRx6gXzzekXnArmdpdyks+VtIHuQtU6gObPwD5QHS3xA3dYaCZCPr5OjQH1rITfIDmbpxHFlbKArcdwzHsxeHGtZ9l4cKzl04ljJbSGOK/GS1SENdSB+jCUncbo9XrJo8B17jb1068WZY+qz68W5ZbGvdcK4SwopIVW50M3XFCPuzUOcddywq7U4NiAZCmFcbQFfL0zRpv8dIDat2NzFSKeyyYWZRltKL8wjftfs6ESpLBtezcJchzR4YrifjP6ueZsGJAx3tMC97oUpbfN8ieOXl9IL5JplWd3FKs4XL9Qfsp2rkLfPVnYAAAAASUVORK5CYII=');
    }

    .popupsharetext {
        position: absolute;
        top: 110px;
        right: 20px;
        left: 20px;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 2px;
        color: #fff;
        z-index: 2;

        span {
            padding: 10px;
            font-size: 32px;
            color: #fff;
            vertical-align: middle;
            letter-spacing: 0px;
        }
    }

    .popupbg {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, .7);
        z-index: 1;
    }
}
</style>