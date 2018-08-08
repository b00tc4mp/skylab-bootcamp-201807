// my presentation logic spotify-app

logic.token = 'BQCt6CcT6mB3cnNB_CAqL46X76CylC05AJ5x1wSeVvO5FdPXPZUItwXaE5cprHqXE_Rc1YVXgJ3BwpTWLw9kQg6MhlD8ppb-7sl7wsTW_DjfaFh2wuXk-Nsgtl71gHu27GwBLnfNCRk';

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

// 

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
    logic.searchArtists(query)
    .then(function(artists) {
        console.log(artists);
    })

    detailContainer.clear();
});

var results = new ResultsList();

results.onItemClick(function (id, text) {
    logic.retrieveBeerById(id, function (artists) {
        var detail;
        var defaultPhoto = "https://images.pexels.com/photos/270318/pexels-photo-270318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        if (artists.labels == undefined) {
            detail = new DetailPanel(
                artists.name,
                defaultPhoto
            )
        } else {
            detail = new DetailPanel(
                artists.name,
                artists.images[1],
            
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