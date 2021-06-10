<template>
    <div class="emptybox">
        <van-empty :image="Emptytype" :image-size="Emptysize" :description="Emptytext" >
            <div v-if="showbtn">
                <div class="btn btnreload" @click="callback">{{btntext}}</div>
            </div>
        </van-empty>
    </div>
</template>

<script>
import { Empty } from 'vant';
export default {
    name: "emptydate",
    props:{
        Emptytype:{
            type:String,
            default:'default'
        },
        Emptytext:{
            type:String,
            default:'暂无数据',
        },
        Emptysize:{
            type:Number,
            default:150
        },
        showbtn:{
            type:Boolean,
            default:false
        },
        btntext:{
            type:String,
            default:'刷新重试'
        },
        callback:{
            type:Function,
            default:function(){
                window.location.reload();
            }
        }
    },
    components:{
        [Empty.name]:Empty,
    },
}
</script>

<style scoped lang="less">
.emptybox{

    .btnreload{
        display:block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 160px;
        border-radius: 20px;
        color:#fff;
        background: #ff6050;
        background: -moz-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ff6050), color-stop(100%, #dd2b45));
        background: -webkit-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background: -o-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background: -ms-linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
        background: linear-gradient(90deg, #ff6050 0%, #dd2b45 100%);
    }
}
</style>