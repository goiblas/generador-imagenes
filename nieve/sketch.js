var canvas;



// copos de nieve
var path = [];
var snowflakes = [];
var snowflakesCreated = [];
var destinyCircles = [];
var resolution = 30;
var branches = [];
var root;
var pintar = false;
var radioAnterior = 0;

function setup(){
    var contenedor = document.getElementById('sketch');
    canvas = createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);

}

function draw(){
    background(color(bg));

    drawSnowflakes();
    if( frozen){
        noStroke();
        fill(250, 85)
        rect(0, 0, width, height);
    }

    drawActions();

    if(root){
        root.update();
        root.draw();
    }
    drawDestinyCircles();
    drawBranches();

}

function drawSnowflakes(){

    if( frameCount % 50 === 0 && snowflakes.length < 30 && !frozen ){
        var newradio = random(0.1, 20);
        snowflakes.push(
            new Snowflake(
                createVector(random(width), -newradio),
                newradio
            )
        )    
    }

    
    for( var i = snowflakes.length -1; i >= 0; i--){
        snowflakes[i].update();
        snowflakes[i].draw();
    }
    drawSnowFlakesCreated();
}

function drawSnowFlakesCreated(){
    for( var i = snowflakesCreated.length -1; i >= 0; i--){
        snowflakesCreated[i].update();
        snowflakesCreated[i].draw();
    }
}

function drawDestinyCircles (){
    if(!pintar){
        for( var i = destinyCircles.length - 1; i >= 0 ; i--){
            var cir = destinyCircles[i];
    
            if(cir.fallen()){
                destinyCircles.splice(i, 1);
    
                branches.push(
                    new Branch(
                        root,
                        cir.r,
                        branches,
                        branches.length,
                        cir.inside
                    )
                )
                if(!cir.inside){
                    root.allRadius += cir.r * 2;
                }else {
                    if(radioAnterior < cir.r){
                        root.allRadius += (cir.r - radioAnterior) * 2;
                    }
                    radioAnterior = cir.r;
                }

            } else {
                cir.attract();
                cir.update();
                cir.draw();
            }
        }
    }
}

function drawBranches (){
    if( branches.length > 0){
        for (var i = 0; i < resolution; i++) {
            for( var j = branches.length - 1; j >= 0 ; j--){
               branches[j].update();
            }
            if( pintar){
                var last = branches[branches.length -1];
                var v = createVector(last.pos.x, last.pos.y);
                path.push(v);

                if(path.length > 50){
                    var d = dist(path[0].x, path[0].y, v.x, v.y);
                    if( d < 0.1 || path.length > 50000) {
                        addSnowflake();
                    }
                }
            } else {
                if(branches.length > 5){
                    pintar = true;
                }
            }
          }

        for( var a = branches.length - 1; a >= 0 ; a--){
            branches[a].draw();
        }

        beginShape();
        stroke(120, 90, 250, 70);
        strokeWeight(1);
        noFill();
        for (var pos of path) {
            vertex(pos.x, pos.y);
        }
        endShape();
    }
}

function addSnowflake() {

    var pos = createVector(root.pos.x, root.pos.y);
    var pathForSend = path.map(function(v){
        var x = v.x - root.pos.x;
        var y = v.y - root.pos.y;
        return createVector(x, y);
    });

    snowflakesCreated.push( new Snowflake(
        pos,
        root.allRadius,
        pathForSend
    ));

    
    path = [];
    destinyCircles = [];
    branches = [];
    root = null;
    pintar = false;
    frozen = false;
    checkNavs();
}