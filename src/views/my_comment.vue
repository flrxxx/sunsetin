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
                <div class="tabitem"  v-for="item in tabsnav" :key="item.type" :class="selectdtab === item.type ? 'active' :''" @click="changetabs(item.type,item.link)">
                    <div class="activebg">
                        <div class="itemtext">{{item.name}}</div>
                        <svg class="activebgsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 426" style="enable-background:new 0 0 1920 426;" xml:space="preserve">
                            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="960" y1="32.0914" x2="960" y2="369.7218"><stop offset="0" style="stop-color:#FFFFFF"/><stop offset="1" style="stop-color:#F2F6F9"/></linearGradient>
                            <path class="st0" d="M182.07,426c78.91,0,142.88-64.17,142.88-143.33V143.51c0-79.16,63.97-143.33,142.88-143.33h1002.17c78.91,0,142.88,64.17,142.88,143.33v139.16c0,79.16,46.12,143.33,125.04,143.33H182.07z"/>
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
                        <div class="title">
                            <div class="iteminfo">
                                <div class="itemheader">
                                    <img :src="item.avatar">
                                </div>
                                <div class="itemtext">
                                    <div class="number">
                                        <span class="cardnum">{{item.team_name}}</span>
                                    </div>
                                    <div class="text">{{item.create_time}}</div>
                                </div>
                            </div>
                            <div class="itemcard" v-show="editcheck">
                                <van-checkbox-group v-model="result">
                                    <van-checkbox  :name="item.id" shape="square"></van-checkbox>
                                </van-checkbox-group>
                            </div>
                        </div>
                        <div class="itemname">
                            <p>{{item.work_name}}</p>
                        </div>
                        <router-link custom :to="{path:'/activitylist/activitydetail',query:{id:item.id}}" v-slot="{ navigate}">
                            <div class="item_img" @click="navigate">
                                <img :src="item.image">
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
                            <div class="item_time">浏览量：{{item.view_num}}</div>
                        </div>
                    </div>
                </van-list>
            </div>

        </div>
    </div>
</template>

<script>
    import {Search, Checkbox, CheckboxGroup, List, Empty, Toast,Dialog} from 'vant';
    export default ({
        name: "my_comment",
        components:{
            [Search.name]:Search,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
            [List.name]:List,
            [Empty.name]:Empty,
            [Dialog.name]:Dialog,
        },
        data(){
            return {
                tab:this.$route.query.tab,
                selectdtab:1,
                selectdlink:'/tab:my_like',
                tabsnav:[
                    {
                        type:1,
                        link:'/tab:my_like',
                        name:'点赞'
                    },
                    {
                        type:2,
                        link:'/tab:my_comment',
                        name:'评论'
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
                            if(this.$android){
                                window.LanCareWeb.showRightTextButton("", 'edit()',0);
                            } else if(this.$ios){
                                window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'',funName:'edit()'});
                            }
                        }else{
                            this.empty_type = false;
                            this.ApprightBtn();
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
            ApprightBtn:function(){
                if(this.$android){
                    window.LanCareWeb.showRightTextButton("编辑", 'edit()',0);
                } else if(this.$ios){
                    window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'编辑',funName:'edit()'});
                }
            },
            edit:function(){
                this.editcheck = true;
                if(this.$android){
                    window.LanCareWeb.showRightTextButton("删除", 'del()',0);
                } else if(this.$ios){
                    window.webkit.messageHandlers.Lancare.postMessage({classname: 'showRightButton',type:'0',buttonText:'删除',funName:'del()'});
                }
                if(this.rightarea ==='edit'){
                    this.rightarea = 'del';
                }
            },
            del:function(){
                if(this.result.length===0){
                    return false;
                }
                let del_link = '';
                if(this.selectdtab===1){
                    del_link = '/tab:del_like';
                }else{
                    del_link = '/tab:del_comment';
                }
                Dialog.confirm({
                    title: '提示',
                    message: '是否确认删除？',
                })
                .then(() => {
                    this.$http.post(del_link,this.$qs.stringify({ ids:this.result},{indices:'repeat'})).then((res)=>{
                        this.loading = false;
                        if(res.res == 1){
                            Toast.success(res.msg);
                            this.rightarea = 'edit';
                            this.editcheck = false;
                            this.$store.commit('setTitlebar',{righttext:'编辑'});
                            this.list = [];
                            this.currentPage = 1;
                            this.getData();
                            this.ApprightBtn();
                        }else{
                            Toast.fail(res.msg);
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                });
            },
            rightBtnClick:function(){
                if( this.rightarea==='edit'){
                    this.editcheck = true;
                    this.rightarea = 'del';
                    this.$store.commit('setTitlebar',{righttext:'删除'});
                }else{
                    if(this.result.length===0){
                        this.$store.commit('setTitlebar',{righttext:'编辑'});
                        this.editcheck = false;
                        this.rightarea = 'edit';
                    }else{
                        this.del();
                    }
                }
            },
            beFore:function () {
                if(this.tab === "2"){
                    this.selectdtab = 2;
                    this.selectdlink = '/tab:my_comment';
                }
            }
        },
        beforeMount(){
            this.beFore();
        },
        mounted(){
            window['edit'] = arr =>{
                this.edit(arr);
            };
            window['del'] = arr =>{
                this.del(arr);
            };
            this.ApprightBtn();
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
            bottom: 0;
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
                    width: 50%;
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
                        padding-top: 22.18%;
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
        padding: 15px 15px 5px;
        margin-top:15px;
        border-radius:8px;
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
                            font-size: 16px;
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
        .itemname{ margin-bottom: 10px;}
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
</style>