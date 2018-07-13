'use strict';

function Component() {
    var element = document.createElement('div');
    this.element = element;

    // element.style.width = '100px';
    // element.style.height = '100px';
    this.size(100, 100);

    element.style.borderColor = 'black';
    element.style.borderStyle = 'solid';
    element.style.borderWidth = '1px';

}

Component.prototype.backgroundColor = function (color) {
    this.element.style.backgroundColor = color;
};

Component.prototype.size = function (w, h) {
    this.element.style.width = w + 'px';
    this.element.style.height = h + 'px';
}

function Panel(title) {
    Component.call(this);

    var h1 = document.createElement('h1');
    h1.innerHTML = title;

    this.element.appendChild(h1);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

function Confirm(title) {
    Panel.call(this, title);

    this.element.style.width = 'auto';
    this.element.style.height = 'auto';

    var accept = document.createElement('button');
    accept.innerHTML = 'Accept';

    var cancel = document.createElement('button');
    cancel.innerHTML = 'Cancel';

    var self = this;

    cancel.addEventListener('click', function() {
        // this.element.style.display = 'none';
        self.element.style.display = 'none';
    });

    this.element.appendChild(accept);
    this.element.appendChild(cancel);
}

Confirm.prototype = Object.create(Panel.prototype);
Confirm.prototype.constructor = Confirm;

Confirm.prototype.onAccept = function(callback) {
    this.element.children[1].addEventListener('click', callback);
};


// ...

(function () {

    var compo1 = new Component();
    compo1.backgroundColor('pink');
    compo1.size(100, 25);

    var compo2 = new Component();
    compo2.backgroundColor('skyblue');
    compo2.size(25, 100);

    document.body.appendChild(compo1.element);
    document.body.appendChild(compo2.element);

    var panel1 = new Panel('hello world');

    document.body.appendChild(panel1.element);

    var confirm = new Confirm('do you want a break now?');
    confirm.backgroundColor('khaki');
    confirm.onAccept(function() { 
        alert('please, break!!!');
    });

    document.body.appendChild(confirm.element);

    var confirm2 = new Confirm('do you want a go home now?');
    confirm2.backgroundColor('orange');
    confirm2.onAccept(function() {
        alert('no, i wanna be here, this is super interesting!');
    });

    document.body.appendChild(confirm2.element);
})();