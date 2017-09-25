var makedCircle = false;
var frozen = false;
var initPoint;

function mousePressed() {
    if( mouseX < width + 30) {

        if(navOrbit.checked || navAddIn.checked || navAddOut.checked){
            if(!makedCircle && snowflakesCreated.length < 6){
                initPoint = createVector(mouseX, mouseY);
                makedCircle =! makedCircle;
                frozen = true;
            }
        }
        
    }
}

function mouseReleased (){

    if( mouseX < width + 30) {
        if(makedCircle){
            var size = dist(mouseX, mouseY, initPoint.x, initPoint.y);

            if(!root){
                if(navOrbit.checked && size > 10){
                    root = new Root(initPoint, size, floor(random(4, 7)));
                };
            } else {
                if(navAddIn.checked && size > 3){
                    destinyCircles.push(
                        new DestinyCircle(
                            initPoint,
                            size,
                            root,
                            true
                        )
                    )
                }
                if(navAddOut.checked && size > 3){
                    destinyCircles.push(
                        new DestinyCircle(
                            initPoint,
                            size,
                            root
                        )
                    )
                }
            }
               
            makedCircle =! makedCircle;
        }
    }

    checkNavs();
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


function checkNavs(){
    nav.classList.toggle('orbitnav', frozen);
}



function fnDibujar(){
    pintar = true;
    destinyCircles = [];
}

function fnEliminar(){
    console.log(('eliminar!!'));
}


function addSnowFlake(){
    var pos  = createVector(mouseX, mouseY);
    
    var arrPoints = [];
    var sides = 6;
    var radio = random(20, 80);
    for( var i = 0; i < sides; i++ ){
        var angel = map(i, 0, sides, 0, TWO_PI);
        var x = radio * cos(angel);
        var y = radio * sin(angel);
        arrPoints.push(createVector(x, y));
    }

    snowflakes.push( new Snowflake(
        pos,
        radio,
        arrPoints
    ));
}