"use strict"

var restaurants = restaurants.slice(0, 1000);

// componente del search. Barra, boton y la funcion a la que llama al buscar.
function SearchPanel() {
    Component.call(this, 'form');
    var h1 = document.createElement('h1');
    var input = document.createElement('input');
    var button = document.createElement('input');

    this.element.appendChild(h1);
    this.element.appendChild(input);
    this.element.appendChild(button);
    this.element.onsubmit = function (event) {
        event.preventDefault();
    }

    h1.innerHTML = 'Find your favorite Restaurant on New York:';
    input.value = '';
    input.type = 'search';
    button.value = 'Search';
    button.type = 'submit';
}
SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;


// declaramos componentes . Search y los resultados finales
var search = new SearchPanel();
var finalResults = new List([]);


// metemos los componentes en la pagina
document.body.appendChild(search.element);
document.body.appendChild(finalResults.element);

// hacemos las funciones para la busqueda
function searchRestaurant(array) {
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
    event.preventDefault();
    results = searchRestaurant(restaurants);
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