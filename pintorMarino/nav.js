var navBubble,
    btnDownload,
    btnEliminarImanes,
    btnDetenerLineas,
    btnReiniciar;

var optionRect,
    optionBorrador,
    optionLineas;

var colors = ['#f2f2f2', '#005BC5', '#17F9FF', '#EB7B59', '#E5DDCB', '#A7C5BD', '#e4c784', '#CF4647', '#000'];
var colores1 = ['#554236', '#F77825', '#D3CE3D', '#F1EFA5', '#60B99A', '#DCEDC2', '#FFAAA6', '#f2f2f2', '#000000'];
var colores2 = ['#f2f2f2', '#005BC5', '#17F9FF', '#EB7B59', '#E5DDCB', '#A7C5BD', '#e4c784', '#CF4647', '#000'];

var paletas = [ colores1, colores2, colores2];

var colorSelected = 1;

document.addEventListener('DOMContentLoaded', function(){

navBubble = document.getElementById('bubble');
optionRect = document.getElementById('rect');
optionBorrador = document.getElementById('borrador');
optionLineas = document.getElementById('lineas');

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
    mySketch.setup();
    myAcciones.setup();
});

$(document).ready(function(){
    generatorColorNav();
});

function generatorColorNav(){

    var n = Math.floor (Math.random() * paletas.length);
    colors = paletas[n];

    $ul = $('#colorNav ul');

    colors.forEach(function( col, index ) {
        var check = index === colorSelected ? 'checked': '';
       $('<li> <input type="radio" name="colors" value="' + index + '" id="color'+ index +'"'+ check +'>' +
         '<label for="color'+ index +'" style="background-color:'+ col +';"></label></li>;').appendTo($ul);
    });
};

$(document).on('change', '#colorNav input[type="radio"]', function() {
    colorSelected = this.value;
});