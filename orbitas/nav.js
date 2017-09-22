var navBubble,
    btnDownload,
    btnEliminarImanes,
    btnReiniciar;

var navGalaxia,
    navPlaneta,
    navAsteroide,
    navSnowflake;

// colores 

// var bg = 51;
// var cPath = 255;
// var cOrbit = 255;
// var cInteractions = 255;

var bg = '#f4f4f4';
var cPath = 0;
var cOrbit = 0;
var cInteractions = 0;

document.addEventListener('DOMContentLoaded', function(){
    navGalaxia = document.getElementById('galaxia');
    navPlaneta = document.getElementById('planeta');
    navAsteroide = document.getElementById('asteroide');
    navSnowflake = document.getElementById('snowflake');

    btnReiniciar = document.getElementById('btn-reiniciar');

    btnDownload = document.getElementById('btn-download');
    btnDownload.addEventListener('click', function(){
        var name ='canvas' + Date.now();
        mySketch.saveCanvas(canvas, name, 'png');
    });

    btnReiniciar.addEventListener('click', function(){
        window.location.reload();
    })
});

window.addEventListener('resize', function(){

})