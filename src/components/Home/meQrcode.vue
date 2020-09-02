<!--
 * @Description: 分享二维码 实现方案
 * @Author: mlcheng2
 * @Date: 2019-12-02 09:14:50
 -->
<template>
    <!-- 生成二维码开放接口:
         二维码内容[通常为url]
         二维码大小[限制为正方形]
         二维码中间显示：文字或LOGO[默认不显示]-->
    <div id="meQrcode">
        <div class="qrcode_box">
            <img class="qrcode_canvas" id="qrcode_canvas" ref="qrcode_canvas" alt="二维码图片" />
            <img v-if="!!qrLogo" class="qrcode_logo" ref="qrcode_logo" :src="qrLogo" alt="二维码logo" />
            <canvas :width="qrSize" :height="qrSize" class="canvas" ref="canvas" style="display: none;"></canvas>
        </div>
    </div>
</template>
<script>
// const QRCode = require('qrcode')
import QRCode from 'qrcode'
export default {
    data() {
        return {}
    },
    /**
     * @argument qrUrl        二维码内容
     * @argument qrSize       二维码大小
     * @argument qrTitle      二维码下方出现 标题
     * @argument qrText       二维码中间显示文字
     * @argument qrTextSize   二维码中间显示文字大小(默认16px)
     * @argument qrLogo       二维码中间显示图片
     * @argument qrLogoSize   二维码中间显示图片大小(默认为80)
     * 注：qrText与qrLogo只能显示一个，如果想要显示两个需要自行设计
     */
    props: ['qrUrl', 'qrSize', 'qrTitle', 'qrText', 'qrLogo', 'qrLogoSize', 'qrTextSize'],
    created() {},
    mounted() {
        console.log('qrUrl', this.qrUrl)

        // return false
        // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
        const qrcode_canvas = this.$refs.qrcode_canvas
        const qrcode_logo = this.$refs.qrcode_logo
        const canvas = this.$refs.canvas
        QRCode.toDataURL(this.qrUrl, { errorCorrectionLevel: 'H', scale: 8 }, (err, url) => {
            // url 为生成的二维码的 图片的base64
            qrcode_canvas.src = url
            // 画二维码里的logo// 在canvas里进行拼接
            const ctx = canvas.getContext('2d')
            setTimeout(() => {
                // 获取图片
                ctx.drawImage(qrcode_canvas, 0, 0, this.qrSize, this.qrSize)
                if (this.qrLogo) {
                    // 设置logo大小
                    // 设置获取的logo将其变为圆角以及添加白色背景
                    ctx.fillStyle = '#fff'
                    ctx.beginPath()
                    const logoPosition = (this.qrSize - this.qrLogoSize) / 2 // logo相对于canvas居中定位
                    const h = this.qrLogoSize + 10 // 圆角高 10为基数(logo四周白色背景为10/2)
                    const w = this.qrLogoSize + 10 // 圆角宽
                    const x = logoPosition - 5
                    const y = logoPosition - 5
                    const r = 5 // 圆角半径
                    ctx.moveTo(x + r, y)
                    ctx.arcTo(x + w, y, x + w, y + h, r)
                    ctx.arcTo(x + w, y + h, x, y + h, r)
                    ctx.arcTo(x, y + h, x, y, r)
                    ctx.arcTo(x, y, x + w, y, r)
                    ctx.closePath()
                    ctx.fill()
                    ctx.drawImage(qrcode_logo, logoPosition, logoPosition, this.qrLogoSize, this.qrLogoSize)
                } else if (this.qrText) {
                    // 设置字体
                    const fpadd = 10 // 规定内间距
                    ctx.font = 'bold ' + this.qrTextSize + 'px Arial'
                    const tw = ctx.measureText(this.qrText).width // 文字真实宽度
                    const ftop = (this.qrSize - this.qrTextSize) / 2 // 根据字体大小计算文字top
                    const fleft = (this.qrSize - tw) / 2 // 根据字体大小计算文字left
                    const tp = this.qrTextSize / 2 // 字体边距为字体大小的一半可以自己设置
                    ctx.fillStyle = '#fff'
                    ctx.fillRect(fleft - tp / 2, ftop - tp / 2, tw + tp, this.qrTextSize + tp)
                    ctx.textBaseline = 'top' // 设置绘制文本时的文本基线。
                    ctx.fillStyle = '#f40'
                    ctx.fillText(this.qrText, fleft, ftop)
                }
                if (this.qrTitle) {
                    // 在二维码 图片下方 输出标题  思路是 创建一个文字canvas 将二维码的canvas和文字canvas 拼接
                    // 定义数组存储 截取的文字 用来换行显示
                    const rows = []
                    // 计算长度
                    const text = this.qrTitle
                    const textlenght = this.getTrueLength(text)
                    // 计算行数
                    const lineNum = Math.ceil(textlenght / 25)
                    const fontCanvas = document.createElement('canvas')
                    fontCanvas.width = this.qrSize
                    // 计算出 文字需要的高度
                    const fontCtx = fontCanvas.getContext('2d')
                    if (lineNum === 1) {
                        rows.push(text)
                    } else {
                        for (let index = 0; index < lineNum; index++) {
                            const t1 = this.cutString(text, 25)
                            const temp = text.substring(t1 * index, t1 * (index + 1))
                            rows.push(temp)
                        }
                    }
                    fontCanvas.height = 40 * lineNum
                    fontCtx.fillStyle = '#fff'
                    fontCtx.fillRect(0, 0, fontCanvas.width, fontCanvas.height)
                    fontCtx.fillStyle = 'black'
                    fontCtx.textBaseline = 'middle'
                    fontCtx.textAlign = 'center'
                    fontCtx.font = '30px Arial'
                    rows.forEach((item, index) => {
                        console.log('item', item)
                        fontCtx.fillText(item, fontCanvas.width / 2, 24 + index * 40)
                    })

                    const newCanvas = document.createElement('canvas')
                    newCanvas.width = this.qrSize
                    newCanvas.height = this.qrSize + fontCanvas.height
                    const newCtx = newCanvas.getContext('2d')
                    newCtx.fillStyle = '#fff'
                    newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height)
                    newCtx.putImageData(ctx.getImageData(0, 0, this.qrSize, this.qrSize), 0, 0)
                    newCtx.putImageData(fontCtx.getImageData(0, 0, this.qrSize, fontCanvas.height), 0, this.qrSize - 10)

                    qrcode_canvas.src = newCanvas.toDataURL()
                } else {
                    qrcode_canvas.src = canvas.toDataURL()
                }

                canvas.style.display = 'none'
                qrcode_canvas.style.display = 'inline-block'
            }, 10)
        })
    },
    methods: {
        // 以下方法用于向  canvas 上写入文字时计算 文字长度 换行
        // 获取字符串的真实长度（字节长度）
        getTrueLength: str => {
            const len = str.length
            let truelen = 0
            for (let x = 0; x < len; x++) {
                if (str.charCodeAt(x) > 128) {
                    truelen += 2
                } else {
                    truelen += 1
                }
            }
            return truelen
        },
        // 按字节长度截取字符串，返回substr截取位置
        cutString: (str, leng) => {
            const len = str.length
            let tlen = len
            let nlen = 0
            for (let x = 0; x < len; x++) {
                if (str.charCodeAt(x) > 128) {
                    if (nlen + 2 < leng) {
                        nlen += 2
                    } else {
                        tlen = x
                        break
                    }
                } else {
                    if (nlen + 1 < leng) {
                        nlen += 1
                    } else {
                        tlen = x
                        break
                    }
                }
            }
            return tlen
        },
    },
}
</script>
<style scoped>
.qrcode_box,
#meQrcode {
    display: inline-block;
}
.qrcode_box img {
    display: none;
}
</style>