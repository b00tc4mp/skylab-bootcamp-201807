// my custom components

function SearchPanel() {
    
    Component.call(this);

    // input
    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Input a text...';

    // button
    var button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Search';

    // form
    this.element = document.createElement('form');
    this.element.appendChild(input);
    this.element.appendChild(button);

    this._onSearch = function() {};

    this.element.addEventListener('submit', function(event) {
        event.preventDefault();
        var query = input.value;
        
        if (query) this._onSearch(query);

    }.bind(this));
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

SearchPanel.prototype.onSearch = function(callback) {
    this._onSearch = callback;
};


function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function(results) {
    this.element.innerHTML = '';

    results.forEach(function(result) {
        var li = document.createElement('li');

        li.innerHTML = result;

        this.element.appendChild(li);
    }, this);
}


// my logic ...

var searchPanel = new SearchPanel();

var resultsList = new ResultsList();

searchPanel.onSearch(function(query) {
    var matching = restaurants.filter(function(restaurant) {
        return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    console.log(matching);
    
    resultsList.updateResults(matching.map(function(restaurant) { return restaurant.name; }));
});

document.body.appendChild(searchPanel.element);
document.body.appendChild(resultsList.element);
