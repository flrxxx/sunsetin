<template>
    <div>
        <div class="emptybox" v-if="activitylist.length == 0">
            <emptydate :Emptytext="'暂无作品'"></emptydate>
        </div>
        <div class="item" v-else v-for="item in activitylist" :key="item.id">
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
                    <div class="cardnumbox">
                        <span class="cardnum">{{item.cardnum}}</span>
                        <span class="cardtext">票</span>
                    </div>

                </div>
            </div>
            <router-link custom :to="{path:'/activitydetail',query:{id:item.id}}" v-slot="{ navigate}">
                <div class="item_img" @click="navigate">
                    <div class="item_title">{{item.title}}</div>
<!--                    <img :src="item.images">-->
                    <van-image :src="item.images" fit="contain">
                        <template v-slot:error><van-icon name="photo-fail" /></template>
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </div>
            </router-link>
            <div class="item_footer">
                <div class="item_label">
                    <div class="box_item" @click="dianzan(item)">
                        <i class="icons elderlyicon-dianzan" :class="item.is_like_num == '1' ? 'active' : ''"></i>
                        <div class="item_text">{{item.zan}}</div>
                        <div class="numberchange" :class="item.is_like_num != '0' && item.talkclick && talkclick? 'add' :''" >{{ item.is_like_num != '0' ? '+':'' }}1</div>
                        <div class="numberchange" :class="item.is_like_num == '0' && item.talkclick && talkclick? 'sub' :''" >{{ item.is_like_num == '0' ? '-':'' }}1</div>
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

</template>

<script>
import emptydate from '@/components/emptydate.vue';
import {Dialog,Loading, Skeleton, Lazyload, Image as VanImage} from 'vant';
export default {
    name: "activitylist",
    props:['activitylist'],
    components: {
        emptydate,
        [Loading.name]:Loading,
        [Lazyload.name]:Lazyload,
        [VanImage.name]:VanImage,

    },
    data(){
        return {
            isclick:false,
            talkclick:false
        }
    },
    methods:{
        dianzan(item){
            if(!item.isdianzaning){

                item.isdianzaning = true;
                let param = new URLSearchParams();
                param.append('id',item.id);
                this.$http.post('/tab:add_like',param).then((res)=>{
                    this.talkclick = true;
                    item.talkclick = true;
                    item.isdianzaning = false;
                    if(res.res == 1){
                        if(item.is_like_num == '0'){
                            item.is_like_num = 1;
                            item.zan = parseInt( item.zan )+ 1;
                        }else{
                            item.is_like_num = 0;
                            item.zan = parseInt( item.zan )- 1;
                        }
                    }
                })
            }else{
                Dialog.alert({message:'正在操作中，请勿重复点击'})
            }
        }
    },
    activated: function () {
        this.talkclick = false;
    }
}
</script>

<style scoped lang="less">
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
            align-items:center;
            .icons{
                width: 18px;
                height: 18px;
                font-size: 18px;
                color:#e93d49;
                margin-right: 5px;
                line-height: 18px;
                flex:0 0 auto;
            }
            .cardnumbox{
                flex:1 0 auto;
                display: flex;
                align-items: baseline;
                .cardnum{
                    font-family: 'number';
                    color:#e93d49;
                    font-size: 25px;
                    margin-right: 4px;
                    line-height: 26px;
                }
                .cardtext{
                    font-size: 14px;
                    line-height: 15px;
                }
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
        /deep/ .van-image{
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            bottom:0;
            border-radius: 10px 10px 0 0;
            width: 100%;
            overflow: hidden;
        }
        /deep/ .van-icon{
            font-size: 32px;
            color:#dcdee0;
        }
        .item_title{
            position: absolute;
            bottom:0;
            left: 0;
            right: 0;
            height: 34px;
            line-height: 34px;
            padding: 0 15px;
            color:#fff;
            z-index: 5;
            background: rgba(0,0,0,.4);
            background: -moz-linear-gradient(0deg,rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 100%);
            background: -webkit-linear-gradient(0deg, rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 100%);
            background: -o-linear-gradient(0deg,rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 100%);
            background: -ms-linear-gradient(0deg, rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 100%);
            background: linear-gradient(0deg,rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 100%);
            text-shadow:2px 2px 5px rgba(0,0,0,0.3);
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
                position: relative;
                .icons{
                    margin-right: 5px;
                    &.elderlyicon-dianzan.active:before{
                        content:'\e7f2';
                        color:#d73154;
                    }
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
.emptybox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1 0 auto;
    background-color: #fff;
}
.numberchange{
    font-size: 16px;
    position: absolute;
    right: 4px;
    opacity: 0;

    &.add{
        transform: translateY(0);
        color:#d73154;
        animation: addnumber 1s;
    }
    &.sub{
        transform: translateY(-40px);
        color:#0bb20c;
        animation: addnumber 1s;
    }
}
@keyframes addnumber {
    0%{
        transform: translateY(0);
        opacity: 0;
    }
    40%{
        transform: translateY(-20px);
        opacity: 1;
    }
    60%{
        transform: translateY(-20px);
        opacity: 1;
    }
    100%{
        transform: translateY(-20px);
        opacity: 0;
    }
}

</style>