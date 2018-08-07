'use strict'

function SearchPanel() {
    Component.call(this, 'form');

    var $input = $('<input>').attr({'type': 'search', 'placeholder': 'Input a text...'}),
        $button = $('<button>').attr('type', 'submit').text('Search');
    $(this.element).append([$input, $button]);

    var _callback;

    $(this.element).on('submit', function (event) {
        event.preventDefault();
        var query = $input.val();
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

    $(this.element).empty();

    results.forEach(function (result) {

        var $li = $('<li>');
        $(this.element).append($li);

        var $a = $('<a>').attr('href', '#/' + result.id).text(result.text);
        $($li).append($a);

        $a.click(function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));
 
    }, this);
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {string} image The image of the item
 */
function DetailPanel(title, info, image) {
    Panel.call(this, title, 'section');

    var $p = $('<p>').text(info),
        $img = $('<img>').attr('src', image);

    $(this.element).append([$p, $img]);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;