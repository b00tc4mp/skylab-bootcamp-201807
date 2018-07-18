// my custom components

function SearchPanel() {
    Component.call(this, 'form');

    var $input =$('<input>').attr('type','search');
    
    $input.attr('type','placeholder');
    $input.text('Input a text...');

    var $button = $('<button>').attr('type','submit').text('Search');
    
   

    $(this.element).append($input);
    $(this.element).append($button);

    var _callback;

    $(this.element).submit(function (event) {
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
   $(this.element).text = '';

    results.forEach(function (result) {
        var li = $('<li>');
        var a = $('<a>');

        $(a).attr("href",'#/+ result.id');
        $(a).text('result.text');
        $(a).on('click', function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        $(this.element).append(li);

        $(li).append(a);
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
function DetailPanel(title, info, image, preview_url) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var img = document.createElement('img');
    img.src = image;
    
    var audio=document.createElement("audio");
    var source=document.createElement("source");
    source.src=preview_url;
    audio.appendChild(source);
    this.element.appendChild(img);
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;