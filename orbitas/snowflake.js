function Snowflake(pos, points, vel){
    this.pos = pos;
    this.points = points;
    this.vel = vel;
    this.angle = 0;
    this.inc = random(0.01, 0.1);

    this.update = function(){
        this.pos.add(this.vel);
        this.angle += this.inc;
    }

    this.draw = function(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        beginShape();
        noFill();
        stroke(0);
        strokeWeight(1);
        
        for (var i = 0; i < this.points.length; i++) {
            vertex( this.points[i].x, this.points[i].y);
        }
        endShape(CLOSE);

        ellipse(0, 0, 40)

        pop();
    }


}