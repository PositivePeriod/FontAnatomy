import { Text } from './text.js';

class App {
    constructor() {
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.text = new Text();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // this.canvas.width = this.stageWidth * this.pixelRatio;
        // this.canvas.height = this.stageWidth * this.pixelRatio;
        // this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.draw();
    }

    draw() {
        this.text.setText(
            'B',
            1,
            this.stageWidth * this.pixelRatio,
            this.stageHeight * this.pixelRatio
        );
    }
}

// var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// var num = 0;
// [a[num], a[num+1], a[num+2], a[num+3]] = [-1, -2, -3, -4];
// console.log(a);

window.onload = () => {
    WebFont.load({
        google: {
            families: ['Hind:700']
        },
        fontactive: () => {
            new App();
        }
    });
}