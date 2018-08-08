'use strict';

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

    this.onSubmit = function() {};
    
    this.element.addEventListener('submit', function(event) {
        event.preventDefault();

        var query = input.value;
        
        this.onSubmit(query);
        
    }.bind(this));
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;


function BeersList(items) {
    Component.call(this, 'ul');

    items.forEach(function(item) {
        var li = document.createElement('li');

        var a = document.createElement('a');
        a.href = '#';
        a.innerText = item.name;

        li.appendChild(a);

        this.element.appendChild(li);

    }, this);
}

BeersList.prototype = Object.create(Component.prototype);
BeersList.prototype.constructor = BeersList;

// main

var searchPanel = new SearchPanel();

var containerList = document.createElement('div');

searchPanel.onSubmit = function(value) {

    logic.searchBeers(value, function(beers) {

        containerList.innerHTML = '';

        var beersList = new BeersList(beers);

        containerList.appendChild(beersList.element);
    });
};

document.body.appendChild(searchPanel.element);
document.body.appendChild(containerList);