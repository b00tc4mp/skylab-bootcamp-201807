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

    this.element.appendChild(a);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

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

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

