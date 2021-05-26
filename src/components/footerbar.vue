<template>
    <div class="footer">
        <router-link :to="{ path: item.path}" class="footeritem" :class="activePath == item.path ? 'active':''" v-for="item in footbar" :key="item.path">
            <i class="icons" :class="item.icon"></i>
            <div class="itemtext">{{item.name}}</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "footerbar",
        data(){
            return {
                footbar: [
                    {
                        path:'/',
                        icon:'elderlyicon-shouyeline',
                        name:'首页'
                    },
                    {
                        path:'/signup',
                        icon:'elderlyicon-baoming',
                        name:'报名'
                    },
                    {
                        path:'/my',
                        icon:'elderlyicon-wode',
                        name:'我的'
                    }
                ],
                activePath:this.$route.path
            }
        }
    }
</script>

<style scoped lang="less">
    .footer{
        height:43px;
        flex: 0 0 auto;
        background-color: #fff;
        border-top:1px solid #e0e6ed;
        padding: 0 11px;
        display: flex;
        align-items: center;
        .footeritem{
            flex:1 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &.active .icons, &.active .itemtext{
                color:#ff6050;
            }
            &.active .icons.elderlyicon-shouyeline:before{
                content:'\e7ea'
            }
            &.active .icons.elderlyicon-baoming:before{
                content:'\e7f9'
            }
            &.active .icons.elderlyicon-wode:before{
                content:'\e7fa'
            }
            .icons{
                font-size: 20px;
                color:#111111;
            }
            .itemtext{
                font-size: 12px;
                color:#111111;
            }
        }
    }

</style>