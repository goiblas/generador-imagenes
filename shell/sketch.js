var canvas;

var sketch = function(p) {

    p.setup = function() {
       var contenedor = document.getElementById('sketch');
       canvas = p.createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);
 
    }

    p.draw = function() {
       p.background(55)
    }

    p.mouseClicked = function() {
    
    }


}

var mySketch = new p5(sketch, 'sketch');