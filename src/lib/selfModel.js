export default {
    data() {
        return {
            x: null,
            y: null,
            offset: 100,
            offsetBottom: 50
        }
    },
    methods: {
        setPosition(e, dom, map) {
            let left = e.clientX;
            let top = e.clientY;

            dom.style.cssText = `
                position:absolute;
                left: ${left}px;
                top: ${top}px;
                right: inherit;
                bottom: inherit;
            `;

            let domWidth = dom.clientWidth,
                domHeight = dom.clientHeight;

            if (document.documentElement.clientHeight - top < domHeight + this.offsetBottom) {
                this.y = true;
            } else {
                this.y = false;
            }
            if (document.documentElement.clientWidth - left < domWidth) {
                this.x = true;
            } else {
                this.x = false;
            }

            if (this.y === false && this.x === false) {
                return;
            }
            if (map && this.y === true && this.x === false) {
                let result = domHeight - (document.documentElement.clientHeight - top);

                map.panBy(0, -result - this.offset);

                let x = setTimeout(function() {
                    dom.style.top = top - (result + this.offset) + 'px';
                    clearTimeout(x);
                }, 200);
            }
            if (map && this.x === true && this.y === false) {
                let result = domWidth - (document.documentElement.clientWidth - left);
                map.panBy(-result - this.offset, 0);

                let y = setTimeout(function() {
                    dom.style.left = left - (result + this.offset) + 'px';
                    clearTimeout(y);
                }, 200);
            }
            if (map && this.x === true && this.y === true) {
                let x1 = domWidth - (document.documentElement.clientWidth - left);
                let x2 = domHeight - (document.documentElement.clientHeight - top);
                map.panBy(-x1 - this.offset, -x2 - this.offset);

                let z = setTimeout(function() {
                    dom.style.left = left - (x1 + this.offset) + 'px';
                    dom.style.top = top - (x2 + this.offset) + 'px';
                    clearTimeout(z);
                }, 200);
            }
        }
    }
}
