<template>
    <div class="page">
        <div class="activity_content">
            <div class="activity_title">{{activity.title}}</div>
            <div class="activity_imgside">
                <van-image :src="activity.img" >
                    <template v-slot:error><div class="imgerror"><van-icon name="photo-fail" /></div></template>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="activity_title">作品分类选择（可多选）</div>
            <div class="activity_htmlcontent_select">
                <div class="select_item" v-for="(item,index) in typelist" :class=" state.work_type.indexOf(item.id) >= 0 ? 'checked' :''" :key="index" @click="selectitem(item)">
                    <div class="select_text" >{{item.value}}</div>
                </div>
            </div>

            <div class="activity_title_nomargin">作品名称</div>
            <van-field v-model.trim="state.work_name" label="" maxlength="20" placeholder="请输入作品名称" />
            <div class="activity_title_nomargin">表演者名称 / 团队名称</div>
            <van-field v-model.trim="state.team_name" label="" maxlength="20" placeholder="请输入团队名称" />

            <div class="activity_title_nomargin">请选择报名性质</div>
            <van-field name="radio" label="">
                <template #input>
                    <van-radio-group v-model="state.itemtype" @change="radiochange" direction="horizontal">
                        <van-radio name="1">个人</van-radio>
                        <van-radio name="2">团队</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <div class="activity_title_nomargin" v-if="state.itemtype == 2">团队人数</div>
            <van-field name="stepper" label="填写人数" v-if="state.itemtype == 2">
                <template #input>
                    <van-stepper v-model="state.itemnumber" :min="min" />
                </template>
            </van-field>
            <div class="activity_title_nomargin">作品内容介绍</div>
            <van-cell-group inset>
                <van-field
                    v-model.trim="state.message"
                    rows="5"
                    maxlength="1000"
                    autosize
                    type="textarea"
                    placeholder="请输入作品内容介绍"
                />
            </van-cell-group>
            <div class="activity_title_nomargin">才艺展示图片（图片不超过9张）</div>
            <div class="labelteam">
                <div class="imgteam" v-for="(item,index) in state.filelist" :key="index" >
                    <div class="imgteamcontent">
                        <div class="imgclose" @click="delcert(index)">
                            <van-icon name="clear" />
                        </div>
                        <div class="imgbox" @click="preview(index)">
                            <van-image :src="item" >
                                <template v-slot:error><van-icon name="photo-fail" /></template>
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                        </div>
                    </div>
                </div>
                <div class="imgteam" v-if="state.filelist.length < 9">
                    <div class="imgteamcontent">
                        <div class="addimg" @click="addpic">
                            <div class="addiconbox">
                                <van-icon name="photo-o" />
                            </div>
                            <div class="addtext">
                                添加图片
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footbtn" >
                <van-button round type="primary" block color="linear-gradient(to right, #ff6050, #dd2b45)" @click="bmpage">下一步</van-button>
            </div>
        </div>
        <div class="fullloading" :class="pageloading ? 'show':''">
            <van-loading color="#1989fa"></van-loading>
        </div>

    </div>
</template>

<script>
import {Toast,ImagePreview,Dialog,Loading, Skeleton, Lazyload, Image as VanImage,Button,Field,CellGroup,RadioGroup,Radio,Stepper } from 'vant';

export default {
    name: "bmpage",
    components:{
        [Skeleton.name]:Skeleton,
        [Loading.name]:Loading,
        [Lazyload.name]:Lazyload,
        [ImagePreview.Component.name]: ImagePreview.Component,
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
            activity:{
                title:'',
                img:'',
            },
            typelist:[],
            pageloading:false,
            loaddata:false,
            min:1,
            state:{
                id:'',
                work_name:'',
                team_name:'',
                work_type :[],
                itemtype:'1',
                filelist:[],
                message:'',
                itemnumber:1,
            }
        }
    },
    beforeRouteEnter:(to,from,next)=>{
        if(from.name == 'itempage'){
            next(vm=>{
                vm.loaddata = true;
            })
        }else{
            next(vm=>{
                vm.loaddata = false
            })
        }
    },
    activated(){
        if(this.loaddata){
            // this.state = this.$store.state.matchinfo;
            // this.state.work_type = this.state.work_type ? this.state.work_type : [];
            // this.state.itemtype = this.state.itemtype  ? this.state.itemtype  : '1';
            // this.activity = this.$store.state.matchactivity;
        }else{
            this.state.work_name = '';
            this.state.team_name = '';
            this.state.work_type = [];
            this.state.message = '';
            this.state.itemtype = '1';
            this.state.filelist = [];
            this.activity.title = '';
            this.activity.images = '';
            this.id = this.$route.query.id;
            this.state.id = this.id;
            this.pageloading = true;
            if(this.id) {
                this.typelist = [];
                let param = new URLSearchParams();
                param.append('id', this.id);
                this.$http.post('/tab:event_detail',param).then((res)=>{
                    this.pageloading = false;
                    if(res.res == 1){
                        this.activity = res.data;
                        this.$http.post('/tab:type_list').then((res)=>{
                            if(res.res == 1){
                                for(var i in res.data){
                                    var temp = {};
                                    temp.id = i;
                                    temp.value = res.data[i];
                                    this.typelist.push(temp);
                                }

                            }
                        })
                    }
                })
                window['AppUploadImgCallback'] = arr =>{
                    this.AppUploadImgCallback(arr);
                }
            }else{
                this.$router.push({path:'/activityEnroll_list'})
            }
        }




    },
    deactivated(){
        window['AppUploadImgCallback'] = function(){};
    },

    methods:{
        radiochange(val){
            if(val == 1){
                this.min = 1;
                this.state.itemnumber = 1;
            }else{
                this.min = 2;
                this.state.itemnumber = 2;
            }
        },
        selectitem(item){
            if(this.state.work_type.indexOf(item.id) >=0){
                this.state.work_type.splice(this.state.work_type.indexOf(item.id),1)
            }else{
                this.state.work_type.push(item.id);
            }
        },
        delcert(index){
            Dialog.confirm({
                title: '提示',
                message: '确定要删除此图片吗？',
            }).then(() => {
                this.state.filelist.splice(index,1);
                Toast.success('删除成功');
            }).catch(() => {
                // on cancel
            });
        },
        preview(index){
            var arr = [];
            this.state.filelist.filter((item)=>{
                arr.push(item);
            })
            ImagePreview({
                images: arr,
                closeable: true,
                startPosition: index,
            });
        },
        addpic(){
            //上传档案
            var url = window.location.origin + '/ajax_sunsetfile';
            var count =   9 - this.state.filelist.length >= 4 ? '4' : 9 - this.state.filelist.length + '';
            var params = '';
            var callback ='AppUploadImgCallback';
            if(this.$android) {
                window.LanCareWeb.uploadPicture(url,count,params,callback);
            }else if(this.$ios){
                window.webkit.messageHandlers.Lancare.postMessage({classname: 'uploadPicture',url:url,count:count,'params':params,funName:callback});
            }
        },
        AppUploadImgCallback(arr){
            this.pageloading = true;
            if(this.$ios){
                arr = window.atob(arr);
            }
            try{
                arr = typeof arr=='string'? JSON.parse(arr):arr;
                // eslint-disable-next-line no-empty
            }catch(err){

            }
            this.pageloading = false;
            if(arr.data.length > 0){
                this.state.filelist = this.state.filelist.concat(arr.data);

            }
        },
        bmpage(){
            if(this.state.work_type.length == 0){
                Dialog.alert({message:'请选择作品分类'});
                return false;
            }
            if(this.state.work_name == ''){
                Dialog.alert({message:'请填写作品名称'});
                return false;
            }
            if(this.state.team_name == ''){
                Dialog.alert({message:'请填写表演者名称/团队名称'});
                return false;
            }
            if(this.state.itemtype == 2){
                if(!this.state.itemnumber){
                    Dialog.alert({message:'请选择团队人数'});
                    return false;
                }
                if(this.state.itemnumber > 30){
                    Dialog.alert({message:'团队人数最大可选30人'});
                    return false;
                }
            }
            if(this.state.message == ''){
                Dialog.alert({message:'请输入作品内容介绍'});
                return false;
            }
            if(this.state.filelist.length <= 0){
                Dialog.alert({message:'请上传才艺展示图片'});
                return false;
            }
            this.$store.commit('setactivity',this.activity);
            this.$store.commit('setmatchinfo',this.state);
            this.$router.push({path:'/itempage'})
        }
    }

}
</script>

<style scoped lang="less">

.activity_content {
    padding-bottom: 15px;

    .activity_title {
        font-size: 16px;
        margin-bottom: 15px;
        font-weight: bold;
    }

    .activity_imgside {
        width: 100%;
        margin-bottom: 15px;

        /deep/ .van-image {
            min-height: 120px;
            width: 100%;
        }

        /deep/ .van-icon {
            font-size: 32px;
            color: #dcdee0;
        }
    }
    .activity_htmlcontent{
        margin-bottom: 15px;
        /deep/ *{
            max-width: 100% !important;
            line-height: 20px;
            font-size: 16px;
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
    .activity_title_nomargin{
        font-size: 16px;
        font-weight: bold;
    }
    .van-cell{
        padding: 10px 0;
        margin-bottom: 15px;
        &::after{
            left: 0;
            right: 0;
            border-bottom: 0.0625rem solid #ccc;
        }
    }
    /deep/ textarea.van-field__control{
        padding: 5px;
       background-color: #f1f5f7;
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
                width: 24px;
                height: 24px;
                right: -5px;
                top: -5px;
                z-index: 10;
                background-color: #fff;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                    font-size: 18px;
                    color: #dd2b45;
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
</style>