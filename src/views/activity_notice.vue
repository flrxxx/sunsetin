<template>
    <div style="display: flex; flex:1 0 auto; flex-direction: column;overflow: hidden">
        <van-pull-refresh ref="list" success-duration="700" success-text="刷新成功" @refresh="onRefresh"  v-model="isLoading" class="page" @scroll.passive="scrollEvent($event)">
            <div class="fullSkeleton" v-if="loading">
                <div  class="van-skeleton van-skeleton--animate">
                    <div  class="van-skeleton__content">
                        <div class="itembox">
                            <h3  class="van-skeleton__row" style="height: 100px; margin: -12px -12px 0;"></h3>
                            <h3  class="van-skeleton__row" style=" width: 100%"></h3>
                            <div  class="van-skeleton__row" style="width: 60%; "></div>
                        </div>
                        <div class="itembox">
                            <h3  class="van-skeleton__row" style="height: 100px; margin: -12px -12px 0;"></h3>
                            <h3  class="van-skeleton__row" style=" width: 100%"></h3>
                            <div  class="van-skeleton__row" style="width: 60%; "></div>
                        </div>
                        <div class="itembox">
                            <h3  class="van-skeleton__row" style="height: 100px; margin: -12px -12px 0;"></h3>
                            <h3  class="van-skeleton__row" style=" width: 100%"></h3>
                            <div  class="van-skeleton__row" style="width: 60%; "></div>
                        </div>
                        <div class="itembox">
                            <h3  class="van-skeleton__row" style="height: 100px; margin: -12px -12px 0;"></h3>
                            <h3  class="van-skeleton__row" style=" width: 100%"></h3>
                            <div  class="van-skeleton__row" style="width: 60%; "></div>
                        </div>
                        <div class="itembox">
                            <h3  class="van-skeleton__row" style="height: 100px; margin: -12px -12px 0;"></h3>
                            <h3  class="van-skeleton__row" style=" width: 100%"></h3>
                            <div  class="van-skeleton__row" style="width: 60%; "></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="activitylistitem"  v-else >
                <div v-if="errorinfo.show">
                    <emptydate :Emptytype="errorinfo.type" :Emptytext="errorinfo.text"></emptydate>
                </div>
                <div v-else>
                    <div class="hd_item " v-for="(item,index) in list"  :key="index" @click="godetail(item)">
                        <div class="hd_img">
                            <div class="hd_img_inside">
                                <van-image :src="item.img" fit="contain">
                                    <template v-slot:error><van-icon name="photo-fail" /></template>
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                </van-image>
                            </div>
                        </div>
                        <div class="hd_info">
                            <div class="hd_title">{{item.title}}</div>
                            <div class="hd_time">
                                <i class="elderlyicon-shijian"></i>
                                <div class="text">{{item.begin_date}} 至 {{item.end_date}}</div>
                            </div>
                        </div>
                    </div>
                    <drup_up :loadingtype="loadingtype" :errorClick="errorClick" v-if="list.length  > 0" />
                </div>
            </div>
        </van-pull-refresh>
        <footerbar></footerbar>
    </div>

</template>

<script>

import footerbar from '@/components/footerbar.vue';
import emptydate from '@/components/emptydate.vue';
import drup_up from '@/components/drup_up.vue';
import {Loading, Skeleton, Lazyload, Image as VanImage,Button,Icon ,PullRefresh} from 'vant';
export default {
    name: "Activity_notice",
    components:{
        footerbar,
        [Loading.name]:Loading,
        [Lazyload.name]:Lazyload,
        [VanImage.name]:VanImage,
        [Skeleton.name]:Skeleton,
        [Button.name]:Skeleton,
        [Icon.name]:Icon,
        [PullRefresh.name]:PullRefresh,
        emptydate,
        drup_up
    },
    data(){
        return {
            list:[],
            errorinfo:{
                show:false,
                type:'default',
                text:'暂无活动通知',
            },
            loading:true,
            currentPage:1,
            pageSize:5,
            loaddata : true,
            loadingtype:'none',
            isScroll :false,
            upload:true,
            isLoading:false,
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        onRefresh(){
            this.loading = true;
            this.currentPage = 1;
            this.getData();
        },
        scrollEvent(e){
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
        godetail(item){
            this.$router.push({path:'/notice/detail',query:{id:item.id}});
        },
        getData:function(){
            if(this.currentPage == 1){
                this.loadingtype = 'none'
            }
            let param = new URLSearchParams();
            param.append('page', this.currentPage);
            param.append('pageSize', this.pageSize);
            this.$http.post('/tab:notice',param).then((res)=>{
                this.loading = false;
                if(res.res == 1){

                    if(res.data.length < this.pageSize){
                        this.loaddata = false;
                        this.loadingtype = 'end';
                        this.isScroll = false;
                    }else{
                        this.loaddata = true;
                        this.loadingtype = 'loading';
                        this.isScroll = true;
                    }
                    if(this.currentPage == 1){
                        this.isLoading = false;
                        this.list = JSON.parse(JSON.stringify(res.data));
                    }else{
                        if(res.data.length > 0){
                            this.list = this.list.concat(res.data);
                        }else{
                            this.loaddata = false;
                            this.loadingtype = 'end';
                            this.isScroll = false;
                        }
                    }
                    if(this.list.length == 0){
                        this.errorinfo.show = true;
                        this.errorinfo.type = 'default';
                        this.errorinfo.text ='暂无活动通知';
                    }
                }else {
                    this.errorinfo.type = 'error';
                }
            })
        }
    },
    beforeRouteEnter:(to,from,next)=>{
        if(from.name == 'activity_notice_detail'){
            next(vm=>{
                vm.upload = false;
            })
        }else{
            next(vm=>{
                vm.upload = true
            })
        }

    },
    activated: function () {
        this.$refs.list.$el.scrollTop = this.scrollTop;
    },
    beforeRouteLeave(to, from, next) {
        if(to.name == 'Activity_notice_detail'){
            this.scrollTop = this.$refs.list.$el.scrollTop;
        }else{
            this.scrollTop = 0;
        }
        next();
    }
}
</script>


<style scoped lang="less">
.page{
    background-color: #f1f5f9;
    flex:1 0 auto;
    overflow-y:auto;
    height: 0;
    .fullSkeleton{
        flex:1 0 auto;
        overflow: hidden;
        margin: 0 -10px;
        .itembox{
            background-color: #fff;
            padding: 17px;
            margin-bottom: 15px;
        }
    }
}

#App{
    display: flex;
    flex-direction: column;
}
.activitylistitem{

    padding-bottom: 50px;
}
.hd_list{
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0.75rem 0;
}
.hd_item{
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    overflow:hidden;
    margin-bottom:15px;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
}
.hd_img{
    position: relative;
    padding-top: 32%;
    height: 0;
}
.hd_img_inside{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 1;
    overflow-y: hidden;
}
.hd_img_inside /deep/ .van-image{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}
/deep/ .van-icon{
    font-size: 32px;
    color:#dcdee0;
}
.hd_after .hd_tags{
    background-color: #999;
    color:#fff;
}


.hd_going .hd_tags{
    background-color: #ff6050;
    color:#fff;
}
.hd_after .hd_tags{
    background-color: #000;
    color:#fff;
}
.hd_title{
    font-size: 14px;
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.hd_time{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    color:#666;
}
.hd_time i{
    margin-right: 5px;
    font-size: 16px;
    line-height: 16px;
}
.hd_time .text{
    line-height: 16px;
}
.hd_info{
    padding: 10px 15px;
}
.hd_after{
    -webkit-filter: grayscale(100%);
    filter: progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
}
.trybtn{
    background-color: #00a7ff;
    color:#fff;
    padding:0 15px;
    height: 44px;
    line-height: 44px;
    border-radius: 8px;
    display: inline-block;

}
</style>