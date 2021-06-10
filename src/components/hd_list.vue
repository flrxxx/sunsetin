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

</template>

<script>
import emptydate from '@/components/emptydate.vue';
export default {
    name: "activitylist",
    props:['activitylist'],
    components: {
        emptydate
    },
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
.emptybox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1 0 auto;
    background-color: #fff;
}
</style>