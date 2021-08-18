<template>
    <div class="listloading" :class="type == 'fixed' ? 'fixedloading':'inlineloading'">
        <van-loading color="#ff6050" ></van-loading>
    </div>
</template>

<script>
import { Loading,Overlay } from 'vant';
export default {
    name: "listloading",
    props:['type'],
    components:{
        [Loading.name]:Loading,
        [Overlay.name]:Overlay,
    },
}
</script>

<style scoped lang="less">
.listloading{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1 0 auto;
    background-color: rgba(255,255,255,.7);
    box-sizing: border-box;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 999;
    &.fixed{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        z-index: 0;
        background-color: rgba(255,255,255,0.95);
    }
    &.inlineloading{
        padding: 30px 0;
    }
}
</style>