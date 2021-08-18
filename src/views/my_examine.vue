<template>
    <div class="content"  >
        <div class="main">
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
            <div class="tabbox">
                <div class="tabitem"  v-for="item in tabsnav" :key="item.type" :class="selectdtab == item.type ? 'active' :''" @click="changetabs(item.type,item.link)">
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

            <div class="activitylistitem">
                <div v-if="empty_type"  class="empty_box"><van-empty description="暂无作品" style="padding-top:0;" /></div>
                <van-list
                    v-else
                    v-model:loading="loading"
                    v-model:finished="finished"
                    finished-text="没有更多了"
                    v-model:error="error"
                    error-text="请求失败，点击重新加载"
                    @load="onLoad"
                >
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="itemname">
                            <p>{{item.work_name}}</p>
                            <span>{{item.create_time}}</span>
                        </div>
                        <router-link custom :to="{path:'/activitylist/activitydetail',query:{id:item.id}}" v-slot="{ navigate}">
                            <div class="item_img" @click="navigate">
                                <img :src="item.image">
                            </div>
                        </router-link>
                    </div>
                </van-list>
            </div>

        </div>
    </div>
</template>


<script>
    import {Search, Checkbox, CheckboxGroup, List, Empty, Toast} from 'vant';

    export default ({
        name: "my_examine",
        components:{
            [Search.name]:Search,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
            [List.name]:List,
            [Empty.name]:Empty,
        },
        data(){
            return {
                selectdtab:1,
                tabsnav:[
                    {
                        type:1,
                        name:'正在审核'
                    },
                    {
                        type:2,
                        name:'审核通过'
                    },
                    {
                        type:3,
                        name:'审核拒绝'
                    }
                ],
                search:'',
                finished:false,
                loading:false,
                error:false,
                pageSize:5,//每页数据条数
                currentPage:1,
                list:[],
                result:[],
                editcheck:false,
                rightarea:'edit',
                empty_type:false,
            }
        },
        methods:{
            onSearch:function(){
                this.list = [];
                this.currentPage = 1;
                this.getData();
            },
            changetabs:function(id,link){
                if(id !== this.selectdtab){
                    this.selectdtab = id;
                    this.selectdlink = link;
                    this.currentPage = 1;
                    this.list = [];
                    this.finished = false;
                    this.error = false;
                    this.loading =true;
                    this.getData();
                }
            },
            getData:function(){
                var _this = this;
                let param = new URLSearchParams();
                param.append('page', this.currentPage);
                param.append('pageSize', this.pageSize);
                param.append('keyword',this.search);
                param.append('registerStatus',this.selectdtab);
                this.$http.post('/tab:register_list',param).then((res)=>{
                    this.loading = false;
                    if(res.res === 1){
                        if(res.data.length > 0){
                            res.data.filter((item)=>{
                                this.list.push(item);
                            })
                        }else{
                            this.finished = true;
                        }

                        if(this.list.length===0){
                            this.empty_type = true;
                        }else{
                            this.empty_type = false;
                        }
                        if( res.data.length < this.pageSize ){
                            this.finished = true;
                        }
                    }else{
                        this.error = true;
                    }
                })
            },
            onLoad:function(){
                if( this.list.length === ( this.pageSize * this.currentPage) ){
                    this.currentPage += 1;
                    this.getData();
                }
            },
        },
        mounted(){
            this.getData();
        },

    })
</script>

<style scoped lang="less">
    .st0{fill:url(#SVGID_1_);}
    .activitylistitem{
        background-color: #f1f5f9;
        flex: 1 0 auto;
        padding: 0 15px;
    }
    .empty_box{ background: #fff; margin-top: 15px; border-radius: 10px;}
    .content {
        .main {
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            bottom:0;
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
    .item{
        background-color: #fff;
        padding: 15px;
        margin-top:15px;
        border-radius: 10px;
        .itemname{
            p{ font-size: 15px; padding-bottom:5px;}
            span{ display: block; padding-bottom: 10px;}
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
    }
</style>