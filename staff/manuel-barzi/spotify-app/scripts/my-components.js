// my custom components

function SearchPanel() {
    Component.call(this, 'form');

    var $form = $(this.element);

    $form.removeAttr('style');

    $form.addClass('inline-form');

    var $input = $('<input type="text" class="form-control mb-2 mr-sm-2" id="query" placeholder="Input a text...">');

    var $button = $('<button type="submit" class="btn btn-primary mb-2">Submit</button>');

    $form.append([$input, $button]);

    var _callback;

    $form.submit(function (event) {
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

function ResultsList(title) {
    Component.call(this, 'div');

    var $element = $(this.element);

    $element.removeAttr('style');

    this.$title = $('<h2>' + title + '</h2>');
    this.$title.hide();

    $element.append(this.$title);

    this.$list = $('<div class="list-group">');

    $element.append(this.$list);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();

    this.$title.show();

    results.forEach(function (result) {
        var $a = $('<a href="#/' + result.id + '" class="list-group-item list-group-item-action">' + result.text + '</a>');

        $a.click(function () {
            if (this._callback) {
                this._callback(result.id, result.text);

                this.$list.children('a').removeClass('active');

                $a.addClass('active');
            }
        }.bind(this));

        this.$list.append($a);
    }, this);
};

ResultsList.prototype.clear = function () {
    this.$title.hide();
    this.$list.empty();
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The track title
 * @param {string} image The image URL of the track
 * @param {string} file The file URL of the track
 * @param {string} url The URL of the track
 */
function TrackPlayer(title, image, file, url) {
    Component.call(this,  'div');

    var $element = $(this.element);

    $element.removeAttr('style');

    $element.append('<h2>Track</h2>');

    var $card = $('<div class="card">');

    $element.append($card);

    var $img = $('<img src="' + image + '" class="card-img-top">');

    $card.append($img);

    var $cardBody = $('<div class="card-body">');
    
    $card.append($cardBody);

    $cardBody.append('<h5>' + title + '</h5>');

    $cardBody.append('<p class="card-text">' +
            '<audio controls>' +
                '<source src="' + file + '" type="audio/mpeg">' +
            '</audio>' +
        '</p>'
    );

    var $a = $('<a href="' + url + '" target="_blank" class="btn btn-primary">Open in original player</a>');

    $cardBody.append($a);
}

TrackPlayer.prototype = Object.create(Component.prototype);
TrackPlayer.prototype.constructor = TrackPlayer;

/**
 * 
 * @param {string} id The track id
 */
function SpotifyPlayer(id) {
    Component.call(this, 'section');
    
    var $element = $(this.element);

    $element.removeAttr('style');

    $element.append('<iframe src="https://open.spotify.com/embed?uri=spotify:track:' + id + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
}

SpotifyPlayer.prototype = Object.create(Component.prototype);
SpotifyPlayer.prototype.constructor = SpotifyPlayer;