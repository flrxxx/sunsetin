<template>
    <div class="content" >
        <div class="main" >
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
                    <div class="works" v-for="item in list" :key="item.id">
                        <div class="works_area">
                            <div class="works_header">
                                <div class="works_img">
                                    <img :src="item.avatar">
                                </div>
                                <div class="works_name">
                                    <span>{{item.wx_nickname}}</span>
                                </div>
<!--                                <div class="works_checkbox" v-show="editcheck">-->
<!--                                    <van-checkbox-group v-model="result">-->
<!--                                        <van-checkbox  :name="item.id" shape="square"></van-checkbox>-->
<!--                                    </van-checkbox-group>-->
<!--                                </div>-->
                            </div>
                            <p class="works_comment" v-if="selectdtab===1"><span>评论：</span>{{item.message}}</p>
                            <p class="works_comment" v-if="selectdtab===2">给你点赞</p>
                            <p class="works_comment" v-if="selectdtab===3">给你投了一票</p>
                            <p class="works_address">{{item.title}}</p>
                            <p class="works_works">作品：{{item.work_name}}</p>
                        </div>
                    </div>
                </van-list>
            </div>

        </div>
    </div>
</template>


<script>
    import {Search, Checkbox, CheckboxGroup, List, Empty, Toast} from 'vant';

    export default ({
        name: "my_works",
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
                selectdlink:'/tab:my_enter_comment',
                tabsnav:[
                    {
                        type:1,
                        link:'/tab:my_enter_comment',
                        name:'评论'
                    },
                    {
                        type:2,
                        link:'/tab:my_enter_like',
                        name:'点赞'
                    },
                    {
                        type:3,
                        link:'/tab:my_enter_ticket',
                        name:'投票'
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
                let param = new URLSearchParams();
                param.append('page', this.currentPage);
                param.append('pageSize', this.pageSize);
                param.append('keyword',this.search);
                this.$http.post(this.selectdlink,param).then((res)=>{
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
            // ApprightBtn:function(){
            //     if(this.$android){
            //         window.LanCareWeb.showRightTextButton("编辑", 'edit()',0);
            //     } else if(this.$ios){
            //         window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'编辑',funName:'edit()'});
            //     }
            // },
            // edit:function(){
            //     if(this.$android){
            //         window.LanCareWeb.showRightTextButton("删除", 'del()',0);
            //     } else if(this.$ios){
            //         window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'删除',funName:'del()'});
            //     }
            //     if(this.rightarea ==='edit'){
            //         this.rightarea = 'del';
            //     }
            // },
            // del:function(){
            //     this.$http.post('/tab:del_comment',this.$qs.stringify({ ids:this.result},{indices:'repeat'})).then((res)=>{
            //         this.loading = false;
            //         if(res.res === 1){
            //             Toast.success(res.msg);
            //             this.rightarea = 'edit';
            //             this.editcheck = false;
            //             this.$store.commit('setTitlebar',{righttext:'编辑'});
            //             this.list = [];
            //             this.currentPage = 1;
            //             this.getData();
            //         }else{
            //             Toast.fail(res.msg);
            //         }
            //     })
            // },
            // rightBtnClick:function(){
            //     if( this.rightarea==='edit'){
            //         this.editcheck = true;
            //         this.rightarea = 'del';
            //         this.$store.commit('setTitlebar',{righttext:'删除'});
            //     }else{
            //         if(this.result.length===0){
            //             this.$store.commit('setTitlebar',{righttext:'编辑'});
            //             this.editcheck = false;
            //             this.rightarea = 'edit';
            //         }else{
            //             this.del();
            //         }
            //     }
            // },
        },
        mounted(){
            // window['edit'] = arr =>{
            //     this.edit(arr);
            // };
            // window['del'] = arr =>{
            //     this.del(arr);
            // };
            //this.ApprightBtn();
            this.getData();
        },
    })
</script>

<style scoped lang="less">
    .st0{fill:url(#SVGID_1_);}
    .empty_box{ background: #fff; margin-top: 15px; border-radius: 10px;}
    .activitylistitem{
        background-color: #f1f5f9;
        flex: 1 0 auto;
        padding: 0 15px;
    }
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
        background: #fff; margin-top: 15px; border-radius: 10px;
    }
    .works_area{
        background: #fff;
        padding: 10px;
        border-radius:10px;
        margin-top: 10px;
        color: #333333;
        .works_header{
            overflow: hidden;
            margin-bottom: 5px;
            .works_img{
                float: left;
                width: 45px;
                height: 45px;
                border-radius: 22.5px;
                overflow: hidden;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .works_name{
                float: left;
                padding-left: 10px;
                height: 45px;
                line-height: 45px;
                overflow: hidden;
                width:60%;
            }
            .works_checkbox{
                float: right;
                padding-top: 10px;
            }
        }
        .works_comment{ font-size: 12px; margin-bottom: 5px;word-wrap: break-word;word-break: break-all;}
        .works_address{ font-size: 12px; margin-bottom: 5px;}
        .works_works{ font-size: 12px;}
    }
</style>