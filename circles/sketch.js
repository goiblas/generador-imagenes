var shapes = [];
var particles = [];
var colors = ['#005BC5', '#17F9FF', '#EB7B59', '#E5DDCB', '#A7C5BD', '#CF4647'];

var makedRect = false;
var makedCircles = false;
var lloviendo = false;
var clickInicial;

function setup() {
    var contenedor = document.getElementById('sketch');
    createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);

    matter.makeBarrier(width / 2, -50, width, 100);
    matter.makeBarrier(width / 2, height + 50, width, 100);
    matter.makeBarrier(-50, height / 2, 100, height);
    matter.makeBarrier(width + 50, height / 2, 100, height);
    
};

function draw() {
    background(242);
    fill(10);
    for(var a = 0; a < particles.length; a++){
        particles[a].show();
    }

    for(var i = 0; i < shapes.length; i++){
        shapes[i].update();
        shapes[i].draw();
    }


    // interaciones
    if(lloviendo) {
        
        if(particles.length < 100) {
            var posX = random(-50, 50) + clickInicial.x;
            particles.push(new Particle(posX, clickInicial.y));

        } else {
            lloviendo = false;
        }
    }   


    if(makedRect) {
        addCruz(clickInicial.x, clickInicial.y);
        addCruz(mouseX, mouseY);
        
        var w = mouseX - clickInicial.x;
        var h = mouseY - clickInicial.y;
        fill(255, 60);
        stroke(0, 10);
        rect(clickInicial.x, clickInicial.y, w, h);
    }

    if(optionBorrador.checked) {
        fill(255, 80);
        stroke(0, 20);
        ellipse(mouseX, mouseY, 40);
    }
}

