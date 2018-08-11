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
            if (this._callback) this._callback(result.id, result.text,);
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
function DetailPanel(title, info,description,imageBeer) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    var p2 = document.createElement('p');
    p2.innerText = description;

    var p3= document.createElement('img');
    p3.src=imageBeer;

    this.element.appendChild(p);
    this.element.appendChild(p2);
    this.element.appendChild(p3);

}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic


var search = new SearchPanel();

search.onSearch(function (query) {
    var matching;
    logic.searchBeers(query,function(beers){
        matching = beers;
        results.updateResults(matching.map(function (result) {
            return {
                id: result.id,
                text: result.name
            };
        }));
    });
    detailContainer.clear();
});

var results = new ResultsList();

results.onItemClick(function (id, text, description, image) {
    var beer;
    logic.retrieveBeerById(id,function(beers){
        beer = beers;
        var imageDefault = "data:image/jpeg;base64,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";
        
        if(beer.labels === undefined){
            var detail = new DetailPanel(beer.name, beer.createDate, beer.style.description, imageDefault);
        }else{
            var detail = new DetailPanel(beer.name, beer.createDate, beer.style.description, beer.labels.medium);
        }

        detailContainer.clear();
        detailContainer.appendChild(detail.element);

    });
    
});

var detailContainer = document.createElement('div');

detailContainer.clear = function() {
    this.innerHTML = '';
};

//El element hace referencia a los elementos creados de su constructor
document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

