var Attractor = function (p, pos) {
    this.position = pos;
    this.mass = 8;
    this.size = this.mass * 2;
    this.sizeDestino = this.mass * 10;
    this.opacity = 20;
    this.G = 1;
    this.col = p.color('#ffd014');
    this.sombra = new Wave(p, pos, this.size );

    this.calculateAttraction = function (vehicles) {
        var force = p5.Vector.sub(this.position, vehicles.position);
        var distance = force.mag();
        distance = p.constrain(distance, 20, 30);
        force.normalize();
        var strength = (this.G * this.mass * vehicles.r) / (distance * distance);
        force.mult(strength);
        return force;
    };

    this.update = function(){
        this.sombra.update();
    }

    this.draw = function(lienzo){
        lienzo.noStroke();
        this.sombra.draw(lienzo);

        lienzo.fill(this.col);
        lienzo.ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
    }
};

function Wave(p, pos, size) {
    this.position = pos;
    this.sizeInicial = size;
    this.sizeDestino = size * 5;
    this.size = this.sizeInicial;
    this.opacity = 0.1;

    this.update = function() {

        diff = this.sizeDestino - this.size;
        this.size += diff * 0.04;

        this.opacity = p.map(this.size, this.sizeInicial, this.sizeDestino, 0.3, 0);
        if( diff < 1)  this.size = size;

    }
    
    this.draw = function(lienzo) {
        var col = lienzo.color('rgba(255, 208, 20, '+ this.opacity +')');
        lienzo.noStroke();
        lienzo.fill(col);
        lienzo.ellipse(this.position.x, this.position.y, this.size, this.size);
    }

}