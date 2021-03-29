class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(point) {
        return Point(this.x + point.x, this.y + point.y);
    }

    minus(ponit) {
        return Point(this.x - point.x, this.y - point.y);
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getPointAtLength
// https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength

module.exports = Point
