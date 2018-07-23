/*
    Definimos varios workers.

    Al ejecutar f1() vemos los mensajes de 'start f1' y 
    'end f1'. 2 segundos después se ven los mensajes de
    los workers. Todos a la vez (se han ejecutado en background
    por separado) !!!

    Hasta que no termina f1 no se ven los mensajes.
*/    

var numWorkers = 5;
var workers = new Array(numWorkers);
for(var i=0; i<numWorkers; i++) {
    workers[i] = new Worker('worker2.js');
    workers[i].onmessage = function(e) {
        console.log(e.data);
    };
}

f1();

function f1() {
    console.log('start f1');

    for(var i=0; i<numWorkers; i++)
        workers[i].postMessage('worker '+i);

    var start = Date.now();
    //while (Date.now() - start < 3000);
    console.log('end f1');
}

function f2() {
    console.log('start f2');
    console.log('end f2');
}