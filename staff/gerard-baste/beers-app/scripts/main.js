// Panel del buscador
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

//Panel donde aparecerían los resultados
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
            if (this._callback) this._callback(result.id, result.text, result.imagen);
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
 */
function DetailPanel(title, info, imagen) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var img = document.createElement("img");
    img.src = imagen;

    this.element.appendChild(img);

}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

var search = new SearchPanel();

search.onSearch(function (query) {
    var matching;
    logic.searchBeers(query, function (beers) {
        matching = beers;

        results.updateResults(matching.map(function(result) {
            return {
                id: result.id,
                text: result.name,
            };
        }));

    });

    detailContainer.clear();
});

var results = new ResultsList();

results.onItemClick(function (id, text, imagen) {
    var beerInfo;
    logic.retrieveBeerById(id, function (beer) {
        beerInfo = beer;
        var defaultImg = 'http://images.gofreedownload.net/beer-28380.jpg';
        if (beerInfo.labels === undefined) {
            var detail = new DetailPanel(beerInfo.name, 'The abv of this beer is ' + beerInfo.abv, defaultImg);
        } else {
            var detail = new DetailPanel(beerInfo.name, 'The abv of this beer is ' + beerInfo.abv, beerInfo.labels.medium);
        }

        detailContainer.clear();
        detailContainer.appendChild(detail.element);
    });

});

var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);