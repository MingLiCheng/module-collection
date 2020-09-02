<template>
    <section id="signature-wrap">
        <div class="switch-box" :class="{ 'horizontal-mode-switch': isHorizontal }">
            <span>切换至{{ isHorizontal ? '竖屏' : '横屏' }}模式</span> <van-switch v-model="isHorizontal" size="20px" @change="switchChange" />
        </div>
        <div id="canvas" :class="{ 'horizontal-mode': isHorizontal }">
            <p @click="clearSignature" id="clearCanvas">清除</p>
            <p @click="saveSignature" id="saveCanvas">保存</p>
        </div>
        <van-overlay :show="overlayShow" @click.stop="overlayShow = false" z-index="10">
            <div class="sign-img-box">
                <img id="img" :src="imgUrl" alt="" @click.stop="(e)=>{e.stopPropagation && e.stopPropagation()}" />
            </div>
        </van-overlay>
        <canvas id="idCanvas" width="200px" height="100px" style="border: 1px solid hotpink; display: none;"></canvas>
        <img id="imgEle" :src="imgTempUrl" alt="" srcset="" style="display: none;" />
    </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineCanvas from './lineCanvas'

@Component({})
export default class Signature extends Vue {
    private isHorizontal: boolean = false
    private lineCanvas: any
    private overlayShow: boolean = false
    private imgUrl: any = ''
    private imgTempUrl: any = ''
    private mounted() {
        this.lineCanvas = new LineCanvas({
            el: document.getElementById('canvas'), // 绘制canvas的父级div
            linewidth: 1, // 线条粗细，选填
            color: 'black', // 线条颜色，选填
            background: '#ffffff', // 线条背景，选填
        })
        this.lineCanvas.init()
    }
    private switchChange(value) {
        this.lineCanvas.clearCanvas()
    }
    private saveSignature() {
        if (this.isHorizontal) { // 横屏模式下需要对图片进行90度旋转
            this.imgTempUrl = this.lineCanvas.saveImage().imgUrl
            const newImage: any = document.getElementById('imgEle')
            if (newImage.width) {
                console.log('图片已经加载')
                this.rotateImage(newImage)
            } else {
                console.log('图片未加载')
                newImage.onload = () => {
                    this.rotateImage(newImage)
                }
            }
        } else {
            this.imgUrl = this.lineCanvas.saveImage().imgUrl
            this.overlayShow = true
        }
    }
    private clearSignature() {
        this.lineCanvas.clearCanvas()
    }
    private rotateImage(newImage) {
        const canvas: any = document.getElementById('idCanvas')
        const ctx = canvas.getContext('2d')
        canvas.width = newImage.height
        canvas.height = newImage.width
        ctx.translate(canvas.width / 2, canvas.height / 2) // 设置画布上的(0,0)位置，也就是旋转的中心点
        ctx.rotate((-90 * Math.PI) / 180)
        ctx.drawImage(newImage, -newImage.width / 2, -newImage.height / 2) // 把图片绘制在旋转的中心点，
        console.log('canvas.toDataURL()', canvas.toDataURL())
        this.imgUrl = canvas.toDataURL()
        this.overlayShow = true
    }
}
</script>

<style lang="less">
#signature-wrap {
    height: 100%;
    width: 100%;
    padding: 6px;
    position: relative;

    .horizontal-mode-switch {
        right: -50px !important;
        transform: translateY(300%) rotate(90deg);
    }
    .horizontal-mode {
        .switch-box {
            // left: -55px !important;
            transform: translateY(200%) rotate(90deg);
        }
        #clearCanvas {
            left: -55px !important;
            transform: translateY(-200%) rotate(90deg);
        }
        #saveCanvas {
            right: 180px !important;
            transform: translateY(-200%) rotate(90deg);
        }
    }

    .switch-box {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 9;
        display: flex;
        align-items: center;
        span {
            margin-right: 10px;
            color: rgb(109, 109, 109);
        }
    }
    #canvas {
        width: 100%;
        height: 100%;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 4px;
        canvas {
            display: block;
        }
        #clearCanvas {
            width: 50%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            border: 1px solid #dedede;
            z-index: 1;
        }
        #saveCanvas {
            width: 50%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            bottom: 0;
            right: 0;
            border: 1px solid #dedede;
            z-index: 1;
        }
    }

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
</style>