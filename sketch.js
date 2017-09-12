var sizeNav = 340;
var vehicles = [];
var attractors = [];
var bubbles = [];

var canvas;

var sketch = function(p) {
    p.setup = function() {
        var contenedor = document.getElementById('sketch');
       canvas = p.createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);

    }

    p.draw = function() {
        p.noSmooth();

        canvas.drawingContext.globalCompositeOperation = "multiply";
        
        for( var b = 0; b < bubbles.length; b++) {
            bubbles[b].update(p);
            bubbles[b].draw(p);
        }

        for (var i = 0; i < vehicles.length; i++) {

            for( var a = 0; a < attractors.length; a++) {
                var force = attractors[a].calculateAttraction(vehicles[i]);
                vehicles[i].applyForce(force);
            }

            vehicles[i].separate(vehicles);
            vehicles[i].connect(vehicles);
            vehicles[i].update();
            vehicles[i].display();
            
            if (vehicles[i].isDead()) {
                vehicles.splice(i, 1);
            }
        }
        

    }

    p.mouseClicked = function() {

        if (p.mouseX < p.width) {

        if (navBubble.checked) {
            var pos = p.createVector(p.mouseX, p.mouseY);
            bubbles.push( new Bubble(p, pos));
        }
        
        if (navAttractor.checked){
            if ( attractors.length === 0) { 
                btnEliminarImanes.classList.toggle('btn-eliminar--hidden');
            }
            var pos = p.createVector(p.mouseX, p.mouseY);
            attractors.push( new Attractor(p, pos));
        }
        
        if (navLines.checked){
            if ( vehicles.length === 0) {
                btnDetenerLineas.classList.toggle('btn-eliminar--hidden'); 
            }           
            for (var i = 0; i < p.random(2, 5); i++) {
                vehicles.push(new Vehicle(p, p.mouseX + p.random(-20, 20), p.mouseY + p.random(-20, 20), p.random(3, 8)));
                }
                
            }
        }
    }
}

var mySketch = new p5(sketch, 'sketch');