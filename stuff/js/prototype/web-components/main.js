'use strict';

(function () {
    var compo1 = new Component();
    compo1.backgroundColor('pink');
    compo1.size('100px', '25px');

    var compo2 = new Component();
    compo2.backgroundColor('skyblue');
    compo2.size('25px', '100px');

    document.body.appendChild(compo1.element);
    document.body.appendChild(compo2.element);

    var panel1 = new Panel('hello world');

    document.body.appendChild(panel1.element);

    var confirm = new Confirm('do you want a break now?');
    confirm.backgroundColor('khaki');
    confirm.onAccept(function () {
        alert('please, break!!!');
    });

    document.body.appendChild(confirm.element);

    var confirm2 = new Confirm('do you want a go home now?', 'section');
    confirm2.backgroundColor('orange');
    confirm2.onAccept(function () {
        alert('no, i wanna be here, this is super interesting!');
    });

    document.body.appendChild(confirm2.element);

    var names = ['John', 'Peter', 'Jack', 'Anna', 'Juana', 'Ada'];

    var namesList = new List(names);

    document.body.appendChild(namesList.element);

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var numbersList = new List(numbers);

    document.body.appendChild(numbersList.element);
})();