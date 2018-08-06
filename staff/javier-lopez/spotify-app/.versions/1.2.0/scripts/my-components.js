// my custom components

function SearchPanel() {

    //Creating nav
    Component.call(this, 'nav');
    var $nav = $(this.element);
    $nav.removeAttr('style');
    $nav.addClass('navbar navbar-light bg-dark');

    //Creating div
    var $div = $('<div class="imageHeader">');
    $nav.append($div);

    //Putting image inside imageHeader
    var $img = $('<img src="https://image.flaticon.com/icons/png/512/174/174872.png" width="40" height="40" class="d-inline-block align-top">');
    $div.append($img);

    //Creating Form
    var $form = $('<form class="form-inline my-2 my-lg-0">');
    $nav.append($form);

    //Putting input and button inside form
    var $input = $('<input class="form-control mr-sm-2" type="search" placeholder="Input some artist" aria-label="Search">');
    var $button = $('<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search!</button>');
    $form.append([$input, $button]);

    var _callback;

    $nav.submit(function (event) {
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

function ResultsList(title) {
    //Creating column cointainer
    Component.call(this, 'div');
    var $element = $(this.element);
    $element.removeAttr('style');
    $element.addClass('col columns');

    //Creating result container
    this.$list = $('<div class="list-group">');
    $element.append(this.$list);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();

    results.forEach(function (result) {
        var $a = $('<a href="#/' + result.id + '" class="list-group-item list-group-item-action bg-success text-white text-center">' + result.text + '</a>');

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
    Panel.call(this, title, 'section');

    var $element = $(this.element);

    var $img = $('<img src="' + image + '">');

    $element.append($img);

    var $audio = $('<audio controls><source src="' + file + '" type="audio/mpeg"></audio>');

    $element.append($audio);

    var $a = $('<a href="' + url  + '" target="_blank">Open in original player</a>');

    $element.append($a);
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