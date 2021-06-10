<template>
    <div>
        <div class="emptybox" v-if="list.length == 0">
            <emptydate :Emptytext="'暂无活动'"></emptydate>
        </div>
        <div v-else class="carditem" @click="navigate(item)" v-for="item in list" :key="item.id">
            <div class="card_title">{{item.title}}</div>
            <div class="card_line"><i class="icons elderlyicon-shijian"></i><div class="text">活动时间：{{item.match_begintime}} ~ {{item.match_endtime}}</div></div>
            <div class="card_img">
                <div class="card_type" :class="item.vote"><i class="icons"></i></div>
                <img :src="item.img">
            </div>
            <div class="card_foot">
                <div class="textbox">
                    <label>浏览量：</label>
                    <div class="text">{{ item.view_num }}</div>
                </div>
                <div class="textbox">
                    <label>举办城市：</label>
                    <div class="text">{{ item.city }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import emptydate from '@/components/emptydate.vue';
export default {
    name: "activityitem",
    props:['list'],
    components: {
        emptydate
    },
    methods:{
        navigate(item){
            this.$store.commit('saveActivity',item);
            this.$router.push({path:'/activitylist'});
        }
    }
}
</script>

<style scoped lang="less">
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
    .card_img {
        display: block;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        margin-bottom: 11px;
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
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
.emptybox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1 0 auto;
    background-color: #fff;
}
</style>