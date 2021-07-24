<template>
    <div class="content"  >
        <div class="main" ref="list" @scroll.passive="scrollEvent($event)">
            <van-search
                v-model="search"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                background="linear-gradient(90deg, #ff6050 0%, #dd2b45 100%)"
            />
            <div class="tabbox">
                <div class="tabitem"  v-for="item in tabsnav" :key="item.type" :class="selectdtab == item.type ? 'active' :''" @click="changetabs(item.type)">
                    <div class="activebg">
                        <div class="itemtext">{{item.name}}</div>

                        <svg class="activebgsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 1818 563" style="enable-background:new 0 0 1818 563;" xml:space="preserve">
                            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="960" y1="32.0914" x2="960" y2="369.7218"><stop offset="0" style="stop-color:#FFFFFF"/><stop offset="1" style="stop-color:#F2F6F9"/></linearGradient>
                            <path class="st0" d="M0,563c91.16,0,165.06-78.02,165.06-174.27v-214.2c0-96.25,73.9-174.27,165.06-174.27h1157.74
			c91.16,0,165.06,78.02,165.06,174.27v214.2c0,96.25,73.9,174.27,165.06,174.27H0z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="cardlist"  >
                <keep-alive>
                    <component v-bind:is="currentcomponent" :list="activity" @itemclick="itemclick" :Emptytype="errorinfo.type" :Emptytext="errorinfo.text" :showbtn="true"></component>
                </keep-alive>
                <drup_up :loadingtype="loadingtype" v-if="currentcomponent != 'listloading'" :errorClick="errorClick"  />
            </div>
        </div>
        <footerbar></footerbar>
    </div>
</template>


<script>
import drup_up from '@/components/drup_up.vue';
import footerbar from '@/components/footerbar.vue';
import listloading from '@/components/listloading.vue';
import activityitem from '@/components/activityitem.vue';
import emptydate from '@/components/emptydate.vue';
import { Dialog,Toast,NavBar,Search,Loading,Overlay } from 'vant';

export default ({
    name: "activityEnroll_list",
    components:{
        emptydate,
        footerbar,
        drup_up,
        activityitem,
        [Dialog.name]: Dialog,
        [Toast.name]:Toast,
        [NavBar.name]:NavBar,
        [Search.name]:Search,
        [Loading.name]:Loading,
        [Overlay.name]:Overlay,
        listloading,

    },
    data(){
        return {
            isScroll :false,
            selectdtab:23,
            tabsnav:[
                {
                    type:23,
                    name:'当前活动'
                },
                {
                    type:24,
                    name:'即将举行'
                },
                {
                    type:25,
                    name:'结束活动'
                }
            ],
            loaddata : true,
            dataloading:true,
            activity:[],
            currentPage : 1,
            pageSize:10,
            loadingtype:'none',
            scrollTop:0,
            search:'',
            currentcomponent:'listloading',
            errorinfo:{
                type:'error',
                text:'网络连接失败'
            }
        }
    },

    methods:{
        rightBtnClick:function(){
        },
        itemclick:function(id){
            this.$router.push({
                path:'/activity_detail',
                query:{id:id}
            })
            // let param = new URLSearchParams();
            // param.append('type', 'event');
            // param.append('id',id);
            // this.$http.post('/ajax_sunsetview',param).then((data)=>{})
        },
        onSearch:function(value){
            this.currentcomponent = 'listloading';
            this.currentPage = 1;
            this.getData();
            this.loadingtype = 'none';
            this.isScroll = false;
            this.loaddata = false;
            this.scrollTop = 0;
            this.$refs.list.scrollTop = this.scrollTop;
        },
        changetabs:function(id){
            if(id != this.selectdtab){
                this.scrollTop = 0;
                this.$refs.list.scrollTop = this.scrollTop;
                this.selectdtab = id;
                this.currentPage = 1;
                this.loadingtype = 'none';
                this.isScroll = false;
                this.loaddata = false;
                this.currentcomponent='listloading';
                this.getData();
            }
        },
        scrollEvent:function(e){
            this.scrollTop = e.srcElement.scrollTop;
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
                this.getData();
            }
        },
        errorClick:function(){
            this.loadingtype = 'loading';
            this.isScroll = true;
            this.loaddata = false;
            this.getData();
        },
        getData:function(){
            var _this = this;
            let param = new URLSearchParams();
            param.append('page', this.currentPage);
            param.append('pageSize', this.pageSize);
            param.append('event_time', this.selectdtab);
            param.append('keyword',this.search);
            this.$http.post('/tab:event_list',param).then((res)=>{
                if(res.res == 1){
                    if(this.currentPage == 1){
                        this.activity = [];
                    }
                    if(res.data.length > 0){
                        var arr = [];
                        arr = res.data.filter(function(item){
                            if(_this.selectdtab == '23'){
                                item.vote = 'now'
                            }else if(_this.selectdtab == '24'){
                                item.vote = 'wait'
                            }else if(_this.selectedtab = '25'){
                                item.vote = 'isover'
                            }
                            item.avatar = item.img;
                            item.checknum = item.view_num;
                            item.time = item.match_begintime + '~' +item.match_endtime
                            return item;
                        })
                        if(this.currentPage == 1){
                            this.activity = arr;
                        }else{
                            this.activity = this.activity.concat(arr);
                        }
                    }
                    if(this.currentPage == 1){
                        this.currentcomponent = 'activityitem';
                        if(this.activity.length == 0){
                            this.loadingtype = 'none';
                        }
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
                    if(this.currentPage == 1){
                        this.currentcomponent = 'emptydate'
                    }else{
                        this.loadingtype = 'error';
                        this.errorinfo.text = res.msg;
                    }

                }
            })



        }
    },
    created: function () {
    },
    mounted: function () {
        this.getData();
        this.list = 'inline'
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
    .main {
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:50px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        /deep/ .van-search{
            flex: 0 0 auto;
        }
        .tabbox {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            background: #ff6050;
            background: -moz-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ff6050), color-stop(100%, #dd2b45));
            background: -webkit-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: -o-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: -ms-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            background: linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
            position: sticky;
            top:0;
            left: 0;
            right: 0;
            z-index: 99;
            .tabitem {
                flex: 1 0 auto;
                width: 33.33333%;
                position: relative;
                text-align: center;
                height: 41px;
                z-index: 10;

                &.active {
                    .itemtext {
                        color: #dd2b45
                    }

                    .activebg .activebgsvg {
                        visibility: inherit;
                    }
                }

                .itemtext {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    color: #fff;
                }

                .activebg {
                    position: absolute;
                    padding-top: 35%;
                    left: 0;
                    right: 0;
                    bottom: 0px;

                    .activebgsvg {
                        visibility: hidden;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                }
            }
        }
        .cardlist {
            background-color: #f1f5f9;
            padding: 11px 11px 11px;
            width: 100%;
            box-sizing: border-box;
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
        }
    }
}
.emptybox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1 0 auto;
    background-color: #fff;
}

</style>