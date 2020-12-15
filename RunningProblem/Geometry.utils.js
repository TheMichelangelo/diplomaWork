class GeometryUtils {

    Log(text) {
        context.beginPath();
        context.font = '12pt Calibri';
        context.fillStyle = '#000000';
        context.fillText(text, 20, 50 + logTop);
        context.stroke();
        logTop += 20;
    }

    lineCrossing(lineOne, lineTwo) {
        return {
            x: (lineOne.B * lineTwo.C - lineTwo.B * lineOne.C) / (lineOne.A *
                lineTwo.B - lineTwo.A * lineOne.B),
            y: (lineOne.C * lineTwo.A - lineTwo.C * lineOne.A) / (lineOne.A *
                lineTwo.B - lineTwo.A * lineOne.B)
        };
    }

    lineEquation(pointOne, pointTwo) {
        return {
            A: pointOne.y - pointTwo.y,
            B: pointTwo.x - pointOne.x,
            C: pointOne.x * pointTwo.y - pointTwo.x * pointOne.y
        };
    }
    lineAndPointPosition(point, line_point1, line_point2) {
        var tmp = (line_point2.x - line_point1.x) * (point.y - line_point1
            .y) - (line_point2.y - line_point1.y) * (point.x - line_point1.x);
        if (tmp > 0)
            return 1;
        else
            if (tmp < 0)
                return -1;
            else
                return 0;
    }

    InTriangle(point, trPoint1, trPoint2, trPoint3) {
        var f1 = lineAndPointPosition(point, trPoint1, trPoint2);
        var f2 = lineAndPointPosition(point, trPoint2, trPoint3);
        var f3 = lineAndPointPosition(point, trPoint3, trPoint1);

        var checkResult = (f1 == f2) && (f2 == f3);
        return checkResult;
    }

    InConvexHull(point, convPoint1, convPoint2, convPoint3,
        convPoint4) {
        var f1 = lineAndPointPosition(point, convPoint1, convPoint2);
        var f2 = lineAndPointPosition(point, convPoint2, convPoint3);
        var f3 = lineAndPointPosition(point, convPoint3, convPoint4);
        var f4 = lineAndPointPosition(point, convPoint4, convPoint1);
        return ((f1 == f2) && (f2 == f3) && (f3 == f4));
    }
    normalLine(point, line) {
        return {
            A: line.B,
            B: -line.A,
            C: line.A * point.y - line.B * point.x
        };
    }

    getLinePoint(line) {
        if (line.B != 0)
            return {
                x: 0,
                y: -line.C / line.B
            };
        else
            return {
                x: -line.C / line.A,
                y: 0
            };
    }

    pointToLineDistance(point, line) {
        return Math.abs(line.A * point.x + line.B * point.y + line.C) / Math.
            sqrt(sqr(line.A) + sqr(line.B));
    }
    pointInSegmentOnX(x, x1, x2) {
        if (((x > x1) && (x < x2)) || ((x > x2) && (x < x1)))
            return true;
        else
            return false;
    }
    distanceBetweenToPoints(point1, point2) {
        return Math.sqrt(sqr(point1.x - point2.x) + sqr(point1.y - point2.y));
    }
    parallelLine(point, line) {
        var C = -line.A * point.x - line.B * point.y;
        return {
            A: line.A,
            B: line.B,
            C: C
        };
    }
}