/*
    Definimos un worker con su .js separado

    Al ejecutar f1() se ve el mensaje 'start f1',
    3 segundos después se ve el mensaje 'end f1',
    a la vez se ve el mensaje del worker.

    Anque el worker corra en un hilo separado, hasta que 
    no termina f1 el console.log no funciona !!!
*/

f1();

function f1() {
    console.log('start f1');
    setTimeout(function() {
        var worker = new Worker('worker1.js');    
    }, 2000);
    var start = Date.now();
    while (Date.now() - start < 3000);
    console.log('end f1');
}