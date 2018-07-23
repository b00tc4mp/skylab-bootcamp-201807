/*
    Al ejecutar f1() se ven los mensajes 'start f1' y 'end f1',
    1 segundo desupés se ve 'start f2' y 'end f2'.
*/

f1();

function f1() {
    console.log('start f1');
    setTimeout(f2, 1000);
    console.log('end f1');
}

function f2() {
    console.log('start f2');
    console.log('end f2');
}