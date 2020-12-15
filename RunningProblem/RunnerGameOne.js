class RunnerGameOne {
    constructor(_x, _y, _context) {
        this.x = _x;
        this.y = _y;
        this.context = _context;
        this.point_from_1;
        this.point_from_2;
        this.stop = false;
        this.old_x;
        this.old_y;
    }

    init_from(_x, _y) {
        this.point_from_1 = _x;
        this.point_from_2 = _y;
    }

    getCoords() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getOldCoords() {
        return {
            x: this.old_x,
            y: this.old_y
        };
    }
    setCoords(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    setOldCoords(_x, _y) {
        this.old_x = _x;
        this.old_y = _y;
    }
    drawRunner() {
        let c = context.createRadialGradient(this.x, this.y, 0, this.x,
            this.y, size * 10);
        c.addColorStop(0, runnerColor.glowA);
        c.addColorStop(1, runnerColor.glowB);
        this.context.beginPath();
        this.context.fillStyle = c;
        this.context.arc(this.x, this.y, size * 10, 0, Math.PI * 2, true);
        this.context.fill();

        this.context.beginPath();
        this.context.font = '20pt Calibri';
        this.context.fillStyle = '#000000';
        this.context.fillText("e", this.x - 7, this.y + 9);
        this.context.stroke();
    }

    clearRunner() {

        let c = context.createRadialGradient(this.x, this.y, 0, this.x,
            this.y, size * 10);
        c.addColorStop(0, runnerColor.glowA);
        c.addColorStop(1, runnerColor.glowB);
        this.context.beginPath();
        this.context.fillStyle = "rgba(255,255,255,1)";
        this.context.arc(this.x, this.y, size * 10 - 5, 0, Math.PI * 2, true);
        this.context.fill();
    }

    getMoveCoords(dist) {
        var cur_pos = this.getCoords();

        var moves = new Array();

        var good_moves = new Array();
        var count_coords = 0;
        var sum = 0;
        for (var i = cur_pos.x - dist; i < cur_pos.x + dist; i += 1) {
            for (var j = cur_pos.y - dist; j < cur_pos.y + dist; j += 1) {
                if (sqr(i - cur_pos.x) + sqr(j - cur_pos.y) - sqr(dist) <
                    0.01) {
                    count_coords++;
                    moves[count_coords] = {
                        x: i,
                        y: j
                    };
                    sum += geometryUtils.distanceBetweenToPoints(catcherGameOne.getCoords(), {
                        x: i,
                        y: j
                    });
                }
            }
        }
        var ave_dist = sum / count_coords;
        var h = 0;
        for (var i = 1; i < count_coords; i++) {
            if (geometryUtils.distanceBetweenToPoints(catcherGameOne.getCoords(), moves[i
            ]) > ave_dist) {
                good_moves[h++] = moves[i];
            }
        }
        var rand_number = Math.floor(Math.random() * (h - 1) + 1);
        return good_moves[rand_number];
    }

    moveSimple(dist) {
        if (this.stop)
            return;
        this.setOldCoords(this.x, this.y);
        var Crd = this.getMoveCoords(dist);
        this.clearRunner();
        this.setCoords(Crd.x, Crd.y);
        this.drawRunner();
    }
}
