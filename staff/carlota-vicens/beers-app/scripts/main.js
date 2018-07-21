// my custom components
"use strict";

function SearchPanel() {
    Component.call(this, 'form');

    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Input a text...';

    var button = document.createElement('button');
    button.type = 'submit';
    button.innerHTML = 'Search';

    this.element.appendChild(input);
    this.element.appendChild(button);

    var _callback;

    this.element.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = input.value;

        if (query && _callback) _callback(query);
    }.bind(this));

    this.onSearch = function (callback) {
        _callback = callback;
    };
}

SearchPanel.prototype = Object.create(Component.prototype);
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

        li.appendChild(a);
    }, this);
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} abv The graduation of the beer
 * @param {string} description The information about an item
 */
function DetailPanel(title, abv, description) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText ='Graduation: ' + abv + '\n Description: ' + description;

    this.element.appendChild(p);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchBeers(query, function(beers){
        results.updateResults(beers.map(function (result) {
            return {
                id: result.id,
                text: result.name 
            };
        })); 
    });
    
    detailContainer.clear();
});

var results = new ResultsList();

results.onItemClick(function (id) {
    logic.retrieveBeerById(id, function(beers){
        var detail = new DetailPanel(beers.name, beers.abv, beers.description);

        detailContainer.clear();
        detailContainer.appendChild(detail.element);

    });

    
});

var detailContainer = document.createElement('div');

detailContainer.clear = function() {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

