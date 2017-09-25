function Root(pos, r, cornes){
    this.pos = pos;
    this.r = r;
    this.cornes = cornes;
    this.allRadius = r;
    this.update = function(){

    }
    this.draw = function(){
        push();
            noFill();
            stroke(20);
            strokeWeight(1);
            translate(this.pos.x, this.pos.y);
            ellipse(0, 0, this.r * 2);
            var s = 6;
            stroke(20, 70);
            line(0, -s, 0 , s);
            line(-s, 0, s, 0)
        pop();
    }
}

function Branch(root, r, braches, n, inside ){
    this.pos = createVector();
    this.root = root;
    this.r = r;
    this.braches = braches;
    this.n = n;
    this.inside = inside;
    this.angle = PI / 2;
    this.speed = radians(pow(-root.cornes, n)) / resolution;

    this.update = function(){
        this.angle += this.speed;
        var parent = this.n < 1 ? this.root: this.braches[n-1];

        var size = this.inside ? parent.r - this.r : parent.r + this.r;
        this.pos.x = parent.pos.x + size * cos(this.angle);
        this.pos.y = parent.pos.y + size * sin(this.angle);
        
    }
    this.draw = function(){
        push();
            noFill();
            stroke(20);
            strokeWeight(1);
            translate(this.pos.x, this.pos.y);
            ellipse(0, 0, this.r * 2);
            var s = 4;
            stroke(20, 70);
            line(0, -s, 0 , s);
            line(-s, 0, s, 0)
        pop();
    }
}