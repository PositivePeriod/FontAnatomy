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