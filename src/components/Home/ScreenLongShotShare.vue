<template>
    <section id="screenLongShotShare-wrap">
        <van-swipe class="swipe-wrapper" style="border: 1px solid #ccc;" vertical :loop="false">
            <van-swipe-item>
                <div class="swipe-item-box" style="background-color: #29b8db;">
                    <img src="@/assets/logo.png" alt="" />
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="swipe-item-box" style="background-color: #18ad79;">
                    <img src="@/assets/logo.png" alt="" />
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="swipe-item-box" style="background-color: hotpink;">
                    <img src="@/assets/logo.png" alt="" />
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="swipe-item-box" id="xxx" style="background-color: #ffd54f;">
                    <h1>你好</h1>
                    <van-button type="info" @click="createImageClickHandler">生成截图</van-button>
                </div>
            </van-swipe-item>
        </van-swipe>
        <!-- 图片显示 -->
        <van-overlay :show="overlayShow" @click.stop="overlayShow = false" z-index="10">
            <div class="sign-img-box">
                <img
                    id="img"
                    :src="imgUrl"
                    alt=""
                    @click.stop="
                        e => {
                            e.stopPropagation && e.stopPropagation()
                        }
                    "
                />
            </div>
        </van-overlay>
        <!-- html2canvas 的 容器 -->
        <div id="html2Con"></div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import html2canvas from 'html2canvas'
@Component
export default class ScreenLongShotShare extends Vue {
    private imgUrl: string = ''
    private overlayShow: boolean = false
    private mounted() {
        console.log('window.devicePixelRatio', window.devicePixelRatio)
    }
    private createImageClickHandler() {
        const domList: any = document.querySelectorAll('.van-swipe-item')
        console.log('domList', domList)
        // return false

        const html2Con: HTMLElement = document.querySelector('#html2Con')
        domList.forEach((ele: any) => {
            console.log('ele', ele)
            const newEle = ele.cloneNode(true)
            html2Con.appendChild(newEle)
        })
        console.log('html2Con', html2Con)
        html2canvas(html2Con, { scale: window.devicePixelRatio <= 1 ? 1.6 : window.devicePixelRatio }).then(canvas => {
            this.imgUrl = canvas.toDataURL()
            console.log('this.imgUrl.length', this.imgUrl.length)
            html2Con.innerHTML = ''
            this.overlayShow = true
        })
    }
    private async saveAsPng(dom) {
        await html2canvas(dom, {
            allowTaint: true,
            useCORS: true,
            scale: 1.6,
            width: window.screen.availWidth, // 显示的canvas窗口的宽度
            height: window.screen.availHeight, // 显示的canvas窗口的高度
            windowWidth: document.body.scrollWidth, // 获取X轴方向滚动条中的内容
            windowHeight: document.body.scrollHeight, // 获取Y轴方向滚动条中的内容
            x: 0, // 页面在X轴上没有滚动，故设为0
            y: window.pageYOffset, // 页面在垂直方向的滚动距离
        }).then(res => {
            console.log('res', res.toDataURL())
            // document.getElementById('screenLongShotShare-wrap').appendChild(res)

            // const img = new Image()
            // const imgBase64 = res.toDataURL('image/jpeg')
            // console.log('imgBase64', imgBase64)

            // img.src = imgBase64
            // console.log('imglen', img.src.length)
            // console.log('img', img)

            // document.getElementById('imgbox').appendChild(img)
        })
    }
}
</script>

<style lang="less">
#screenLongShotShare-wrap {
    position: relative;
    .swipe-wrapper,
    #html2Con {
        height: 100%;
        width: 100%;
        .swipe-item-box {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
            }
        }
    }
    #html2Con {
        height: auto;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        border: 1px solid hotpink;
        margin: 0 auto;
        z-index: -1;
    }
    .van-overlay {
        .sign-img-box {
            width: 100%;
            height: 100%;
            padding: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
            }
        }
    }
}
</style>