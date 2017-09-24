var navBubble,
    btnDownload,
    btnEliminarImanes,
    btnReiniciar;

var navOrbit,
    navAddOut,
    navAddIn;

var nav;

var btnDibujar,
    btnEliminar;

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
    navOrbit = document.getElementById('orbit');
    navAddOut = document.getElementById('addOut');
    navAddIn = document.getElementById('addIn');

    // navs
    nav = document.getElementById('nav');


    // botones
    btnDibujar = document.getElementById('dibujar');
    btnDibujar.addEventListener('click', fnDibujar);

    // btnEliminar = document.getElementById('eliminar');
    // btnEliminar.addEventListener('click', fnEliminar);


    btnReiniciar = document.getElementById('btn-reiniciar');

    btnDownload = document.getElementById('btn-download');
    btnDownload.addEventListener('click', function(){
        var name ='canvas' + Date.now();
        saveCanvas(canvas, name, 'png');
    });

    btnReiniciar.addEventListener('click', function(){
        window.location.reload();
    })
});

window.addEventListener('resize', function(){

})
