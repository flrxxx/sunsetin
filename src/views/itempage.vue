<template>
    <div class="page">
        <div class="activity_content">
            <div class="activity_title">基本信息<span>（用于身份核验，请务必真实填写）</span></div>
            <div class="iteminfo"  v-for="(item,index) in userinfo" :key="index">
                <van-cell-group inset >
                    <van-field v-model.trim="item.fullname" label="姓名" placeholder="请输入姓名" />
                    <van-field v-model.trim="item.age" label="年龄" type="digit" placeholder="请输入年龄" />
                    <van-field v-model.trim="item.citizen_id_number" label="身份证号"  placeholder="请输入身份证号" />
                    <van-field v-model.trim="item.mobile" type="tel" label="手机号"  placeholder="请输入手机号" />
                    <van-field v-model.trim="item.address" label="联系地址" placeholder="请输入联系地址" />
                    <van-field v-model.trim="item.emergency_mobile" type="tel" label="紧急联系人"  placeholder="请输入紧急联系人的手机号" />
                </van-cell-group>
            </div>
            <div class="footbtn" >
                <van-button type="primary" round block color="linear-gradient(to right, #ff6050, #dd2b45)" @click="bmpage">确认报名</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Dialog,Loading, Skeleton, Lazyload, Image as VanImage,Button,Field,CellGroup,RadioGroup,Radio,Stepper } from 'vant';
export default {
    name: "itempage",
    components:{
        [Skeleton.name]:Skeleton,
        [Loading.name]:Loading,
        [Lazyload.name]:Lazyload,
        [VanImage.name]:VanImage,
        [Button.name]:Button,
        [Field.name]:Field,
        [CellGroup.name]:CellGroup,
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio,
        [Stepper.name]:Stepper,
    },
    data(){
        return {
            number: parseInt(this.$store.state.matchinfo.itemnumber) ? parseInt(this.$store.state.matchinfo.itemnumber) : 1,
            frominfo:this.$store.state.matchinfo,
            userinfo:[]
        }
    },
    activated(){
        this.number = parseInt(this.$store.state.matchinfo.itemnumber) ? parseInt(this.$store.state.matchinfo.itemnumber) : 1;
        this.frominfo = this.$store.state.matchinfo;
        this.userinfo = [];
        var temp = {};
        for(var i = 1; i<= this.number; i++){
            temp.fullname = '';
            temp.age = '';
            temp.citizen_id_number = '';
            temp.mobile = '';
            temp.address = '';
            temp.emergency_mobile = '';
            temp.user_type = i == 1 ? 1 :2;
            this.userinfo.push(temp);
        }
    },
    methods:{
        bmpage(){
            var param  = JSON.parse(JSON.stringify(this.frominfo));
            var flag = true;
            this.userinfo.filter((item)=>{
                if(item.fullname == ''){
                    Dialog.alert({message:'请输入姓名'});
                }
            })

            // this.$http.post('/tab:enter_submit').then((res)=>{
            //
            // })
        }
    }
}
</script>

<style scoped lang="less">
.page{
    background-color: #f1f5f7;
}
.activity_content {

    padding-bottom: 60px;

    .activity_title {
        font-size: 16px;
        margin-bottom: 15px;
        font-weight: bold;
    }

    .activity_htmlcontent_select{

        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 -7.25px;
        margin-bottom: 15px;
        .select_item{
            flex:1 0 auto;
            width: 25%;
            padding:0 7.25px;
            box-sizing: border-box;
            .select_text{
                border:1px solid #ddd;
                padding: 7px 0;
                font-size: 12px;
                text-align: center;
                border-radius: 5px;
            }
            &.checked .select_text{
                background-color: #dd2b45;
                color:#fff;
            }
        }
    }
    .activity_from{
        margin: 0;
        background-color: #f1f5f7;
    }
    .activity_title{
        font-size: 16px;
        font-weight: bold;
        span{
            font-size: 12px;
            color:#666;
            font-weight: normal;
        }
    }
    .van-cell{
        &::after{
            left: 0;
            right: 0;
            border-bottom: 0.0625rem solid #ccc;
        }
    }
    .iteminfo{
        margin-bottom: 15px;
    }
    .labelteam {
        padding: 15px 0 0;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 0 -7.5px;
        .imgteam {
            flex:0 0 25%;
            display: flex;
            position: relative;
            padding:0 7.5px;
            box-sizing: border-box;
            justify-content: center;
            margin-bottom: 15px;
            .imgteamcontent{
                width: 100%;
                padding-top: 100%;
                height: 0;
                position: relative;
            }
            .imgclose {
                position: absolute;
                width: 32px;
                height: 32px;
                right: -5px;
                top: -5px;
                z-index: 10;
                background-color: #fff;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                    font-size: 24px;
                    color: #666;
                }
            }

            .imgbox {
                position: absolute;
                top:0;
                left: 0;
                right: 0;
                bottom:0;

                /deep/ .van-image {
                    width: 100%;
                    height: 100%;
                }

                /deep/ .van-icon {
                    font-size: 32px;
                    color: #dcdee0;
                }
            }
        }

        .addimg {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            bottom:0;
            background-color: #f1f5f9;
            border-radius: 5px;

            .addiconbox {
                width: 24px;
                height: 24px;
                background-color: #ecf0f4;
                color: #a3afbc;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 5px;

                i {
                    font-size: 24px;
                }
            }

            .addtext {
                font-size: 12px;
                color: #a3afbc;
            }
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