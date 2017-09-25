function Snowflake(pos, r, points){
    this.points = points || false;
    this.pos = pos;
    this.vel = createVector(0, random(0.2, 1.5));
    this.angel = 0;
    this.inc = random(1) > 0.5 ? random(0.005, 0.03): random(-0.005, -0.03);
    this.r = r;
    this.alfa = random(20, 60);
    this.col = 51;

    this.max = 150;
    this.ease = 0.01;
    this.scale = random(60, 70) / r;
    this.tmpscale = 1;
    this.closed = random(1) > 0.5;
 
    // oscilation

    this.a = 0;
    this.limitPositive = pos.x + 100;
    this.limitNegative = pos.x - 100;

    this.update = function(){
        if(!frozen){
            this.oscilation();
            this.isout();
    
            this.pos.add(this.vel);
            this.angel += this.inc;
            if(this.points){
                if( this.scale < this.tmpscale){
                    var dif = this.tmpscale - this.scale;
                    this.tmpscale -= (dif * this.ease) * 10;
                }
            }
        }
    }

    this.isout = function(){
        if(this.pos.y - this.r > height ){
            var x = random(width);
            this.pos = createVector(x, -this.max);
            this.angel = 0;
            this.scale = 1 / (r / random(50, this.max)) 
            this.closed = random(1) > 0.5;
        }
    }

    this.oscilation = function(){
        this.pos.x += sin(this.a);
        this.a += 0.01;
    }
    
    this.draw = function(){
        push();
       
        translate( this.pos.x, this.pos.y);
        rotate(this.angel);

        if(this.points){
            scale(this.tmpscale);
            beginShape();

            if( this.closed){
                fill(this.col);
                noStroke();
            } else {
                noFill();
                stroke(this.col);
                strokeWeight(1);
            }
            
            for (var i = 0; i < this.points.length; i++) {
                var x = this.points[i].x;
                var y = this.points[i].y;
    
                vertex(x, y);
            }
            endShape(CLOSE);

        } else {
            noStroke();
            fill(this.col, this.alfa);
            ellipse(0, 0, this.r * 2)
        }


        pop();
    }

}