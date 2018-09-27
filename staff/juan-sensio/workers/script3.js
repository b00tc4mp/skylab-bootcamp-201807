/*
    Definimos un worker con su .js separado

    Funciona igual que el script1, se ven los mensajes 'start f1'
    y 'end f1' y al cabo de 2 segundos se crea el worker (que hace
    un console.log)
*/

f1();

function f1() {
    console.log('start f1');
    setTimeout(function() {
        var worker = new Worker('worker1.js');    
    }, 2000);
    console.log('end f1');
}
