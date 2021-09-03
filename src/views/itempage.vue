<template>
    <div class="page" ref="scroll">
        <div class="activity_content">
            <div class="activity_title">基本信息<span>（用于身份核验，请务必真实填写）</span></div>
            <div class="iteminfo" v-for="(item,index) in userinfo" :key="index" :ref="'item'+index">
                <h2 class="van-doc-demo-block__title">
                    <van-tag round type="primary">{{ index == 0 ? '领队' : index + 1 + '号参赛者' }}</van-tag>
                </h2>
                <van-cell-group inset>
                    <van-field v-model.trim="item.fullname" maxlength="10" required :rules="[{  message: '姓名为必填项' }]" label="姓名"
                               :error="item.fullnameerror" :error-message="item.fullnameerrormsg" placeholder="请输入姓名"
                               @input="item.fullnameerror = false;item.fullnameerrormsg=''"/>
                    <van-field v-model.trim="item.citizen_id_number" maxlength="18" required label="身份证号" placeholder="请输入身份证号"
                               :error="item.citizen_id_numbererror" :error-message="item.citizen_id_numbererrormsg"
                               @input="item.citizen_id_numbererror = false;item.citizen_id_numbererrormsg=''"/>
                    <van-field v-model.trim="item.mobile" type="tel" maxlength="15" required label="手机号" placeholder="请输入手机号"
                               :error="item.mobileerror" :error-message="item.mobileerrormsg"
                               @input="item.mobileerror = false;item.mobileerrormsg=''"/>
                    <van-field v-model.trim="item.address" maxlength="50" required label="联系地址" placeholder="请输入联系地址"
                               :error="item.addresserror" :error-message="item.addresserrormsg"
                               @input="item.addresserror = false;item.addresserrormsg=''"/>
                    <van-field v-model.trim="item.emergency_mobile" maxlength="15" required type="tel" label="紧急联系人手机号"
                               :error="item.emergency_mobileerror" :error-message="item.emergency_mobileerrormsg"
                               placeholder="请输入紧急联系人的手机号"
                               @input="item.emergency_mobileerror = false;item.emergency_mobileerrormsg=''"/>
                </van-cell-group>
            </div>
            <div class="footbtn">
                <van-button type="primary" round block color="linear-gradient(to right, #ff6050, #dd2b45)"
                            @click="bmpage">确认报名
                </van-button>
            </div>

        </div>
        <div class="fullloading" :class="pageloading ? 'show':''">
            <van-loading color="#1989fa"></van-loading>
        </div>
    </div>
</template>

<script>
import {
    Dialog,
    Loading,
    Skeleton,
    Lazyload,
    Image as VanImage,
    Button,
    Field,
    CellGroup,
    RadioGroup,
    Radio,
    Stepper,
    Tag,
    Toast
} from 'vant';

export default {
    name: "itempage",
    components: {
        [Skeleton.name]: Skeleton,
        [Loading.name]: Loading,
        [Lazyload.name]: Lazyload,
        [VanImage.name]: VanImage,
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Stepper.name]: Stepper,
        [Tag.name]: Tag,
        [Toast.name]:Toast,
    },
    data() {
        return {
            number: parseInt(this.$store.state.matchinfo.itemnumber) ? parseInt(this.$store.state.matchinfo.itemnumber) : 1,
            frominfo: this.$store.state.matchinfo,
            userinfo: [],
            IDRe18: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            IDRe15: /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/,
            mobilereg: /(1[3-9]\d{9}$)/,
            errorindex: '',
            pageloading:false,
        }
    },
    mounted() {
        this.frominfo = this.$store.state.matchinfo;
        if(!this.frominfo.id){
            this.$router.push({path:'/activityEnroll_list'});
        }

        this.number = parseInt(this.$store.state.matchinfo.itemnumber) ? parseInt(this.$store.state.matchinfo.itemnumber) : 1;

        this.userinfo = [];
        var temp = {};
        for (var i = 1; i <= this.number; i++) {
            temp = {};
            temp.fullname = '';
            temp.fullnameerror = false;
            temp.fullnameerrormsg = '';
            temp.citizen_id_number = '';
            temp.citizen_id_numbererror = false;
            temp.citizen_id_numbererrormsg = '';
            temp.mobile = '';
            temp.mobileerror = false;
            temp.mobileerrormsg = '';
            temp.address = '';
            temp.addresserror = false;
            temp.addresserrormsg = '';
            temp.emergency_mobile = '';
            temp.emergency_mobileerror = false;
            temp.emergency_mobileerrormsg = '';
            temp.user_type = i == 1 ? 1 : 2;
            this.userinfo.push(temp);
        }
    },
    methods: {
        GetAge(identityCard) {
            var len = (identityCard + "").length;
            if (len == 0) {
                return 0;
            } else {
                if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
                {
                    return 0;
                }
            }
            var strBirthday = "";
            if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
            {
                strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
            }
            if (len == 15) {
                strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
            }
            //时间字符串里，必须是“/”
            var birthDate = new Date(strBirthday);
            var nowDateTime = new Date();
            var age = nowDateTime.getFullYear() - birthDate.getFullYear();
            //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
            if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        bmpage() {
            this.errorindex = '';


            for (var i = 0; i < this.userinfo.length; i++) {
                // var user = i == 0 ? '领队' : i + 1 + '号参赛者'
                if (this.userinfo[i].fullname == '') {
                    this.userinfo[i].fullnameerror = true;
                    this.userinfo[i].fullnameerrormsg = '姓名为必填项';

                    if (this.errorindex === '') {
                        this.errorindex = i;
                    }
                }
                if (this.userinfo[i].citizen_id_number == '') {
                    this.userinfo[i].citizen_id_numbererror = true;
                    this.userinfo[i].citizen_id_numbererrormsg = '身份证号为必填项';
                    if (this.errorindex === '') {
                        this.errorindex = i;
                    }
                } else {
                    if (this.IDRe18.test(this.userinfo[i].citizen_id_number + '') || this.IDRe15.test(this.userinfo[i].citizen_id_number + '')) {
                        this.userinfo[i].age = this.GetAge(this.userinfo[i].citizen_id_number);
                    } else {
                        this.userinfo[i].citizen_id_numbererror = true;
                        this.userinfo[i].citizen_id_numbererrormsg = '身份证号格式错误';
                        if (this.errorindex === '') {
                            this.errorindex = i;
                        }
                    }
                }
                if (this.userinfo[i].mobile == '') {
                    this.userinfo[i].mobileerror = true;
                    this.userinfo[i].mobileerrormsg = '手机号为必填项';
                    if (this.errorindex === '') {
                        this.errorindex = i;
                    }
                } else {
                    if (!this.mobilereg.test(this.userinfo[i].mobile + '')) {
                        this.userinfo[i].mobileerror = true;
                        this.userinfo[i].mobileerrormsg = '手机号码格式错误';
                        if (this.errorindex === '') {
                            this.errorindex = i;
                        }
                    }
                }
                if (this.userinfo[i].address == '') {
                    this.userinfo[i].addresserror = true;
                    this.userinfo[i].addresserrormsg = '地址为必填项';
                    if (this.errorindex === '') {
                        this.errorindex = i;
                    }

                }
                if (this.userinfo[i].emergency_mobile == '') {
                    this.userinfo[i].emergency_mobileerror = true;
                    this.userinfo[i].emergency_mobileerrormsg = '紧急联系人手机号为必填项';
                    if (this.errorindex === '') {
                        this.errorindex = i;
                    }
                } else {

                    if (!(this.mobilereg.test(this.userinfo[i].emergency_mobile + ''))) {
                        this.userinfo[i].emergency_mobileerror = true;
                        this.userinfo[i].emergency_mobileerrormsg = '紧急联系人手机号码格式错误';
                        if (this.errorindex === '') {
                            this.errorindex = i;
                        }
                    }
                }
            }

            if (this.errorindex !== '') {
                this.$refs.scroll.scrollTop = this.$refs['item' + this.errorindex].offsetTop;
            }

            if (this.errorindex === '') {
                var data = {};
                data = this.$qs.stringify({
                    teams: this.userinfo,
                    imgs: this.frominfo.filelist,
                    work_descrip: this.frominfo.message,
                    team_name: this.frominfo.team_name,
                    work_name: this.frominfo.work_name,
                    work_type: this.frominfo.work_type.join(','),
                    id: this.frominfo.id
                }, {indices: 'repeat'});
                this.pageloading = true;
                this.$http.post('/tab:enter_submit',data).then((data)=>{
                    this.pageloading = false;
                    if(data.res == 1){
                        Toast.success("报名成功");
                        this.$router.replace({"path":"/activityEnroll_list"});
                    }else{
                        Dialog.alert({message:data.msg});
                    }
                })
            }

        }
    }
}
</script>

<style scoped lang="less">
.page {
    background-color: #f1f5f7;
}

.activity_content {

    padding-bottom: 60px;

    .activity_title {
        font-size: 16px;
        margin-bottom: 15px;
        font-weight: bold;
    }

    .activity_htmlcontent_select {

        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 -7.25px;
        margin-bottom: 15px;

        .select_item {
            flex: 1 0 auto;
            width: 25%;
            padding: 0 7.25px;
            box-sizing: border-box;

            .select_text {
                border: 1px solid #ddd;
                padding: 7px 0;
                font-size: 12px;
                text-align: center;
                border-radius: 5px;
            }

            &.checked .select_text {
                background-color: #dd2b45;
                color: #fff;
            }
        }
    }

    .activity_from {
        margin: 0;
        background-color: #f1f5f7;
    }

    .activity_title {
        font-size: 16px;
        font-weight: bold;

        span {
            font-size: 12px;
            color: #666;
            font-weight: normal;
        }
    }

    .van-cell {
        &::after {
            left: 0;
            right: 0;
            border-bottom: 0.0625rem solid #ccc;
        }
    }

    .iteminfo {
        margin-bottom: 15px;
    }

    .labelteam {
        padding: 15px 0 0;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 0 -7.5px;

        .imgteam {
            flex: 0 0 25%;
            display: flex;
            position: relative;
            padding: 0 7.5px;
            box-sizing: border-box;
            justify-content: center;
            margin-bottom: 15px;

            .imgteamcontent {
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
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

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
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
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

.footbtn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding: 5px 15px;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, .15);
}

.van-doc-demo-block__title {
    margin: 0;
    padding: 0.5rem 0rem 0.5rem;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 0.875rem;
    line-height: 1rem;
}
</style>