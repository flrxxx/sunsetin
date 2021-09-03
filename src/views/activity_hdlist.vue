<template>
    <router-view v-slot="{ Component }">
        <keep-alive include='Activitylist'>
            <component :is="Component" ref="child" />
        </keep-alive>
    </router-view>
</template>

<script>
export default {
    name: "activity_hdlist",
    methods:{
        leftBtnClick:function(){
            try{
                var back = this.$refs.child.leftBtnClick();
                if(!back){
                    return false;
                }else{
                    return true;
                }
            }catch(err){
                return false;
            }
        },
    }
}
</script>

<style scoped>
.content{
    flex: 1 0 auto;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>