function Planet(pos, r){
    this.pos = pos;
    this.vel = createVector();
    this.acc = createVector();
    this.r = r;
    this.destino = null;

    this.attract = function(){
        if(this.destino){
            var force = p5.Vector.sub(this.destino.pos, this.pos);
            var dsquared = force.magSq();
    
            var G = 4000;
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
        noStroke();
        fill(cOrbit, 20);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

}