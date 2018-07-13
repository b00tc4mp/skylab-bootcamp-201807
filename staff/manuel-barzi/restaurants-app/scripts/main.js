// my custom components

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

    this._callback = function () { };

    // this.element.onsubmit = function(event) {
    //     event.preventDefault();

    //     var query = input.value;

    //     this._callback(query);
    // }.bind(this);

    this.element.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = input.value;

        if (query) this._callback(query);
    }.bind(this));
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

SearchPanel.prototype.onSearch = function (callback) {
    this._callback = callback;
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
};

// my logic ...

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(1000);

var search = new SearchPanel();

search.onSearch(function (query) {
    var matching = restaurants.filter(function(restaurant) {
        return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    //console.log(matching);

    results.updateResults(matching.map(function(result) { return result.name; }));
});

var results = new ResultsList();

document.body.appendChild(search.element);
document.body.appendChild(results.element);

// second search

var search2 = new SearchPanel();

search2.onSearch(function (query) {
    var matching = restaurants.filter(function(restaurant) {
        return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    //console.log(matching);

    results2.updateResults(matching.map(function(result) { return result.name; }));
});

var results2 = new ResultsList();

document.body.appendChild(search2.element);
document.body.appendChild(results2.element);

