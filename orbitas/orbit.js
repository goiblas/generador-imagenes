var k = 5;

function Orbit(pos, r, n, k, direccion, parent) {
    this.k = k;
    this.pos = pos;
    this.r = r;
    this.parent = parent;
    this.speed = function(){
        if (direccion) {
            return radians(pow(-this.k, n -1)) / resolution;
        } else {
            return radians(pow(this.k, n -1)) / resolution;
        }
    } 
    this.angle = PI / 2;

    this.addChild = function(childpos, childr, speeddirection) {

        if(this.child != null){
            this.child.addChild(childpos, childr, speeddirection);
        } else {
            this.child = new Orbit(childpos, childr, n+1, this.k, speeddirection, this);
        }
    }

    this.update = function(p) { 
        if(this.parent != null) {
            this.angle += this.speed(p);
            var rsum = this.r + this.parent.r;
            this.pos.x = this.parent.pos.x + rsum * cos(this.angle);
            this.pos.y = this.parent.pos.y + rsum * sin(this.angle);
        }
    }
    this.draw = function(p) {
        stroke(cOrbit, 30);
        strokeWeight(1);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.r * 2);
        if( !this.parent){
            var ff = '"Montserrat", sans-serif';
            textFont(ff);
            textStyle(NORMAL);
            textAlign(CENTER);
            fill(cOrbit, 80);
            noStroke();

            if (this.child){
                var fs = 11;
                textSize(fs);
                text('ELIMINAR', pos.x, this.pos.y + fs / 2);

            } else {
                fs = 19;
                textSize(fs);
                text(this.k, this.pos.x, this.pos.y + fs / 2);
            }
        }
    }
}