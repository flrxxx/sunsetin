<template>
    <router-view v-slot="{ Component }">
        <keep-alive include='Activity_notice'>
            <component :is="Component" ref="child" />
        </keep-alive>
    </router-view>
</template>

<script>
export default {
    name: "notice"
}
</script>

<style scoped>
.content{
    flex: 1 0 auto;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 0;
}
</style>