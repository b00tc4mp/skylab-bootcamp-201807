'use strict';

// my custom components

function SearchPanel() {
    Component.call(this, 'div');

    var $div = $(this.element);
    $div.addClass('container-fluid');

    var $nav = $('<nav>')
    $nav.addClass('navbar navbar-light bg-light justify-content-between');

    var $a = $('<a href="index.html">')
    $a.addClass('navbar-brand');

    var $img = $('<img src="spotify.png">');

    var $form = $('<form>');
    $form.addClass('inline-form');

    var $input = $('<input type="search" placeholder="Input a text...">');
    $input.addClass('form-control mr-sm-2');

    var $button = $('<button type="submit">Search</button>');
    $button.addClass('btn btn-outline-success my-2 my-sm-0');

    var $element = $(this.element);

    $element.append($nav);
    $nav.append([$a, $form]);
    $a.append($img);
    $form.append([$input, $button]);

    var _callback;

    $form.submit(function (event) {
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
    Component.call(this, 'div');

    this.$element = $(this.element).addClass('grid');
/* 
    var $divGrid = $('<div>').addClass('grid');
    this.$element.append($divGrid); */

    var $section = $('<section>').addClass('grid grid-template');
    this.$element.append($section);

    var $h2 = $('<h2>').addClass('section-title');
    $section.append($h2);

    var $ul = $('<ul>').addClass('list-group');
    $section.append($ul);
    
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();

    $ul.each(results, function (index, result) {
        // results.forEach(function (result) {

        var $li = $('<li>').addClass('list-group-item list-group-item-action');
        var $a = $('<a href="#/' + result.id + '">' + result.text + '</a>');

        $a.click(function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        this.$element.append($li);
        $li.append($a);
        
        // }, this);
    }.bind(this));
};

ResultsList.prototype.clear = function () {
    this.$element.empty();
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

TrackPlayer.prototype = Object.create(Panel.prototype);
TrackPlayer.prototype.constructor = TrackPlayer;

/**
 * 
 * @param {string} id The track id
 */
function SpotifyPlayer(id) {
    Component.call(this, 'section');

    $(this.element).append('<iframe src="https://open.spotify.com/embed?uri=spotify:track:' + id + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
}

SpotifyPlayer.prototype = Object.create(Component.prototype);
SpotifyPlayer.prototype.constructor = SpotifyPlayer;