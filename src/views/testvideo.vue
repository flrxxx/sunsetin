<template>
    <div>
        <video controls="controls" width="100%" name="media" id="video">
            <source :src="video.url">
        </video>

    </div>
</template>

<script>

export default {
    name: "testvideo",
    components:{
    },
    data(){
        return {
            video: {
                url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                cover: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                muted: false,
                loop: false,
                preload: 'auto',
                poster: '',
                volume: 1,
                autoplay: false
            }
        }
    },
    computed: {
        $video() {
            return this.$refs.vueMiniPlayer.$video;
        }
    },
    methods: {
        handleFullscreen() {}
    },

}
</script>

<style scoped>
    #video{
        width: 100% !important;
        max-width: 100% !important;
    }
</style>