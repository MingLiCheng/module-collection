<template>
    <section id="root-view-wrap">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :head-height="80">
            <slot>这是插槽的默认值</slot>
        </van-pull-refresh>
    </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class RootView extends Vue {
    private list: any = []
    private loading: boolean = false
    private finished: boolean = false
    private count: number = 0
    private isLoading: boolean = false
    @Prop()
    private onRefresh() {
        setTimeout(() => {
            this.isLoading = false
            this.count++
        }, 1000)
    }
    @Prop()
    private onRefreshFinish() {
        this.isLoading = false
    }

    private created() {
        console.log('this', this)
    }
}
</script>

<style lang="less">
#root-view-wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .van-pull-refresh {
        width: 100%;
        min-height: 100%;
    }
}
</style>