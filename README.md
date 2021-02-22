# FontAnatomy
koko
https://social.msdn.microsoft.com/Forums/sqlserver/en-US/b32e47a9-d86c-473a-9449-a7f5c202463c/visual-studio-code-just-deleted-all-my-files?forum=visualstudiogeneral


* {
    user-select: none;
    outline: 0;
    margin: 0;
    padding: 0;
}

html {
    width: 100%;
    height: 100%;
}

body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ff0000;
}

svg {
    background-color: #001aff;
}

rect {
    background-color: #00ffb3;
}

path {
    background-color: #ff6600;
}

circle {
    background-color: #ff00ff;
}


export function createSVGElement(width, height, stroke = '#"ffffff"', fill = 'transparent') {
    var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.setAttribute("width", width);
    element.setAttribute("height", height);
    element.setAttribute("stroke", stroke);
    element.setAttribute("fill", fill);
    return element;
}

export function createPathElement(d, width, height, stroke = '#ffffff', fill = 'transparent') {
    var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttribute("d", d)
    element.setAttribute("width", width);
    element.setAttribute("height", height);
    element.setAttribute("stroke", stroke);
    element.setAttribute("fill", fill);
    return element;
}

export function createCircleElement(x, y, r = 3, stroke = '#ffffff', fill = 'transparent') {
    var element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.setAttribute("cx", x);
    element.setAttribute("cy", y);
    element.setAttribute("r", r);
    element.setAttribute("stroke", stroke);
    element.setAttribute("fill", fill);
    return element;
}

export function createRectElement(x1, x2, y1, y2, stroke = '#ffffff', fill = 'transparent') {
    var element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    element.setAttribute("x", x1);
    element.setAttribute("y", y1);
    element.setAttribute("width", x2 - x1);
    element.setAttribute("height", y2 - y1);
    element.setAttribute("stroke", stroke);
    element.setAttribute("fill", fill);
    return element;
}

export function createGroupElement(stroke = '#ffffff', fill = 'transparent') {
    var element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    element.setAttribute("stroke", stroke);
    element.setAttribute("fill", fill);
    return element;
}


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function getDataFromCommands(commands) {
    var d = '';
    var dGroup = [];
    var pos, newPos;
    var directPoints = [];
    var indirectPoints = [];
    var additionalLine = [];
    var firstControlPoint, secondControlPoint;
    commands.forEach((command, index) => {
        switch (command.type) {
            case "M":
            case "L":
                d += `${command.type} ${command.x} ${command.y}`;
                pos = new Point(command.x, command.y);
                directPoints.push(pos);
                break;
            case "C":
                d += `${command.type} ${command.x1} ${command.y1} ${command.x2} ${command.y2} ${command.x} ${command.y}`;
                firstControlPoint = new Point(command.x1, command.y1);
                secondControlPoint = new Point(command.x2, command.y2);
                newPos = new Point(command.x, command.y);
                indirectPoints.push(firstControlPoint);
                indirectPoints.push(secondControlPoint);
                directPoints.push(newPos);
                additionalLine.push([pos, firstControlPoint]);
                additionalLine.push([secondControlPoint, newPos]);
                pos = newPos;
                break;
            case "Z":
            case "z":
                d += `${command.type}`
                dGroup.push(d);
                d = ''
                break;
            case "Q":
                d += `${command.type} ${command.x1} ${command.y1} ${command.x} ${command.y}`;
                firstControlPoint = new Point(command.x1, command.y1);
                newPos = new Point(command.x, command.y);
                indirectPoints.push(firstControlPoint);
                directPoints.push(newPos);
                additionalLine.push([pos, firstControlPoint]);
                additionalLine.push([firstControlPoint, newPos]);
                pos = newPos;
                break;
            case "m":
            case "l":
            case "H":
            case "h":
            case "V":
            case "v":
            case "c":
            case "S":
            case "q":
            case "T":
            case "t":
            case "A":
            case "a":
                break;
            default:
                console.log(`Error Cannot enter here ${command.type}`);
                break;
        }
    });
    return [dGroup, directPoints, indirectPoints, additionalLine]
}




import * as create from './createDomElement.js'

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

        this.charPath = this.font.getPath(this.char, 0, 160, this.fontSize);
        this.charBox = this.charPath.getBoundingBox();

        // this.charGlyph = this.font.charToGlyph(this.char);
        //this.charPath = this.charGlyph.getPath(0, 0, this.fontSize);
        // this.charBox = this.charGlyph.getBoundingBox();
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
        console.log(this.charBox);
        var glpyhWidth = this.charBox.x2 - this.charBox.x1;
        var glyphHeight = this.charBox.y2 - this.charBox.y1;
        console.log('glyph', glpyhWidth, glyphHeight);
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        console.log('window', windowWidth, windowHeight);
        this.domGroup.style.transform = `translate(${this.charBox.x1, 0})`;

        this.domSVG.setAttribute('x', (windowWidth - glpyhWidth) / 2);
        this.domSVG.setAttribute('y', (windowHeight - glyphHeight) / 2);
        this.domSVG.setAttribute('width', glpyhWidth);
        this.domSVG.setAttribute('height', glyphHeight);
        console.log('replace', (windowWidth - glpyhWidth) / 2, (windowHeight - glyphHeight) / 2)
    }

}

window.onload = () => {
    var fontUrl = 'http://cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff';
    loadFontFromUrl(fontUrl).then((font) => {
        new App(font);
    })
};


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>Font Anatomy</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
</head>

<body>
    <form id='inputForm'>
        <input type="text" id="inputChar" maxlength="8" size="10" value='A'>
        <input type="number" id="inputSize" size="10" value='200'>
    </form>
    <script type="module" src="app.js"></script>
</body>

</html>






