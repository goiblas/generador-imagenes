function Bubble(p, pos, col, size) {
    this.pos = pos;
    this.size = 1;
    this.sizeDestino = size || p.random(40, 260);
    this.col = col || p.color('#ff1fdd');
    this.ease = 0.08;

    this.update = function() {
        var diff = this.sizeDestino - this.size;
        if ( diff > 1) {
            this.size += diff * this.ease;
        } 
    }

    this.draw = function(lienzo) {
        lienzo.noStroke();
        lienzo.fill(this.col);
        lienzo.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}
