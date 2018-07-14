// my custom components

"use strict"
var restaurants = restaurants.slice(0, 1000);


// componente del search
function SearchPanel() {
    Component.call(this, 'form');
    var input = document.createElement('input');
    var button = document.createElement('input');

    this.element.appendChild(input);
    this.element.appendChild(button);
    this.element.onsubmit = function (event) {
        event.preventDefault();
        console.log('hola');
    }
    button.value = 'Search';
    button.type = 'submit';
    input.value = '';
}
SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;
//


// componente ResultsList
// function ResultsList(array) {
//     List.call(this, array);
// }

// ResultsList.prototype = Object.create(Component.prototype);
// ResultsList.prototype.constructor = ResultsList;


// declaramos componentes
var search = new SearchPanel();
var finalResults = new List([]);


// metemos los componentes en la pagina
document.body.appendChild(search.element);
document.body.appendChild(finalResults.element);

// hacemos las funciones para la busqueda
function searchi(array) {
    var results = []
    var userSearch = search.element.children[0].value;
    var re = new RegExp(userSearch, 'i');
    array.forEach(function (obj) {
        if (re.test(obj.name)) {
            results.push(obj);
        } 
    })

    return results;
};

// asignamos la funcion de busqueda cuando apretamos el boton
var results = [];
search.element.onsubmit = function (event) {
    //event.preventDefault();
    results = searchi(restaurants);
    finalResults.update(results);
}

// funcion para update
finalResults.update = function (array) {
    this.element.innerHTML = '';
    array.forEach(function (item) {
        var li = document.createElement('li');

        li.innerHTML = 'The ' + item.name + ' restaurant, with a type of ' + item.cuisine + ' cuisine, is in ' + item.borough + '.';

        this.element.appendChild(li);
    }, this);
    
}
//