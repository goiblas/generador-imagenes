var navLines,
    navBubble,
    navAttractor,
    btnDownload,
    btnEliminarImanes,
    btnDetenerLineas,
    btnReiniciar;

document.addEventListener('DOMContentLoaded', function(){
    navLines = document.getElementById('lineas');
    navBubble = document.getElementById('bubble');
    navAttractor = document.getElementById('iman');

    btnReiniciar = document.getElementById('btn-reiniciar');
    btnEliminarImanes = document.getElementById('btn-eliminar-gravedad');
    btnDetenerLineas = document.getElementById('btn-eliminar-lineas');

    btnDetenerLineas.addEventListener('click', function(){
        this.classList.toggle('btn-eliminar--hidden');
        vehicles = [];
        
    });

    btnEliminarImanes.addEventListener('click', function(){
        this.classList.toggle('btn-eliminar--hidden');
        attractors = [];
    });

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
    myBg.setup();

    vehicles = [];
    attractors = [];
    bubbles = [];

    if(!btnDetenerLineas.classList.contains('btn-eliminar--hidden')) {
        btnDetenerLineas.classList.toggle('btn-eliminar--hidden');
    }

    if(!btnEliminarImanes.classList.contains('btn-eliminar--hidden')) {
        btnEliminarImanes.classList.toggle('btn-eliminar--hidden');
    }

})