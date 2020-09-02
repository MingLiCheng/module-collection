<template>
    <div id="index">
        <div class="wrapper" :style="{ height: isShowTabbar ? `calc(100% - 51px)` : '100%' }">
            <transition name="left">
                <router-view></router-view>
            </transition>
        </div>

        <van-tabbar v-model="active" v-if="isShowTabbar">
            <van-tabbar-item name="HomeIndex" replace to="/app/home" icon="home-o">Home</van-tabbar-item>
            <van-tabbar-item name="xxx" replace to="/home/xxx" icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item name="Test" replace to="/app/test" icon="setting-o">Test</van-tabbar-item>
            <van-tabbar-item name="About" replace to="/app/about" icon="search">About</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
})
export default class Home extends Vue {
    private active: string = ''
    private isShowTabbar: boolean = false
    private created() {}

    @Watch('$route', { immediate: true })
    private routeChangeHandler(newVal, oldVal) {
        if (newVal && newVal.meta && newVal.meta.isTabbar) {
            this.isShowTabbar = true
        } else {
            this.isShowTabbar = false
        }
        this.active = newVal ? newVal.name : ''
    }
}
</script>

<style lang="less">
#index {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .wrapper {
        width: 100%;
        height: calc(100% - 51px);
        // border: 1px solid hotpink;
        overflow: hidden;
        & > section {
            width: 100%;
            height: 100%;
        }
    }
    // 向左滑动的 过渡效果
    .left-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .left-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute; // 重要
    }
    .left-enter-active,
    .left-leave-active {
        transition: all 0.3s ease;
    }

    // 向右滑动的过渡效果
    .right-enter {
        opacity: 0;
        transform: translateX(-100%);
    }
    .right-leave-to {
        opacity: 0;
        transform: translateX(100%);
        position: absolute; // 重要
    }

    .right-enter-active,
    .right-leave-active {
        transition: all 0.3s ease;
    }
}
</style>
