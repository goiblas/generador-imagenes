function Asteroid(pos, vel, size){
    this.vel = vel;
    this.pos = pos;
    this.size = size;
    this.col = color('#ffd014');
    this.x1 = this.pos.x;
    this.y1 = this.pos.y - this.size / 2;
    this.x2 = this.pos.x + this.size / 2;
    this.y2 = this.pos.y + this.size / 2;
    this.x3 = this.pos.x - this.size / 2;
    this.y3 = this.pos.y + this.size / 2;
    this.angle = 0;
    this.inc = random(.008,.02);

    this.update = function(){
        this.pos.add(this.vel);
        this.angle += this.inc;
        this.edges();
    }

    this.edges = function(){
        if( this.pos.x + this.size / 2 > width || this.pos.x - this.size / 2 < 0){
            this.vel.x *= -1;
        }
        if( this.pos.y + this.size / 2 > height || this.pos.y - this.size / 2 < 0){
            this.vel.y *= -1;
        }
    }
    this.draw = function(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle)
        noStroke();
        fill(this.col);
        triangle(0, -this.size / 2, this.size / 2, this.size / 2 , -this.size / 2, this.size / 2)
        pop();

    }
}