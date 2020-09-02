

<template>
    <section id="qrcode-wrap">
        <div class="qrcpde-box">
            <meQrcode v-if="isShowQrcode" :qrUrl="qrUrl" :qr-size="480" :qr-logo="logo" :qr-logo-size="80" :qrTitle="qrTitle" />
        </div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            分割线
        </van-divider>
        <div class="op-box">
            <van-form @submit="onSubmit">
                <van-field v-model="qrUrl" name="qrUrl" label="qrUrl" placeholder="qrUrl" :rules="[{ required: true, message: '请填写qrUrl' }]" />
                <van-field v-model="qrTitle" name="qrTitle" label="qrTitle" placeholder="qrTitle" />
                <div class="logo-box">
                    <img :src="logo" alt="" srcset="" />
                </div>

                <div style="margin: 16px;">
                    <van-button block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import meQrcode from './meQrcode.vue'
@Component({
    components: {
        meQrcode,
    },
})
export default class Qrcode extends Vue {
    // private logo: any = require('@/assets/logo.png')
    private logo: any = require('@/assets/logo.png')
    private qrUrl: string = 'https://www.baidu.com'
    private qrTitle: string = '测试：meQrcode.vue'
    private isShowQrcode: boolean = true
    private onSubmit() {
        this.isShowQrcode = false
        this.$nextTick(() => {
            this.isShowQrcode = true
        })
    }
}
</script>

<style lang="less">
#qrcode-wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 16px;
    .qrcpde-box {
        width: 88%;
        // height: 240px;
        padding: 20px;
        border: 1px solid #ccc;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 240px;
            border: 1px solid hotpink;
        }
    }
    .op-box {
        .logo-box {
            img {
                width: 80px;
                height: 80px;
            }
        }
    }
}
</style>