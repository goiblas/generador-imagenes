var bg = function(p) {
    p.setup = function() {
        var contenedor = document.getElementById('bg');
        p.createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);
    }
    
    p.draw = function(){
        p.background(242);

        for( var i = 0; i < attractors.length; i++) {
            attractors[i].update(p);
            attractors[i].draw(p);
        }
    }
}

var myBg = new p5(bg, 'bg');