export class Text {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        document.body.appendChild(this.canvas); // visualize
        this.ctx = this.canvas.getContext('2d');

        this.chart = document.createElement('canvas');
        this.chart.style.position = 'absolute';
        this.chart.style.left = '0';
        this.chart.style.top = '0';
        this.chart.style.width = '300px';
        this.chart.style.height = '300px';
        document.body.appendChild(this.chart); // visualize
        this.chartCtx = this.chart.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;
        this.clear();

        const strText = str;
        const fontWidth = 700;
        const fontSize = 800;
        const fontName = 'Hind';

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(255, 0, 0, 1)`;
        this.ctx.textBaseline = `middle`;
        const fontPos = this.ctx.measureText(strText);

        this.ctx.fillText(
            strText,
            (stageWidth - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent + ((stageHeight - fontSize) / 2)
        );

        this.strLeft = Math.round((stageWidth - fontPos.width) / 2);
        this.strWidth = Math.round(Math.abs(fontPos.actualBoundingBoxLeft) + Math.abs(fontPos.actualBoundingBoxRight));
        this.r = (stageHeight - fontSize) / 2
        this.strTop = Math.round((stageHeight - fontSize) / 2 + fontPos.actualBoundingBoxDescent);
        this.strHeight = Math.round(fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent);
        this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        density = 1;
        const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;
        var nID = new Uint8ClampedArray(stageWidth * stageHeight * 4); // newImageData
        var totalCounter = 0;
        var xCounter = new Array(this.strWidth + 1).fill(0);
        var yCounter = new Array(this.strHeight + 1).fill(0);
        var xyCounter = new Array(this.strWidth + this.strHeight + 2).fill(0);

        for (let height = 0; height <= this.strHeight; height += density) {
            for (let width = 0; width <= this.strWidth; width += density) {
                var num = ((this.strLeft + width) + (this.strTop + height) * stageWidth) * 4;
                var [r, g, b, a] = [imageData[num], imageData[num + 1], imageData[num + 2], imageData[num + 3]];
                [nID[num], nID[num + 1], nID[num + 2], nID[num + 3]] = [r, g, b, a];

                if (r === 255 && g === 0 && b === 0 && a === 255) {
                    totalCounter += 1;
                    xCounter[width] += 1;
                    yCounter[height] += 1;
                    xyCounter[width + height] += 1;
                }

                if (width === 0 || width === this.strWidth) {
                    [nID[num], nID[num + 1], nID[num + 2], nID[num + 3]] = [0, 255, 0, 255];
                }
                if (height === 0 || height === this.strHeight) {
                    [nID[num], nID[num + 1], nID[num + 2], nID[num + 3]] = [0, 0, 255, 255];
                }
            }
        }

        var nID = new ImageData(nID, stageWidth, stageHeight);
        this.ctx.putImageData(nID, 0, 0);

        var xMax = Math.max(...xCounter);
        xCounter = xCounter.map(value => value / xMax);
        var yMax = Math.max(...yCounter);
        yCounter = yCounter.map(value => value / yMax);
        var xyMax = Math.max(...xyCounter);
        xyCounter = xyCounter.map(value => value / xyMax);

        this.visualize(xCounter, 'x');
        //this.visualize(yCounter, 'y');
        //this.visualize(xyCounter, 'xy');

        console.log('stage', stageWidth, stageHeight);
        console.log('property', this.strLeft, this.strWidth, this.strTop, this.strHeight);
        console.log('ratio', totalCounter / this.strWidth / this.strHeight)

    }

    visualize(chartData, direction) {
        new Chart(this.chartCtx, {
            type: 'line',
            data: {
                labels: new Array(chartData.length).map(value => value.toString()),
                datasets: [{
                    label: `${direction}-counter`,
                    data: chartData,
                    borderColor: "rgba(0, 0, 0, 0.3)",
                    pointRadius: 0,
                    spanGaps: true
                }]
            },
            options: {
                duration: 0,
                responsiveAnimationDuration: 0,
                responsive: false,
                legend: { display: false },
                tooltips: { enabled: true, mode: 'index', intersect: false },
                hover: { enabled: false, mode: 'nearest', intersect: true, animationDuration: 0 },
                scales: {
                    xAxes: [{ display: true, scaleLabel: { display: true, labelString: `${direction}-position` } }],
                    yAxes: [{ display: true, ticks: { suggestedMin: 0, suggestedMax: 1 }, scaleLabel: { display: true, labelString: 'ratio' } }]
                }
            }
        });
    }
}