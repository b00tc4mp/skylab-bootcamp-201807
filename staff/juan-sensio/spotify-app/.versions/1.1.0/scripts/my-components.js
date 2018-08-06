// my custom components

function SearchPanel() {
    Component.call(this, 'form');
    $('body').append(this.element);

    var input = '<input type="search" placeholder="Search for artists"></input>';
    var button = '<button type="submit">Search</button>';
    
    $(this.element).append(input);
    $(this.element).append(button);

    var _callback;

    $(this.element).on('submit', function (event) {
        event.preventDefault();
        var input = $(this.element).find('input');
        var query = $(input).val();
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
    $(this.element).text('Results found: ' + results.length);
    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.name;
        $(a).click(function () {
            if (this._callback) this._callback(result);
        }.bind(this));
        $(li).append(a);
        $(this.element).append(li);
    }, this);
};
ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};


/*
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {string} image The image of the item
 */
/*
function DetailPanel(title, info, image) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var img = document.createElement('img');
    img.src = image;

    this.element.appendChild(img);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;
*/