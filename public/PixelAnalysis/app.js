import { Text } from './text.js';

class App {
    constructor(fontName) {
        this.fontName = fontName;
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.char = 'D'
        this.text = new Text();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        var data = {};
        // const checkStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const checkStr = '0aBc;'; // DEV
        checkStr.split('').forEach(str => {
            var strData = this.draw(str);
            data[str] =strData;
        });
        this.draw(checkStr);

        // DOWNLOAD
        // var link = document.createElement("a");
        // link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURI(JSON.stringify(data)));
        // link.setAttribute("download", `${this.fontName}.json`);
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    }

    convToCSV(data) {
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);

        var result = '';
        result += keys.join(columnDelimiter) + lineDelimiter;

        data.forEach(strData => {
            var ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) { result += columnDelimiter };
                result += strData[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        // this.canvas.width = this.stageWidth * this.pixelRatio;
        // this.canvas.height = this.stageWidth * this.pixelRatio;
        // this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.draw(this.char);
    }

    draw(str) {
        var data = this.text.setText(
            str,
            1,
            this.stageWidth * this.pixelRatio,
            this.stageHeight * this.pixelRatio
        );
        return data
    }
}

// var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// var num = 0;
// [a[num], a[num+1], a[num+2], a[num+3]] = [-1, -2, -3, -4];
// console.log(a);

var fontName = 'Hind:500'

window.onload = () => {
    WebFont.load({
        google: {
            families: [fontName]
        },
        fontactive: () => {
            new App(fontName);
        }
    });
}