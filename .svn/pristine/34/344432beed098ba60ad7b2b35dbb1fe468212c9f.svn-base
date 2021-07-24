<template>
    <div class="drop_up_box" :class="icontype" v-if="isshow" @click="errorfn">
        <div class="drop_up_loading" v-if="showicon"></div>
        <div class="drop_up_icon"  v-if="!showicon">
            <i class=" endicon elderlyicon-zhongdian"></i>
        </div>
        <div class="drop_up_text">{{loadtext}}</div>
    </div>
</template>

<script>
export default {
    name: 'drop_up',
    props: ['loadingtype','errorClick'],
    data(){
        return {
            isshow:false,
            showicon:false,
            icontype:'',
            loadtext:''
        }
    },
    methods:{
        errorfn:function(){
            if(this.loadingtype == 'error'){
                this.errorClick();
            }
        }
    },
    mounted(){

    },
    watch:{
        loadingtype(newVal){
            if(newVal == 'end'){
                this.icontype = 'end';
                this.isshow = true;
                this.showicon = false;
                this.loadtext = '没有更多了'
            }else if(newVal == 'loading'){
                this.icontype = 'loading';
                this.isshow = true;
                this.showicon = true;
                this.loadtext = '加载中'
            }else if(newVal == 'error'){
                this.icontype = 'error';
                this.isshow = true;
                this.showicon = false;
                this.loadtext = '数据加载失败，点击重新加载'
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drop_up_box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
    box-sizing: border-box;
    margin-bottom: .7rem;
    flex-shrink: 0;
    flex-grow: 0;
}
.drop_up_box:after {
    content: "";
    display: block;
    border-bottom: 1px solid transparent
}
.drop_up_box .drop_up_loading {
    border-radius: 50%;
    width: 0.7rem;
    height: 0.7rem;
    font-size: 30px;
    position: relative;
    text-indent: -9999em;
    border-top: .1rem solid #3caee7;
    border-right: .1rem solid #3caee7;
    border-bottom: .1rem solid transparent;
    border-left: .1rem solid #3caee7;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load .7s infinite linear;
    animation: load .7s infinite linear;
}

.drop_up_text {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #b3bbbe;
    justify-content: center;
}

.endicon {
    font-size: 20px;
    margin-right: 4px;
    color: #b3bbbe
}
.end .iconfont:before {
    content: "\e7c5";
}
.error .iconfont:before {
    content: "\e658";
}
.error .endicon,.error .drop_up_text{
    color:red;
}

.drop_up_box .drop_up_loading + .drop_up_text {
    margin-left: .5rem
}

@-webkit-keyframes load {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}

@keyframes load {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}
</style>
