var makedRect = false;
var makedCircles = false;
var lloviendo = false;
var clickInicial;
var borrando = false;

var acciones = function(p) {
    p.setup = function() {
        var contenedor = document.getElementById('acciones');
        p.createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);
    }
    
    p.draw = function(){
        p.clear();

        if(makedRect) {
            addCruz(clickInicial.x, clickInicial.y);
            addCruz(p.mouseX, p.mouseY);
            
            var w = p.mouseX - clickInicial.x;
            var h = p.mouseY - clickInicial.y;
            p.fill(255, 60);
            p.stroke(0, 10);
            p.rect(clickInicial.x, clickInicial.y, w, h);
        }
    
        if(optionBorrador.checked) {
            p.fill(255, 80);
            p.stroke(0, 20);
            p.ellipse(p.mouseX, p.mouseY, 40);
        }
    }

    p.mousePressed = function() {
    if ( p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height && p.mouseX > 0 ) {

        if(optionRect.checked) {
            if(!makedRect) {
                clickInicial = p.createVector(p.mouseX, p.mouseY);
            } else {
                var w = p.mouseX - clickInicial.x;
                var h = p.mouseY - clickInicial.y;
                var shape = new Fillrect(clickInicial, w, h, colorSelected);
                shapes.push(shape);
            }
            makedRect =! makedRect;
        }

        if(optionLineas.checked) {
            var l = new Lineas(p.mouseX, p.mouseY);
            arrLineas.push( l);
        }

        eliminarBurbujas();
    } else {
       makedRect = false;
    }

}

    p.mouseReleased = function(){
        if(makedRect) {
            var w = p.mouseX - clickInicial.x;
            var h = p.mouseY - clickInicial.y;
            var shape = new Fillrect(clickInicial, w, h, colorSelected);
            shapes.push(shape);
            makedRect =! makedRect;
        }
   
    }
    p.mouseDragged = function(){
        eliminarBurbujas();
    }

    function eliminarBurbujas() {
        if(optionBorrador.checked) {
            for(var i = 0; i < shapes.length; i++) {

                for( var c = shapes[i].circles.length - 1; c >= 0 ; c--){
                    var cir = shapes[i].circles[c];
                    var d = p.dist(p.mouseX, p.mouseY, cir.x, cir.y);
                    if (d < cir.r + 20) {
                        shapes[i].maxCircles--;
                        shapes[i].circles.splice(c, 1);
                    }
                }
            }
        }
    }

    function addCruz(x, y) {
        var size = 8;
        var posX = x - size / 2;
        var posY = y - size / 2;

        p.stroke(0);
        p.strokeWeight(1);
        p.line(posX, y, posX + size, y);
        p.line(x, posY, x, posY + size);

    }

}

var myAcciones = new p5(acciones, 'acciones');