export default class LineCanvas {
    private linewidth: number = 1
    private color: string = '#000000'
    private background: string = '#ffffff'
    private el: any
    private canvas: any
    private ctx: any
    constructor(obj: any) {
        this.linewidth = obj.linewidth
        this.color = obj.color
        this.background = obj.background
        this.el = obj.el
    }

    public init() {
        this.canvas = document.createElement('canvas')
        this.el.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.el.clientWidth
        this.canvas.height = this.el.clientHeight
        this.ctx.fillStyle = this.background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.linewidth
        this.ctx.lineCap = 'round'
        // 开始绘制
        this.canvas.addEventListener(
            'touchstart',
            function(e) {
                this.ctx.beginPath()
                this.ctx.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
            }.bind(this),
            false
        )
        // 绘制中
        this.canvas.addEventListener(
            'touchmove',
            function(e: any) {
                this.ctx.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
                this.ctx.stroke()
                if (e.preventDefault) {
                    e.preventDefault()
                }
                if (e.stopPropagation) {
                    e.stopPropagation()
                }
            }.bind(this),
            false
        )
        // 结束绘制
        this.canvas.addEventListener(
            'touchend',
            function() {
                this.ctx.closePath()
            }.bind(this),
            false
        )
        // 清除画布
        // this.clearEl.addEventListener(
        //     'click',
        //     function() {
        //         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        //     }.bind(this),
        //     false
        // )
        // 保存图片，直接转base64
        //  this.saveEl.addEventListener(
        //      'click',
        //      function() {
        //          const imgBase64 = this.canvas.toDataURL()
        //          console.log(imgBase64)
        //          const dlLink = document.createElement('a')
        //          dlLink.download = '签名图片'
        //          dlLink.href = imgBase64
        //          dlLink.click()
        //      }.bind(this),
        //      false
        //  )
    }

    public saveImage() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < imageData.data.length; i += 4) {
            // 当该像素是透明的,则设置成白色
            if (imageData.data[i + 3] === 0) {
                imageData.data[i] = 255
                imageData.data[i + 1] = 255
                imageData.data[i + 2] = 255
                imageData.data[i + 3] = 255
            }
        }
        this.ctx.putImageData(imageData, 0, 0)
        return {
            imgUrl: this.canvas.toDataURL(),
            imgWidth: this.canvas.width,
            imgHeight: this.canvas.height,
        }
    }
    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
