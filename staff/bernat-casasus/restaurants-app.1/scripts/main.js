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

var search = new SearchPanel();


search.onSearch(function (query) {
    
    logic.searchBeers(query, function(beer){ 


        results.updateResults(beer.map(function (result) {
            return {
                id: result.id,
                text: result.name 
            };
        }));
    


    });
    detailContainer.clear();

});

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

var results = new ResultsList();

results.onItemClick(function (id, text) {

    logic.retrieveBeerById(id, function(beer){ 


        var detail = new DetailPanel(beer.name,beer.description, beer.labels.medium);


        detailContainer.clear();
        detailContainer.appendChild(detail.element);
    
        // detailContainer.clear();

    });

    // var restaurant = logic.retrieveById(id);

    // var detail = new DetailPanel(restaurant.name, restaurant.address.building + ' ' + restaurant.address.street + ', ' + restaurant.borough + ' ' + restaurant.address.zipcode, restaurant.address.coord);

    // detailContainer.clear();
    // detailContainer.appendChild(detail.element);
});

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {[number]} coords The geodesic coordinates for google maps
 */
function DetailPanel(title, info, image) {
    Panel.call(this, title, 'section');

    var img = document.createElement('img');
    img.src = image;
    this.element.appendChild(img);

    var p = document.createElement('p');
    p.innerText = info || 'Description not available on this item.';
    this.element.appendChild(p);

    var a = document.createElement('a');
    a.href = 'https://www.google.com/search?q=' + title; 
    a.target = '_blank';
    a.innerText = 'Show in Google';
    this.element.appendChild(a);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

var detailContainer = document.createElement('div');
detailContainer.clear = function() {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);