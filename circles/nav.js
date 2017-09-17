var navBubble,
    btnDownload,
    btnEliminarImanes,
    btnDetenerLineas,
    btnReiniciar;

var optionRect,
    optionBorrador,
    optionLluvia;

document.addEventListener('DOMContentLoaded', function(){

    navBubble = document.getElementById('bubble');
    optionRect = document.getElementById('rect');
    optionBorrador = document.getElementById('borrador');
    optionLluvia = document.getElementById('lluvia');

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
   setup();
})