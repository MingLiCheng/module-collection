<template>
    <div id="about">
        <h1>This is an about page</h1>
        <div class="list-box">
            <ul>
                <li v-for="item in list" :key="item">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class About extends Vue {
    private list: Array<number> = []
    private loading: boolean = false
    private finished: boolean = false
    private created() {
        for (let i = 0; i < 15; i++) {
                this.list.push(this.list.length + 1)
            }
    }
    private onLoad(): void {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1)
            }

            // 加载状态结束
            this.loading = false

            // 数据全部加载完成
            if (this.list.length >= 40) {
                this.finished = true
            }
        }, 1000)
    }
}
</script>

<style lang="less">
#about {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .list-box{
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        ul{
            li{
                height: 60px;
                border-bottom: 1px solid #ccc;
            }
        }
    }
}
</style>
