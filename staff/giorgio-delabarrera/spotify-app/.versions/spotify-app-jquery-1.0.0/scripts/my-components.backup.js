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
    
    // $element.html('');
    $element.empty();
    // this.element.innerHTML = '';

    $.each(results, function(index, result) {

        var $li = $('<li></li>');

        var $a = $('<a>')
            .attr('href', '#/' + result.id)
            .html(result.text);

        $a.on('click', function() {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        $li.append($a);

        $element.append($li);
    });

    // results.forEach(function (result) {
    //     var li = document.createElement('li');
    //     var a = document.createElement('a');

    //     a.href = '#/' + result.id;
    //     a.innerHTML = result.text;
    //     a.onclick = function () {
    //         if (this._callback) this._callback(result.id, result.text);
    //     }.bind(this);

    //     this.element.appendChild(li);

    //     li.appendChild(a);
    // }, this);
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
function DetailPanel(title, info, image, preview) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = info;

    this.element.appendChild(p);

    var img = document.createElement('img');
    img.src = image;

    // img.width = '512';
    // img.height = '512';
    // img.classList.add('test');

    this.element.appendChild(img);

    if (preview) {
        var audio = document.createElement('audio');
        audio.controls = true
        
        var source = document.createElement('source');
        source.src = preview;
        source.type = 'audio/mpeg';

        audio.appendChild(source);

        this.element.appendChild(audio);
    }
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

DetailPanel.prototype.getAudio = function() {
    return this.element.querySelector('audio');
}