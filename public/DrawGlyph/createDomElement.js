const NAMESPACE = "http://www.w3.org/2000/svg";

function setSizeElement(element, width, height) {
    element.setAttribute("width", width);
    element.setAttribute("height", height);
}

function setStyleElement(element, stroke, fill) {
    element.setAttribute("stroke", stroke);
    element.setAttribute("fill", fill);
}

export function createSVGElement(width, height, stroke = "#ffffff", fill = "transparent") {
    var element = document.createElementNS(NAMESPACE, "svg");
    setSizeElement(element, width, height);
    setStyleElement(element, stroke, fill);
    return element;
}

export function createPathElement(d, width, height, stroke = "#ffffff", fill = "transparent") {
    var element = document.createElementNS(NAMESPACE, "path");
    element.setAttribute("d", d)
    setSizeElement(element, width, height);
    setStyleElement(element, stroke, fill);
    return element;
}

export function createCircleElement(x, y, r = 3, stroke = "#ffffff", fill = "transparent") {
    var element = document.createElementNS(NAMESPACE, "circle");
    element.setAttribute("cx", x);
    element.setAttribute("cy", y);
    element.setAttribute("r", r);
    setStyleElement(element, stroke, fill);
    return element;
}

export function createRectElement(x, y, width, height, stroke = "#ffffff", fill = "transparent") {
    var element = document.createElementNS(NAMESPACE, "rect");
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    setSizeElement(element, width, height);
    setStyleElement(element, stroke, fill);
    return element;
}

export function createGroupElement(stroke = "#ffffff", fill = "transparent") {
    var element = document.createElementNS(NAMESPACE, "g");
    setStyleElement(element, stroke, fill);
    return element;
}


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function getDataFromCommands(commands) {
    var d = "";
    var dGroup = [];
    var pos, newPos;
    var directPoints = [];
    var indirectPoints = [];
    var additionalLine = [];
    var firstControlPoint, secondControlPoint;
    commands.forEach((command) => {
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
                d = ""
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
                alert(`Warning: Implement command type ${command.type}`);
                break;
            default:
                alert(`Error: Impossible command type ${command.type}`);
                break;
        }
    });
    return [dGroup, directPoints, indirectPoints, additionalLine]
}