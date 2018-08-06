f1();

function f1() {
    console.log('begin f1');

    console.log(new Date());

    setTimeout(f2, 1000);

    var start = Date.now();

    while (Date.now() - start < 3000);

    console.log('end f1');
}

function f2() {
    console.log('begin f2');

    console.log(new Date());

    console.log('end f2');
}