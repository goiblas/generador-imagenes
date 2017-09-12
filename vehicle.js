function Vehicle(p, x, y, m) {
    this.position = p.createVector(x, y);
    this.r = 1;
    this.maxspeed = 2;
    this.maxforce = 0.2;
    this.acceleration = p.createVector(0, 0);
    this.velocity = p.createVector(p.random(-3, 3), p.random(-4, 4));
    this.col = 0;

    this.applyForce = function (force) {
        var f = p5.Vector.div(force, this.r)
        this.acceleration.add(f);
    }

    this.separate = function (vehicles) {
        var desiredseparation = this.r;
        var sum = p.createVector();
        var count = 0;
        for (var i = 0; i < vehicles.length; i++) {
            var d = p5.Vector.dist(this.position, vehicles[i].position);
            if ((d > 0) && (d < desiredseparation)) {
                var diff = p5.Vector.sub(this.position, vehicles[i].position);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }

    this.connect = function (vehicles) {
        var desiredConnection = this.r * 52;
        for (var i = 0; i < vehicles.length; i++) {
            var d = p5.Vector.dist(this.position, vehicles[i].position);
            if ((d > 0) && (d < desiredConnection)) {
                p.stroke(this.col, 20);
                p.line(this.position.x, this.position.y, vehicles[i].position.x, vehicles[i].position.y)
            }
        }
    }

    this.update = function () {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifespan -= 0.01;
    }

    this.display = function () {
        p.noStroke();
        p.fill(this.col, 90);
        p.push();
        p.translate(this.position.x, this.position.y);
        p.ellipse(0, 0, this.r, this.r);
        p.pop();
    }

    this.isDead = function () {
        if (vehicles.length > 80) {
            return true;
        } else {
            return false;
        }
    }

}