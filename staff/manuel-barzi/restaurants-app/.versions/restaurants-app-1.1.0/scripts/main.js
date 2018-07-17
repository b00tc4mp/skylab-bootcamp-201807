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

ResultsList.prototype.updateResults = function (results) {
    this.element.innerHTML = '';

    results.forEach(function (result) {
        var li = document.createElement('li');

        li.innerHTML = result;

        this.element.appendChild(li);
    }, this);
};

// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    var matching = logic.find(query);

    //console.log(matching);

    results.updateResults(matching.map(function (result) { return result.name; }));
});

var results = new ResultsList();

document.body.appendChild(search.element);
document.body.appendChild(results.element);

// second search

var search2 = new SearchPanel();

search2.onSearch(function (query) {
    var matching = logic.find(query);

    //console.log(matching);

    results2.updateResults(matching.map(function (result) { return result.restaurant_id; }));
});

var results2 = new ResultsList();

document.body.appendChild(search2.element);
document.body.appendChild(results2.element);

