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

        a.href = '#';
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
function DetailPanel(title, info, url, abv) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    var p2 = document.createElement('p');
    p2.innerText = abv;
    this.element.appendChild(p2);


    this.element.appendChild(p);
    var img = document.createElement('img');
    img.src = url

    this.element.appendChild(img);
    // var a = document.createElement('a');

    // a.href = 'https://www.google.com/maps?q=' + coords[1] + ',' + coords[0];
    // a.target = '_blank';
    // a.innerText = 'Show in Google Maps';

    // this.element.appendChild(a);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchBeers(query, function (beers) {

        console.log(beers);
        return results.updateResults(beers.map(function (result) {
            return {
                text: result.name,
                id: result.id
                // text: result.name + ' (' + result.borough + ')'
            };
        }));
    });


    detailContainer.clear();
});

var results = new ResultsList();

results.onItemClick(function (id, text) {
    logic.retrieveBeerById(id, function (beers) {
        var detail;
        var defaultPhoto = "http://cdn8.bigcommerce.com/s-ucycv5vmkf/images/stencil/1024x1024/products/4971/5972/GL510LG_1__93816.1478552081.JPG?c=2"
        if (beers.labels == undefined) {
            detail = new DetailPanel(
                beers.name,
                beers.style.description,
                defaultPhoto
            )
        } else {
            detail = new DetailPanel(
                beers.name,
                beers.style.description,
                beers.labels.large,
                beers.abv
            
            )
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