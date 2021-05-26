<template>
    <div id="app">
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
    </div>
</template>

<script>
  export default {
      name: "app",
      components:{},
  }
</script>
<style lang="less" >
    .content{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        z-index: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .pagemain{
        flex:1 0 auto;
        height: 0;
        overflow-y: auto;
    }
</style>
