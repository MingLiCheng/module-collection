<template>
    <div id="home">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :head-height="80">
            <div class="module-desc" id="shot-id">
                <p class="logo-p"><img src="../../assets/logo.png" alt="" srcset="" /></p>
                <p><span>项目：</span><span>工作整理</span></p>
                <p><span>技术：</span><span>vue</span></p>
                <p><span>作者：</span><span>mlcheng</span></p>
                <p><span>网址：</span><span>www.cdbook.xyz</span></p>
            </div>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in list" :key="item.path" :title="item.title" value="内容" is-link :to="item.path" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
    private active = 0
    private isLoading = false
    private list: any = [
        {
            title: 'web签名',
            desc: '',
            path: '/app/home/signature',
        },
        {
            title: '二维码生成',
            desc: '',
            path: '/app/home/pageQrcode',
        },
        {
            title: '长截图分享',
            desc: '',
            path: '/app/home/screenLongShotShare',
        },
    ]
    private loading: boolean = false
    private finished: boolean = true
    private refreshing: boolean = false
    private created() {}
    private onLoad() {}
    private onRefresh() {
        // 清空列表数据
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
    }
}
</script>

<style lang="less">
#home {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .van-pull-refresh {
        min-height: 100%;
    }
    .module-desc {
        height: 176px;
        // border: 1px solid hotpink;
        padding: 33px 16px 16px 16px;
        .logo-p {
            img {
                width: 46px;
                height: 46px;
            }
        }
    }
}
</style>
