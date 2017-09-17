
function mousePressed() {
    if (mouseX < width) {

        if(optionLluvia.checked) {
            clickInicial = createVector(mouseX, mouseY);
            lloviendo = true;
        }


        if(optionRect.checked) {
            if(!makedRect) {
                clickInicial = createVector(mouseX, mouseY);
            } else {
                var w = mouseX - clickInicial.x;
                var h = mouseY - clickInicial.y;
                var col = floor(random(colors.length));
                var shape = new RectShapes(clickInicial, w, h, col);
                shapes.push(shape);
            }
            makedRect =! makedRect;
        }

        if(optionBorrador.checked) {
            for(var i = 0; i < shapes.length; i++) {
                for( var c = 0; c < shapes[i].circles.length; c++){
                    var cir = shapes[i].circles[c];
                    var d = dist(mouseX, mouseY, cir.x, cir.y);
                    if (d < cir.r + 20) {
                        cir.exploted = true;
                    }
                }
            }
        }
    }

}

function addCruz(x, y) {
    var size = 8;
    var posX = x - size / 2;
    var posY = y - size / 2;

    stroke(0);
    strokeWeight(1);
    line(posX, y, posX + size, y);
    line(x, posY, x, posY + size);

}
