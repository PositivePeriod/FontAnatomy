import * as create from './createDomElement.js'

const NAMESPACE = "http://www.w3.org/2000/svg";

async function loadFontFromUrl(url) {
    var font = await opentype.load(url);
    return font;
};

class App {
    constructor(font) {
        this.font = font;

        this.domSVG = create.createSVGElement(0, 0);
        document.body.appendChild(this.domSVG);
        this.domGroup = create.createGroupElement();
        this.domSVG.appendChild(this.domGroup);

        document.getElementById('inputForm').addEventListener('input', this.getInput.bind(this), false)
        window.addEventListener("resize", this.replace.bind(this), false);
        this.getInput();
        this.replace();
    }

    getInput() {
        this.char = document.getElementById('inputChar').value;
        this.fontSize = parseInt(document.getElementById('inputSize').value);
        if (isNaN(this.fontSize)) {
            return false;
        } else {
            console.log(this.char, this.fontSize);
        }

        var ascender = this.font.ascender;
        var descender = this.font.descender;
        console.log(ascender, descender)

        // Find the real size of glyph
        var tempCharPath = this.font.getPath(this.char, 0, 0, this.fontSize);
        var charBox = tempCharPath.getBoundingBox();

        // Apply the discovered size
        this.charPath = this.font.getPath(this.char, -charBox.x1, -charBox.y1, this.fontSize);
        this.charBox = this.charPath.getBoundingBox();
        console.log(this.charBox)
        
        // glyph = font.charToGlyph(str)
        // path = glyph.getPath()
        // path = glyph.getBoundingBox()

        this.charCommands = this.charPath.commands;
        this.createDOMElements();
    }

    createDOMElements() {
        var child = this.domGroup.lastElementChild;
        while (child) {
            this.domGroup.removeChild(child);
            child = this.domGroup.lastElementChild;
        }
        this.data = create.getDataFromCommands(this.charCommands);
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
        var domIndirect = create.createGroupElement();
        domIndirect.setAttribute('id', 'indirectPoints')
        this.indirectPoints.forEach(point => {
            domIndirect.appendChild(create.createCircleElement(point.x, point.y, 1, '#00ff00'));
        })
        this.domGroup.appendChild(domDirect);
        this.domGroup.appendChild(domIndirect);
    } 

    replace() {
        var glpyhWidth = this.charBox.x2 - this.charBox.x1;
        var glyphHeight = this.charBox.y2 - this.charBox.y1;
        console.log('glyph', glpyhWidth, glyphHeight);

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        console.log('window', windowWidth, windowHeight);

        this.domSVG.setAttribute('x', 0);
        this.domSVG.setAttribute('y', 0);
        this.domSVG.setAttribute('width', windowWidth);
        this.domSVG.setAttribute('height', windowHeight);

        this.domGroup.setAttributeNS(NAMESPACE, 'x', (windowWidth - glpyhWidth) / 2);
        this.domGroup.setAttributeNS(NAMESPACE, 'y', (windowHeight - glyphHeight) / 2);
        this.domGroup.setAttributeNS(NAMESPACE, 'width', glpyhWidth);
        this.domGroup.setAttributeNS(NAMESPACE, 'height', glyphHeight);
        console.log('replace', (windowWidth - glpyhWidth) / 2, (windowHeight - glyphHeight) / 2)
    }

}

window.onload = () => {
    var fontUrl = 'http://cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff';
    loadFontFromUrl(fontUrl).then((font) => {
        new App(font);
    })
};