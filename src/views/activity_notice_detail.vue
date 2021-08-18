<template>
    <div class="page">
        <div class="fullSkeleton" v-if="loading">
            <div  class="van-skeleton van-skeleton--animate">
                <div  class="van-skeleton__content">
                    <h3  class="van-skeleton__row" style=" width: 100%"></h3>
                    <h3  class="van-skeleton__row" style=" width: 60%"></h3>
                    <div  class="van-skeleton__row" style="height: 120px"></div>
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
                    <div  class="van-skeleton__row" style="width: 100%; "></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 100%;"></div>
                    <div  class="van-skeleton__row" style="width: 60%; "></div>
                </div>
            </div>
        </div>

        <div class="detail" v-else>
            <div v-if="errorinfo.show">
                <emptydate :Emptytype="errorinfo.type" :Emptytext="errorinfo.text"></emptydate>
            </div>
            <div v-else>
                <div class="title">{{ title }}</div>
                <div class="detail_info_time" >有效期：{{ begin }} 至 {{end}}</div>
                <div class="detail_content" v-html="content"></div>
            </div>
        </div>

    </div>
</template>

<script>
import {Skeleton} from 'vant';
import emptydate from '@/components/emptydate.vue';
export default {
    name: "Activity_notice_detail",
    components:{
        emptydate
    },
    data(){
        return {
            title:'',
            begin:'',
            end:'',
            content:'',
            id:this.$route.query.id,
            loading:true,
            errorinfo:{
                show:false,
                type:'error',
                text:'',
            }
        }
    },
    mounted(){
        if(this.id){
            let param = new URLSearchParams();
            param.append('id', this.id);
            this.$http.post('/tab:notice_detail',param).then((res)=>{
                this.loading = false;
                if(res.res == 1){
                    this.title = res.data.title;
                    this.begin = res.data.begin_date;
                    this.end = res.data.end_date;
                    this.img = res.data.img;
                    this.content = res.data.notice;
                }else{
                    this.errorinfo.show = true;
                    this.errorinfo.text = data.msg;
                }
            })
        }else{
            this.$router.push({path:'/activity_notice'})
        }
    }
}
</script>

<style scoped lang="less">
.page{
    background-color: #fff;
    .fullSkeleton{
        flex:1 0 auto;
        overflow: hidden;
        margin: 0 -15px;
        height: 0;

    }
}
.title{
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
.detail_info_time{
    font-size: 14px;
    margin-bottom: 10px;
}
.detail_content /deep/ *{
    font-size:14px;
    line-height: 20px;
    max-width: 100%;
}
.detail_content /deep/ img{
    width: 100%;
    margin: 10px 0;
}
</style>