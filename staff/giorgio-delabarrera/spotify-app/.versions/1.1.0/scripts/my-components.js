// my custom components

function SearchPanel() {
    Component.call(this, 'form');

    var $element = $(this.element);
    
    var $input = $('<input>')
        .attr('type', 'search')
        .attr('placeholder', 'Input a text...');

    var $button = $('<button></button>')
        .attr('type', 'submit')
        .text('Search');

    $element.append($input);
    $element.append($button);

    var _callback;

    $element.on('submit', function(event) {
        event.preventDefault();

        var query = $input.val();

        if (query && _callback) _callback(query);
    });

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
    
    var $element = $(this.element);

    $element.empty();

    $.each(results, function(index, result) {

        var $li = $('<li></li>');

        var $a = $('<a></a>')
            .attr('href', '#/' + result.id)
            .html(result.text);

        $a.on('click', function() {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        $li.append($a);

        $element.append($li);

    }.bind(this));
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 * @param {string} image The image of the item
 * @param {string} preview The image url to the item cover 
 */
function DetailPanel(title, info, image, preview) {
    Panel.call(this, title, 'section');

    var $element = $(this.element);

    var $p = $('<p></p>')
        .text(info);

    $element.append($p);

    var $img = $('<img>')
        .attr('src', image);

    $element.append($img);

    if (preview) {
        var $audio = $('<audio></audio>')
            .prop('controls', true);
        
        var $source = $('<source></source>')
            .attr('src', preview)
            .attr('type', 'audio/mpeg');

        $audio.append($source);

        $element.append($audio);
    }
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

DetailPanel.prototype.getAudio = function() {
    return $(this.element).find('audio')[0];
}