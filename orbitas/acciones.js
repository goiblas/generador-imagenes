var makedCircle = false;
var updatedOrbits = false;
var initPoint;

function mousePressed() {
    if( mouseX < width + 30) {
        updatedOrbits = false;
        for(var i = orbits.length - 1; i >= 0; i--){
            var current = orbits[i];
            if (current){
                var d = dist(current.pos.x, current.pos.y, mouseX, mouseY);
                if (d < current.r ) {
                    updatedOrbits = true;
    
                    if(current.child){
                        orbits.splice(i, 1);
                        console.log(path);
                    } else {
                        if(current.k < 9){
                            current.k++;
                        } else {
                            current.k = 2;
                        }
                    }
                }
            }
        }
    
        if(navGalaxia.checked || navPlaneta.checked){
            if(!makedCircle && !updatedOrbits){
                initPoint = createVector(mouseX, mouseY);
                makedCircle =! makedCircle;
            }
        }

        if(navSnowflake.checked){
            var pos  = createVector(width / 2, 50);
            var arrPoints = [
                createVector(width / 2 - 30, 50),
                createVector(width / 2 - 15, 30),
                createVector(width / 2 + 20, 70),
                createVector(width / 2 + 10, 80)
            ];
    

           snowflakes.push( new Snowflake(
               pos,
               arrPoints,
               p5.Vector.random2D()
           ))
        }

        if(navAsteroide.checked){

            asteroids.push(new Asteroid(
                createVector(mouseX, mouseY),
                createVector(random(-2, 2), random(-2, 2)),
                random(30, 60)));
        }
    }
}

function mouseReleased (){
    if( mouseX < width + 30) {
        if(makedCircle && !updatedOrbits){
            var size = dist(mouseX, mouseY, initPoint.x, initPoint.y);

            if(navGalaxia.checked && size > 30){
                orbits[countOrbits] = new Orbit(initPoint, size, 0, floor(random(3, 6)), true);
                path[countOrbits] = [];
                countOrbits++;
            }

            if(navPlaneta.checked && size > 3){
                planets.push(new Planet(initPoint, size));
            }
            makedCircle =! makedCircle;
        }
    }
}

function drawActions(){

    if(makedCircle){
        var size = dist(initPoint.x, initPoint.y, mouseX, mouseY);
        stroke(cInteractions, 90);
        fill(cInteractions, 10);
        strokeWeight(1);
        
        ellipse(initPoint.x, initPoint.y, size * 2);
        stroke(cInteractions, 20);
        line(initPoint.x, initPoint.y, mouseX, mouseY);        
    }
}
