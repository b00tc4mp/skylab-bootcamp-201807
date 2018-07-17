
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
 * @param {string} imgSrc The image
 */
function DetailPanel(title, info, imgSrc) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var img = document.createElement('img');

    img.src = imgSrc;

    this.element.appendChild(img);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    //var matching = logic.find(query);

    var matching;
    var url = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query;

    logic.searchBeers(url).then(function(response) {
        matching = response;
    
        results.updateResults(matching.map(function (result) {
            return {
                id: result.id,
                text: result.name + ' (' + result.type + ')'
            };
        }));
        
        detailContainer.clear();
    }, function(error) {
        console.error("Failed!", error);
    })
    
});

var results = new ResultsList();

results.onItemClick(function (id, text) {
    var url = 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + id;
    
    logic.searchBeers(url).then(function(response) {    
        var beer = response;
        var detail = new DetailPanel(beer.name, beer.id, beer.labels.medium);
    
        detailContainer.clear();
        detailContainer.appendChild(detail.element);
    
    }, function(error) {
        console.error("Failed!", error);
    })
});

var detailContainer = document.createElement('div');

detailContainer.clear = function() {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

