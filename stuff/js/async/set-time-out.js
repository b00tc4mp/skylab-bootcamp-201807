f1();

function f1() {
    console.log('begin f1');

    setTimeout(f2, 1000);

    console.log('end f1');
}

function f2() {
    console.log('begin f2');

    setTimeout(f3, 1000);

    console.log('end f2');
}

function f3() {
    console.log('begin f3');

    setTimeout(f4, 1000);

    console.log('end f3');
}

function f4() {
    console.log('begin f4');

    f5();

    console.log('end f4');
}

function f5() {
    console.log('begin f5');

    setTimeout(f6, 1000);

    console.log('end f5');
}

function f6() {
    console.log('begin f6');

    console.log('end f6');
}
