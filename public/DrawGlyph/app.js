import * as create from './createDomElement.js'

const CircleRadius = 3;

async function loadFontFromUrl(url) {
    var font = await opentype.load(url);
    return font;
};

class App {
    constructor(font) {
        this.font = font;

        this.bgSVG = create.createSVGElement(0, 0);
        this.bgSVG.setAttribute('id', 'bgSVG');
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
        this.str = document.getElementById('inputStr').value;
        var fontSize = parseInt(document.getElementById('inputSize').value);
        if (isNaN(fontSize)) {
            return false;
        } else {
            this.fontSize = fontSize;
        }

        // Find the real size of glyph
        var tempStrPath = this.font.getPath(this.str, 0, 0, this.fontSize);
        var strBox = tempStrPath.getBoundingBox();

        // Apply the discovered size
        this.strPath = this.font.getPath(this.str, -strBox.x1, -strBox.y1, this.fontSize);
        this.strBox = this.strPath.getBoundingBox();

        // glyph = font.charToGlyph(str)
        // path = glyph.getPath()
        // path = glyph.getBoundingBox()
    }

    createDOMElements() {
        while (this.domGroup.hasChildNodes()) {
            var child = this.domGroup.lastElementChild;
            this.domGroup.removeChild(child);
        }

        this.data = create.getDataFromCommands(this.strPath.commands);
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
            var circle = create.createCircleElement(point.x, point.y, CircleRadius);
            circle.classList.add('direct');
            domDirect.appendChild(circle);
        })
        this.domGroup.appendChild(domDirect);

        var domIndirect = create.createGroupElement();
        domIndirect.setAttribute('id', 'indirectPoints');
        this.indirectPoints.forEach(point => {
            var circle = create.createCircleElement(point.x, point.y, CircleRadius);
            circle.classList.add('indirect');
            domIndirect.appendChild(circle);
        })
        this.domGroup.appendChild(domIndirect);
    }

    replaceGlyph() {
        var existEdge = this.domGroup.querySelector(".edge");
        if (existEdge) {
            existEdge.remove();
        }        
        var glpyhWidth = this.strBox.x2 - this.strBox.x1;
        var glyphHeight = this.strBox.y2 - this.strBox.y1;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        console.log('glyph', glpyhWidth, glyphHeight);
        console.log('window', windowWidth, windowHeight);

        this.bgSVG.setAttribute('x', 0);
        this.bgSVG.setAttribute('y', 0);
        this.bgSVG.setAttribute('width', windowWidth);
        this.bgSVG.setAttribute('height', windowHeight);

        var posX = (windowWidth - glpyhWidth) / 2;
        var poxY = (windowHeight - glyphHeight) / 2;
        this.domGroup.setAttribute("transform", `translate(${posX}, ${poxY})`);

        var edge = create.createRectElement(0, 0, glpyhWidth, glyphHeight);
        edge.classList.add('edge')
        this.domGroup.appendChild(edge);
    }

}

window.onload = () => {
    var fontUrl = 'http://cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff';
    loadFontFromUrl(fontUrl).then((font) => {
        new App(font);
    })
};