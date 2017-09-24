function DestinyCircle(pos, r, destino, inside){
    this.pos = pos;
    this.vel = createVector();
    this.acc = createVector();
    this.r = r;
    this.destino = destino;
    this.inside = inside || false;

    this.attract = function(){
        if(this.destino){
            var force = p5.Vector.sub(this.destino.pos, this.pos);
            var dsquared = force.magSq();
    
            var G = 6000;
            var fuerza = G / dsquared;
    
            force.setMag(fuerza);
            this.acc = force;
        }
    }
    
    this.fallen = function(){
        if(this.destino){
            var d = dist( this.destino.pos.x, this.destino.pos.y, this.pos.x, this.pos.y);
            var totalsize = this.destino.r + this.r;
            return (d < totalsize);
        }

        return false;
    }
    
    this.update = function(){
        this.pos.add(this.vel);
        this.vel.add(this.acc)
        this.acc.mult(0);
    }

    this.draw = function(){
        var inc = map(this.r, 0, width, 0.3, 0.01);
        //ellipse(this.pos.x, this.pos.y, this.r * 2);
        for(var i = 0; i <= TWO_PI; i+= inc){
            var x = this.pos.x + sin(i) * this.r;
            var y = this.pos.y + cos(i) * this.r;
            if(this.r > 10){
                noStroke();
                fill(0);
                ellipse(x, y, 2);
            } else {
                stroke(0);
                point(x, y);
            }
        }

    }

}