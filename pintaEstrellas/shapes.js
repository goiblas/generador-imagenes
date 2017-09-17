function Lineas(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.col = colors[colorSelected];

    this.update  = function(p) {

        var maxWidth = p.width * 3;
        if( this.size < maxWidth) {
            var dif = maxWidth - this.size;
            this.size += dif * 0.03;
        }
    }

    this.draw = function(p){
        p.fill(this.col);
        p.noStroke();
        
        p.push();
        
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
        
        p.translate(this.x, this.y);
        p.rotate(-lineDegrees);
        
        p.rect(0, 0, this.size, 17);
        p.rect(0, -21, this.size, 9);
        p.rect(0, -36, this.size, 6);
        p.rect(0, -48, this.size, 2);
        p.rect(0, -58, this.size, 1);

        p.pop();
    }
}


function Fillrect(pos, w, h, col){
    this.pos = pos;
    this.w = w;
    this.h = h;
    this.col = col;
    this.circles = [];
    this.spaceBetween = 2;
    this.maxCircles = Math.abs(this.w) * Math.abs(this.h) / 350;
    this.circlePerRound = Math.min(this.maxCircles / 25, 2);

    this.update = function(p) {

        var counter = 0;

        while(counter < this.circlePerRound && this.circles.length < this.maxCircles){
            var newC = addNewCircle(this.pos, this.w, this.h, this.circles, this.col, p);
            if( newC ) {
                this.circles.push(newC);
                counter++;
            }
        }
    
        for(var i = 0; i< this.circles.length; i++) {
            var c = this.circles[i];
            if ( c.edges(p)) {
                c.growing = false;
            } else {
                for(var a = 0; a < this.circles.length; a++) {
                    var other = this.circles[a];
                    if( other != c) {
                        var d = p.dist(c.x, c.y, other.x, other.y);
                        if (d < c.r + other.r + this.spaceBetween) {
                            c.growing = false;
                            break;
                        } 
                    }
                }
            }
            
            c.update(p);
        }
    }

    this.drawBottom = function(p) {
        for(var i = 0; i< this.circles.length; i++) {
            if(!this.circles[i].isTop) this.circles[i].draw(p);
        }
    }

    this.drawTop = function(p) {
        for(var i = 0; i< this.circles.length; i++) {
            if(this.circles[i].isTop) this.circles[i].draw(p);
        }
    }
}

function addNewCircle(posicionInicial, anchura, altura, circles, col, p) {
    var x = p.random(posicionInicial.x, posicionInicial.x + anchura);
    var y = p.random(posicionInicial.y, posicionInicial.y + altura);

    var isValid = true;
    for(var i = 0; i< circles.length; i++) {
        var c = circles[i];
        var d = p.dist(x, y, c.x, c.y );
        if (d < c.r + 2) {
            isValid = false;
            break;
        }
    }

    if(isValid ) {
        var isTop = p.random(1) < 0.5 ? true: false;

        return new Circle(x, y, col, isTop);
    }

    return null;
}



function Circle(x, y, col, isTop) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.isTop = isTop;
    this.growing = true;
    this.col = colors[col];

    this.update = function() {
        if ( this.growing ) this.r += 0.4;
    }

    this.edges = function(p){
        return ( this.x + this.r > p.width ||  this.x - this.r < 0 || 
                 this.y + this.r > p.height || this.y - this.r < 0);
    }

    this.draw = function(p) {
        p.noStroke();
        p.fill(this.col);
        p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}
