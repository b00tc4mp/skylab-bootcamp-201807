// my custom components

//Creamos la funcion constructora de SearchPanel
function SearchPanel() {
    Component.call(this, 'form');
    //Llamamos al componente ubicado en (web-components....)
    //Pasando el this(obligatorio para el call) y form que llegará 
    //al componente como tag
    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Input a text...';

    var button = document.createElement('button');
    button.type = 'submit';
    button.innerHTML = 'Search';
    //Añadimos a SearchPanel.form.appendChild(input)
    this.element.appendChild(input);
    this.element.appendChild(button);

    //Declara una variable interna llamada callback
    var _callback;

    this.element.addEventListener('submit', function (event) {
        //Para que no te redirija a otro sitio
        event.preventDefault();

        var query = input.value;

        if (query && _callback) _callback(query);
        //Bind hace referencia a su scope. En este caso a SearchPanel 
    }.bind(this));

    //El this hace referencia al que hace la llamada ya que en este caso hay dos search(dos buscadores)
    this.onSearch = function (callback) {
        _callback = callback;
    };
}
//Para herencia
SearchPanel.prototype = Object.create(Component.prototype);

//Para recalcar que tipo de objeto es
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.element.innerHTML = '';

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = '#/' + result.id;
        a.innerHTML = result.text;
        a.onclick = function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this);

        this.element.appendChild(li);
        //Este this hace referencia a la ResultList
        li.appendChild(a);
    }, this);
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {[number]} coords The geodesic coordinates for google maps
 */
function DetailPanel(title, info, coords) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var a = document.createElement('a');

    a.href = 'https://www.google.com/maps?q=' + coords[1] + ',' + coords[0]; 
    a.target = '_blank';
    a.innerText = 'Show in Google Maps';
    console.log(this.element);
    this.element.appendChild(a);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
restaurants.splice(1000);

var search = new SearchPanel();

search.onSearch(function (query) {
    var matching = logic.find(query);

    results.updateResults(matching.map(function (result) {
        return {
            id: result.restaurant_id,
            text: result.name + ' (' + result.borough + ')'
        };
    }));

    detailContainer.clear();
});

var results = new ResultsList();

results.onItemClick(function (id, text) {
    var restaurant = logic.retrieveById(id);

    var detail = new DetailPanel(restaurant.name, restaurant.address.building + ' ' + restaurant.address.street + ', ' + restaurant.borough + ' ' + restaurant.address.zipcode, restaurant.address.coord);

    detailContainer.clear();
    detailContainer.appendChild(detail.element);
});

var detailContainer = document.createElement('div');

detailContainer.clear = function() {
    this.innerHTML = '';
};

//El element hace referencia a los elementos creados de su constructor
document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

