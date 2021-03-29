const Point = require('./point.js');

var testInput = [{
        x: [3, 3, 2, 2, 3, 3, 6, 6, 9, 9, 4, 4],
        y: [2, 4, 4, 5, 5, 6, 6, 5, 5, 3, 3, 2]
    },
    {
        x: [0, 2, 2, 1, 1, 0, 0],
        y: [0, 0, 1, 1, 2, 2, 0]
    }
];


function polygonArea(pts) {
    var area = 0;
    for (let i = 0; i < pts.length - 1; i++) {
        area += (pts[i + 1].x + pts[i].x) * (pts[i + 1].y - pts[i].y);
    }
    area += (pts[0].x + pts[pts.length - 1].x) * (pts[0].y - pts[pts.length - 1].y);
    return area / 2;
}

function testPolygonArea() {
    testInput.forEach((value, index) => {
        var xPts = value.x;
        var yPts = value.y;
        var Pts = [];
        for (let i = 0; i < Math.min(xPts.length, yPts.length); i++) {
            Pts.push(new Point(xPts[i], yPts[i]));
        }

        var area = polygonArea(Pts);
        Pts.reverse();
        var areaReverse = polygonArea(Pts);
        console.log(`${index+1} Test | ${area} ${areaReverse}`);
    })
}

testPolygonArea()

// node ./public/PolygonArea/area.js