<template>
    <div id="not-found">
        <div className="center" style="height: 100%; width: 100%; background: '#ececec'; overflow: 'hidden';">
            <img src="../assets/images/404.png" />
            <van-button @click="goHome"  type="info">返回首页</van-button>
        </div>
    </div>
</template>
<script>
import img from '@/assets/images/404.png'
export default {
    data() {
        return {}
    },
    methods: {
        goHome() {
            this.$router.replace('/')
        },
    },
}
</script>