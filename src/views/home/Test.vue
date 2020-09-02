<template>
    <RootView>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
    </RootView>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RootView from '@/components/layout/RootView.vue'
@Component({
    components: {
        RootView,
    },
})
export default class Test extends Vue {
    private list: any = []
    private loading: boolean = false
    private finished: boolean = false
    private refreshing: boolean = false
    private onLoad() {
        setTimeout(() => {
            if (this.refreshing) {
                this.list = []
                this.refreshing = false
            }

            for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1)
            }
            this.loading = false

            if (this.list.length >= 40) {
                this.finished = true
            }
        }, 1000)
    }
    private onRefresh() {
        // 清空列表数据
        this.finished = false

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
    }
}
</script>