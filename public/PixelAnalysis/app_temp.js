// import { Text } from './text.js';


const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class App {
    constructor(fontName) {
        this.fontName = fontName;
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.char = 'C'
        this.text = new Text();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        const checkStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        checkArray = checkStr.split('');
        checkArray.forEach(str => {
            this.draw(str);
        });

        var arrayContent = [["Séjour 1, é,í,ú,ü,ű"],["Séjour 2, é,í,ú,ü,ű"]];
var csvContent = arrayContent.join("\n");
var link = window.document.createElement("a");
link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
link.setAttribute("download", "upload_data.csv");
link.click(); 
    }

    saveCSV(data) {
        const csvWriter = createCsvWriter({
            path: `./public/PixelAnalysis/data/${this.fontName}/${this.char}.csv`
        });
        csvWriter.writeRecords(data).then(() => console.log(`Successfully save ${this.fontName}/${this.char}.csv`));
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
        console.log(data);
    }
}

// var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// var num = 0;
// [a[num], a[num+1], a[num+2], a[num+3]] = [-1, -2, -3, -4];
// console.log(a);

var fontName = 'Hind:700'

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