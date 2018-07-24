'use strict';

/**
 * Web Components lib
 * 
 * @author manuelbarzi
 * @version 1.0.0
 */

/**
 * Constructs a component
 */
function Component(tag) {
    var element = document.createElement(tag || 'div');
    this.element = element;

    // element.style.width = '100px';
    // element.style.height = '100px';
    this.size('auto', 'auto');

    // element.style.borderColor = 'black';
    // element.style.borderStyle = 'solid';
    // element.style.borderWidth = '1px';
    //element.style.backgroundColor = 'silver';

}

Component.prototype.backgroundColor = function (color) {
    this.element.style.backgroundColor = color;
};

Component.prototype.size = function (width, height) {
    this.element.style.width = width;
    this.element.style.height = height;
}

/**
 * Constructs a panel
 * 
 * @param {string} title - The title of the panel
 */
function Panel(title, tag) {
    Component.call(this, tag);

    var h1 = document.createElement('h1');
    h1.innerHTML = title;

    this.element.appendChild(h1);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

/**
 * Constructs a confirm panel
 * 
 * @param {string} title The title of the confirm
 */
function Confirm(title, tag) {
    Panel.call(this, title, tag);

    var accept = document.createElement('button');
    accept.innerHTML = 'Accept';

    var cancel = document.createElement('button');
    cancel.innerHTML = 'Cancel';

    var self = this;

    cancel.addEventListener('click', function () {
        // this.element.style.display = 'none';
        self.element.style.display = 'none';
    });

    this.element.appendChild(accept);
    this.element.appendChild(cancel);
}

Confirm.prototype = Object.create(Panel.prototype);
Confirm.prototype.constructor = Confirm;

/**
 * Performs and operation on accept
 * 
 * @param {function} callback The action to be performed on clicking accept button
 */
Confirm.prototype.onAccept = function (callback) {
    this.element.children[1].addEventListener('click', callback);
};

/**
 * Constructs a list of items
 * 
 * @param {*} array The item values
 */
function List(array) {
    Component.call(this, 'ul');

    // for (var i in array) {
    //     var li = document.createElement('li');

    //     li.innerHTML = array[i];

    //     this.element.appendChild(li);
    // }

    // var self = this;

    // array.forEach(function(item) {
    //     var li = document.createElement('li');

    //     li.innerHTML = item;

    //     self.element.appendChild(li);
    // });

    // array.forEach(function (item) {
    //     var li = document.createElement('li');

    //     li.innerHTML = item;

    //     this.element.appendChild(li);
    // }.bind(this));

    // function addItem(item) {
    //     var li = document.createElement('li');

    //     li.innerHTML = item;

    //     this.element.appendChild(li);
    // }

    // array.forEach(addItem.bind(this));

    // Array.prototype.forEach.call(array, function (item) {
    //     var li = document.createElement('li');

    //     li.innerHTML = item;

    //     this.element.appendChild(li);
    // }, this);

    array.forEach(function (item) {
        var li = document.createElement('li');

        li.innerHTML = item;

        this.element.appendChild(li);
    }, this);
}

List.prototype = Object.create(Component.prototype);
List.prototype.constructor = List;