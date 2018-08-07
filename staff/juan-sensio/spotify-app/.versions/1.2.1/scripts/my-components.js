'use strict';

function Searchbar() {
    this.$element = $('<form class="navbar-form form-inline">');
    var $input = $('<input type="text" class="form-control" placeholder="Search">');
    var $button = $('<button class="btn btn-default" type="submit">Search</button>');
    this.$element.append([$input, $button]);

    var _callback;
    $button.click(function (e) {
        e.preventDefault();
        var query = $input.val();
        if (query && _callback)
            _callback(query);
    });
    this.onSearch = function (callback)  {
        _callback = callback;
    };
}
/*
function Artist() {

    this.id = undefined;
    this.$element.append([this.$img, this.$name]);
    this.$element.hover(function () {
        $(this).toggleClass('artist-info-hover');
    });
    this._onClick;
    this.$element.click(function () {
        if (this._onClick) this._onClick(this.$element, this.id);
    }.bind(this));
}
Artist.prototype.onClick = function (callback) {
    this._onClick = callback;
}
*/
function ArtistList() {
    this.$element = $('<ul>');
}
ArtistList.prototype.showList = function (artists, callback) {
    this.$element.empty();
    artists.forEach(function (artist) {
        var $li = $('<li>');
        var $div = $('<div class="artist-info">');
        var $img = $('<img class="img-circle artist-info-img" src="'+artist.img+'">');
        var $name = $('<h3>'+artist.name+'</h3>');
        $div.append($img);
        $div.append($name);
        $li.append($div);
        this.$element.append($li);
        $li.hover(function () {
            $(this).toggleClass('artist-info-hover');
        });
        $li.click(callback(artist));
    }.bind(this));
};

function ArtistPanel() {
    this.$element = $('<div class="artist-panel">');
    this.artist;
}
ArtistPanel.prototype.show = function (artist, id) {
    artist.addClass
};
