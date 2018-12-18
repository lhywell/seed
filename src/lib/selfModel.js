export default {
    data() {
        return {
            x: null,
            y: null,
            // intentionExpand:false,
            commentionHeaderHeight: 84,
            intertionHeight: 227,
            commentionHeight: 331,
        }
    },
    methods: {
        setPosition(e, dom, domHeight) {
            let left = e.clientX;
            let top = e.clientY;
            // console.log(e);

            dom.style.position = 'absolute';
            dom.style.left = left + 'px';
            dom.style.top = top + 'px';
            dom.style.right = 'inherit';
            dom.style.bottom = 'inherit';

            const width = 262;
            // console.log(111, type)

            if (document.documentElement.clientHeight - top < domHeight + 50) {
                this.y = true;
            } else {
                this.y = false;
            }
            if (document.documentElement.clientWidth - left < width) {
                this.x = true;
            } else {
                this.x = false;
            }

            if (this.y == true && this.x == false) {
                let result = domHeight - (document.documentElement.clientHeight - top);
                // this.y = -result - 100;
                this.$Baidu.panBy(0, -result - 100);

                let x = setTimeout(function() {
                    dom.style.top = top - (result + 100) + 'px';
                    clearTimeout(x);
                }, 200);
            }
            if (this.x == true && this.y == false) {
                let result = width - (document.documentElement.clientWidth - left);
                this.$Baidu.panBy(-result - 100, 0);

                let y = setTimeout(function() {
                    dom.style.left = left - (result + 100) + 'px';
                    // dom.style.top = top - (result + 100) + 'px';
                    clearTimeout(y);
                }, 200);
            }
            if (this.x == true && this.y == true) {
                let x1 = width - (document.documentElement.clientWidth - left);
                let x2 = domHeight - (document.documentElement.clientHeight - top);
                this.$Baidu.panBy(-x1 - 100, -x2 - 100);

                let z = setTimeout(function() {
                    dom.style.left = left - (x1 + 100) + 'px';
                    dom.style.top = top - (x2 + 100) + 'px';
                    clearTimeout(z);
                }, 200);
            }
        },
        setCommentionPosition(e, dom, type) {
            let left = e.clientX;
            let top = e.clientY;

            //弹框宽度
            const width = 290
            dom.style.position = 'absolute';
            dom.style.right = 'inherit';
            dom.style.bottom = 'inherit';
            var heightBenchmark = ''

            //弹出框跑到屏幕外,水平方向
            if (document.documentElement.clientWidth - left < width)
                dom.style.left = left - (width - 10) + 'px';
            else
                dom.style.left = left + 2 + 'px';

            //弹出框跑到屏幕外，垂直方向
            if (type === 'hide') {
                // this.intentionExpand = false
                heightBenchmark = this.commentionHeaderHeight
            } else if (type === 'expand') {
                // this.intentionExpand = true
                heightBenchmark = this.commentionHeight
            } else {
                // this.intentionExpand = false
                heightBenchmark = this.commentionHeight
            }

            if (document.documentElement.clientHeight - top < heightBenchmark)
                dom.style.top = document.documentElement.clientHeight - heightBenchmark + 'px';
            else
                dom.style.top = top - 30 + 'px';

        },
        setIntentionPosition(e, dom) {
            let offsetX = e.offsetX;
            let offsetY = e.offsetY;
            let left = e.clientX - offsetX + 20;
            let top = e.clientY - offsetY;

            dom.style.position = 'absolute';
            dom.style.right = 'inherit';
            dom.style.bottom = 'inherit';
            dom.style.left = left + 'px';
            dom.style.top = top + 'px';
        },
        // reset(dom){
        //     if(this.intentionExpand)
        //         dom.style.top = document.documentElement.clientHeight - heightBenchmark + 'px'
        // }
    }
}