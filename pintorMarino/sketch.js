var canvas;

var arrLineas = [];
var shapes = [];
var lineDegrees;
var sketch = function(p) {

    p.setup = function() {
       var contenedor = document.getElementById('sketch');
       canvas = p.createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);
       lineDegrees = p.floor(p.random(360));
    }

    p.draw = function() {
        p.background(colors[0]);
    
        for(var i = 0; i < shapes.length; i++){
            shapes[i].update(p);
            shapes[i].drawBottom(p);
        }

        for(var a = 0; a < arrLineas.length; a++){
            arrLineas[a].update(p);
            arrLineas[a].draw(p);
        }

        for(var b = 0; b < shapes.length; b++){
            shapes[b].drawTop(p);
        }
    
    }

}

var mySketch = new p5(sketch, 'sketch');