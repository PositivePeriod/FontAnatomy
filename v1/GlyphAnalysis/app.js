import { Text } from './text.js.js';
import { opentype } from "opentype.js";

class App {
    constructor(fontName) {
        this.fontName = fontName;
        this.char = 'C'
        this.text = new Text();
        this.fonts = new Map();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        var data = {};
        // const checkStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const checkStr = '0aB'; // DEV
        checkStr.split('').forEach(str => {
            var strData = this.draw(str);
            data[str] = strData;
        });

        var link = document.createElement("a");
        link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURI(JSON.stringify(data)));
        link.setAttribute("download", `${this.fontName}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async getFont(fontName) {
        if (!this.fonts.has(fontName)) {
            var fontPath = `../../data/${fontName}`;
            var font = await opentype.load(fontPath);
            this.fonts.set(fontName, font);
        }
        return this.fonts.get(fontName);
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
        this.draw(this.char);
    }

    draw(str) {
        var data = this.text.setText(
            str,
            1,
            this.stageWidth,
            this.stageHeight
        );
        return data
    }
}

window.onload = () => {
    new App();
}