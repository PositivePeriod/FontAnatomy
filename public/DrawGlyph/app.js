import * as create from './createDomElement.js'

async function loadFontFromUrl(url) {
    var font = await opentype.load(url);
    return font;
};

class App {
    constructor(font) {
        this.font = font;

        this.bgSVG = create.createSVGElement(0, 0);
        document.body.appendChild(this.bgSVG);
        this.domGroup = create.createGroupElement();
        this.domGroup.setAttribute('id', 'domGroup')
        this.bgSVG.appendChild(this.domGroup);

        document.getElementById('inputForm').addEventListener('input', this.updateGlyph.bind(this), false)
        window.addEventListener("resize", this.replaceGlyph.bind(this), false);

        this.updateGlyph();
        this.replaceGlyph();
    }

    updateGlyph() {
        this.getInput();
        this.createDOMElements();
        this.replaceGlyph();
    }

    getInput() {
        this.char = document.getElementById('inputChar').value;
        var fontSize = parseInt(document.getElementById('inputSize').value);
        if (isNaN(fontSize)) {
            return false;
        } else {
            this.fontSize = fontSize;
        }

        // Find the real size of glyph
        var tempCharPath = this.font.getPath(this.char, 0, 0, this.fontSize);
        var charBox = tempCharPath.getBoundingBox();

        // Apply the discovered size
        this.charPath = this.font.getPath(this.char, -charBox.x1, -charBox.y1, this.fontSize);
        this.charBox = this.charPath.getBoundingBox();

        // glyph = font.charToGlyph(str)
        // path = glyph.getPath()
        // path = glyph.getBoundingBox()
    }

    createDOMElements() {
        while (this.domGroup.hasChildNodes()) {
            var child = this.domGroup.lastElementChild;
            this.domGroup.removeChild(child);
        }

        this.data = create.getDataFromCommands(this.charPath.commands);
        this.dGroup = this.data[0];
        this.directPoints = this.data[1];
        this.indirectPoints = this.data[2];
        this.additionalLine = this.data[3];

        this.dGroup.forEach(d => {
            this.domGroup.appendChild(create.createPathElement(d, this.stageWidth, this, this.stageHeight));
        })

        var domDirect = create.createGroupElement();
        domDirect.setAttribute('id', 'directPoints')
        this.directPoints.forEach(point => {
            domDirect.appendChild(create.createCircleElement(point.x, point.y, 1, '#ff0000'));
        })
        this.domGroup.appendChild(domDirect);

        var domIndirect = create.createGroupElement();
        domIndirect.setAttribute('id', 'indirectPoints')
        this.indirectPoints.forEach(point => {
            domIndirect.appendChild(create.createCircleElement(point.x, point.y, 1, '#00ff00'));
        })
        this.domGroup.appendChild(domIndirect);
    }

    replaceGlyph() {
        var glpyhWidth = this.charBox.x2 - this.charBox.x1;
        var glyphHeight = this.charBox.y2 - this.charBox.y1;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        console.log('glyph', glpyhWidth, glyphHeight);
        console.log('window', windowWidth, windowHeight);

        this.bgSVG.setAttribute('x', 0);
        this.bgSVG.setAttribute('y', 0);
        this.bgSVG.setAttribute('width', windowWidth);
        this.bgSVG.setAttribute('height', windowHeight);

        this.domGroup.setAttribute("transform", `translate(${(windowWidth - glpyhWidth) / 2}, ${(windowHeight - glyphHeight) / 2})`);
    }

}

window.onload = () => {
    var fontUrl = 'http://cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff';
    loadFontFromUrl(fontUrl).then((font) => {
        new App(font);
    })
};