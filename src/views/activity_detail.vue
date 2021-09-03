<template>
    <div class="page">
        <div class="fullloading" v-if="loading">
            <div  class="van-skeleton van-skeleton--animate">
                <div  class="van-skeleton__content">
                    <h3  class="van-skeleton__row" style="margin-top: 15px; width: 100%"></h3>
                    <h3  class="van-skeleton__row" style=" width: 60%"></h3>
                    <div  class="van-skeleton__row" style="height: 160px"></div>
                    <div  class="van-skeleton__row" style="width: 30%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 60%; "></div>
                    <div  class="van-skeleton__row" style="width: 30%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 60%; "></div>
                    <div  class="van-skeleton__row" style="width: 30%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 60%; "></div>
                </div>
            </div>
        </div>
        <div class="activity_content" v-else>
            <div class="activity_title">{{activity.title}}</div>
            <div class="activity_imgside">
                <van-image :src="activity.img" >
                    <template v-slot:error><div class="imgerror"><van-icon name="photo-fail" /></div></template>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="activity_title">活动内容</div>
            <div class="activity_htmlcontent" v-html="activity.description"></div>
            <div class="activity_title">活动时间</div>
            <div class="activity_htmlcontent">
                <div class="activity_label">报名时间：{{activity.enter_begintime}} 至 {{activity.enter_endtime}}</div>
                <div class="activity_label">比赛时间：{{activity.match_begintime}} 至 {{activity.match_endtime}}</div>
            </div>
            <div class="activity_title">其他详情</div>
            <div class="activity_htmlcontent">
                <div class="activity_label">报名费用：免费</div>
                <div class="activity_label">比赛范围：{{activity.province == activity.city ? activity.city : activity.province +  activity.city}}</div>
            </div>
        </div>
        <div class="footbtn" v-if="!loading && activity.is_enter_submit == 1">
            <van-button type="primary" block color="linear-gradient(to right, #ff6050, #dd2b45)" @click="bmpage">我要报名</van-button>
        </div>
    </div>
</template>

<script>
import {Dialog,Loading, Skeleton, Lazyload, Image as VanImage,Button} from 'vant';
export default {
    name: "activity_detail",
    components:{
        [Skeleton.name]:Skeleton,
        [Loading.name]:Loading,
        [Lazyload.name]:Lazyload,
        [VanImage.name]:VanImage,
        [Button.name]:Button
    },
    data(){
        return {
            id:this.$route.query.id,
            loading:true,
            activity:{
                img:''

            }
        }
    },
    methods:{
        bmpage(){
            this.$router.push({path:'/bmpage',query:{id:this.id}})
        }
    },
    mounted() {
        this.loading = true;
        this.id = this.$route.query.id;
        if(this.id) {
            let param = new URLSearchParams();
            param.append('id', this.id);
            this.$http.post('/tab:event_detail',param).then((res)=>{
                this.loading = false;
                if(res.res == 1){
                    this.activity = res.data;
                }

            })
        }else{
            this.$router.push({path:'/activityEnroll_list'})
        }
    }
}
</script>

<style scoped lang="less">
.content{
    height: 0;
}
.activity_content{
    padding-bottom: 60px;
    .activity_title{
        font-size:16px;
        margin-bottom: 15px;
        font-weight: bold;
    }
    .activity_imgside{
        width: 100%;
        margin-bottom: 15px;
        /deep/ .van-image{
            min-height: 120px;
            width: 100%;
        }
        /deep/ .van-icon{
            font-size: 32px;
            color:#dcdee0;
        }
        /deep/ .van-image__img{
            height: auto;
        }
    }
    .activity_htmlcontent{
        margin-bottom: 15px;
        /deep/ *{
            max-width: 100% !important;
            line-height: 20px;
            font-size: 14px;
        }
        /deep/ img{
            display: block;
            margin: 10px 0;
        }
        .activity_label{
            margin-bottom: 5px;
            font-size: 14px;
        }
    }

}
.footbtn{
    position: fixed;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 10;
    padding: 5px 15px;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(0,0,0,.15);
}
</style>