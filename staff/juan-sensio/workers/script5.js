/*
    Definimos varios workers.

    Al ejecutar f1() vemos los mensajes de 'start f1' y 
    'end f1'. 2 segundos después se ven los mensajes de
    los workers. 

    Hasta que no termina f1 no se ven los mensajes.
*/    

var numWorkers = 5;

f1();

function f1() {
    console.log('start f1');

    setTimeout(function() {
        for(var i=0; i<numWorkers; i++)
            var worker = new Worker('worker1.js');
    }, 2000);

    var start = Date.now();
    //while (Date.now() - start < 3000);
    console.log('end f1');
}
