var canvas;
var countOrbits = 0;
var planets = [];
var orbits = [];
var path = [];
var asteroids = [];
var snowflakes = [];

var resolution = 30;

function setup(){
    var contenedor = document.getElementById('sketch');
    canvas = createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);
}

function draw(){
    background(color(bg));
    
    asteroidsDraw();
    pathDraw();
    orbitsDraw();
    planetsDraw();
    drawActions();

    drawSnowflakes();

}

function drawSnowflakes(){

    for( var i = snowflakes.length -1; i >= 0; i--){
        snowflakes[i].update();
        snowflakes[i].draw();
    }
}


function asteroidsDraw(){
    for( var i = asteroids.length -1; i >= 0; i--){
        asteroids[i].update();
        asteroids[i].draw();
    }
}

function pathDraw() {

    for( var a = path.length -1; a >= 0; a--){
        
        beginShape();
        noFill();
        stroke(cOrbit, 90);
        strokeWeight(1);

        for (var i = 0; i < path[a].length; i++) {
            vertex( path[a][i].x, path[a][i].y);
        }
        endShape();
    }
}

function orbitsDraw(){

    for( var a = orbits.length -1; a >= 0; a--){
        //console.log(current.pos);
        if( orbits[a]){
            for (var i = 0; i < resolution; i++) {
                var current = orbits[a];
                var tmp = current.pos;
                var count = 1;
                while (current != null) {
                    current.update();
                    current = current.child;
                    if( current){
                        tmp = current.pos;
                        count++;
                    }
                }
                
                if( count > 3){
                    path[a].push(createVector(tmp.x, tmp.y));
                }
            }

            var next = orbits[a];
            while(next != null){
                next.draw();
                next = next.child;
            }
        }
    }
}

function planetsDraw(){
    for( var i = planets.length - 1; i >= 0 ; i--){
        var pla = planets[i];
        if(!pla.destino && orbits.length > 0){
            pla.destino = null;

            for( var a = 0; a < orbits.length; a++){
                if(orbits[a]){
                    var posible = dist(pla.pos.x, pla.pos.y, orbits[a].pos.x, orbits[a].pos.y);
                    if( pla.destino){
                        var actual = dist(pla.pos.x, pla.pos.y, pla.destino.pos.x, pla.destino.pos.y);
                    }
                    if( posible < actual || pla.destino == null) {
                        pla.destino = orbits[a];
                    }
                }
            }
        }

        if(pla.fallen()){
            planets.splice(i, 1);
            pla.destino.addChild(pla.pos, pla.r, true);

        } else {
            pla.attract();
            pla.update();
            pla.draw();
        }
    }

}