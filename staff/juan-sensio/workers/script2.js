/*
    Al ejecutar f1() se ve el mensaje 'start f1',
    3 segundos después se ve el mensaje 'end f1',
    a la vez se ven los mensajes 'start f2' y 'end f2'.

    Pese a definir el setTimeout de f2 a 1 segundo, como 
    f1 aún estaba haciendo cosas no se ha podido ejecutar
    hasta que no ha terminado f1.
*/

f1();

function f1() {
    console.log('start f1');
    setTimeout(f2, 1000);
    var start = Date.now();
    while (Date.now() - start < 3000);
    console.log('end f1');
}

function f2() {
    console.log('start f2');
    console.log('end f2');
}