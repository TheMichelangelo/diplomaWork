class Catcher {
    constructor(_x, _y, _context) {
        this.x = _x;
        this.y = _y;
        this.context = _context;
        this.stop = false;
    }
    getCoords() {
        return {
            x: this.x,
            y: this.y
        };
    }

    setCoords(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    drawCatcher() {

        let c = this.context.createRadialGradient(this.x, this.y, 0, this.
            x, this.y, size * 10);
        c.addColorStop(0, catcherColor.glowA);
        c.addColorStop(1, catcherColor.glowB);
        this.context.beginPath();
        this.context.fillStyle = c;
        this.context.arc(this.x, this.y, size * 10, 0, Math.PI * 2, true);
        this.context.fill();

        this.context.beginPath();
        this.context.font = '20pt Calibri';
        this.context.fillStyle = '#000000';
        this.context.fillText("p", this.x - 6, this.y + 9);
        this.context.stroke();
    }

    clearCatcher() {

        let c = context.createRadialGradient(this.x, this.y, 0, this.x,
            this.y, size * 10);
        c.addColorStop(0, catcherColor.glowA);
        c.addColorStop(1, catcherColor.glowB);
        this.context.beginPath();
        this.context.fillStyle = "rgba(255,255,255,1)";
        this.context.arc(this.x, this.y, size * 10 - 5, 0, Math.PI * 2, true);
        this.context.fill();

    }

    moveParallel(Esc, dist) {

        if (this.stop)
            return;

        var nl = geometryUtils.lineEquation(this.getCoords(), Esc.
            getOldCoords());
        var line = geometryUtils.parallelLine(Esc.getCoords(), nl);

        var b1 = - ((nl.C - line.C) * line.A);
        var a = sqr(line.B) + sqr(line.A);
        var c = sqr(nl.C - line.C) - sqr(dist) * sqr(line.B);
        var D = sqr(b1) - a * c;
        if (D < 0)
            D = 0;

        var x1 = (-b1 + Math.sqrt(D)) / a + this.x;
        var x2 = (-b1 - Math.sqrt(D)) / a + this.x;
        if (line.B != 0) {
            var y1 = - (line.A * x1) / line.B - line.C / line.B;
            var y2 = - (line.A * x2) / line.B - line.C / line.B;
        } else {
            var y1 = this.y;
            var y2 = this.y;
        }

        if (geometryUtils.distanceBetweenToPoints(Esc.getCoords(), {
            x: x1,
            y
                : y1
        }) < geometryUtils.distanceBetweenToPoints(Esc.getCoords(), {
            x: x2,
            y: y2
        })) {
            var x = x1;
            var y = y1;
        } else {
            var x = x2;
            var y = y2;
        }
        this.clearCatcher();
        this.setCoords(x, y);
        this.drawCatcher();
        var eps = 10;
        if (geometryUtils.distanceBetweenToPoints(Esc.getCoords(), this.
            getCoords()) < eps) {
            this.stop = true;
            Esc.stop = true;
        }
    }

}
