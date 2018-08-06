'use strict';

/**
 * 
 */
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

    var _onSearch;

    this.element.addEventListener('submit', function(event) {
        event.preventDefault();

        var query = input.value;

        if (query && _onSearch) _onSearch(query);
    });

    this.onSearch = function(callback) {
        _onSearch = callback;
    }
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

/**
 * 
 */
function BeersList() {
    Component.call(this, 'ul');
}

BeersList.prototype = Object.create(Component.prototype);
BeersList.prototype.constructor = BeersList;

BeersList.prototype.clean = function() {
    this.element.innerHTML = '';
}

BeersList.prototype.updateResults = function(beers) {
    
    this.clean();

    beers.forEach(function(beer) {

        var li = document.createElement('li');

        var a = document.createElement('a');
        a.href = '#/' + beer.id;
        a.innerText = beer.name;

        a.addEventListener('click', function(event) {
            event.preventDefault();

              
        })

        li.appendChild(a);

        this.element.appendChild(li);
    }, this);
};

/**
 * 
 */
function BeerListItem() {
    
}

/**
 * 
 */
function BeerDetail() {
    
}



// main

var searchPanel = new SearchPanel();

var beersList = new BeersList();

searchPanel.onSearch(function(query) {
    logic.searchBeers(query, function(beers) {
        beersList.updateResults(beers);
    });
})



document.body.appendChild(searchPanel.element);
document.body.appendChild(beersList.element);
