// my custom components

function SearchPanel() {
    Component.call(this, 'form');
    var $element = $(this.element);
    $element.addClass('form-inline');

    var $input = $('<input type="search" placeholder="Search for artists ..."></input>');
    $input.addClass('form-control mb-2 mr-sm-2');
    var $button = $('<button type="submit">Search</button>');
    $button.addClass('btn btn-primary mb-2');

    $element.append($input);
    $element.append($button);

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
    Component.call(this, 'div');
    this.$element = $(this.element);
    this.$element.addClass("list-group");
}
ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;
ResultsList.prototype.updateResults = function (results) { 
    this.$element.empty();
    results.forEach(function (result) {
        var $a = $('<a href="#">'+result.name+'</a>');
        $a.addClass("list-group-item list-group-item-action");
        $a.click(function () {
            if (this._callback) this._callback(result);
        }.bind(this));
        this.$element.append($a);
    }, this);
};
ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

var ArtistPanel = function () {
    Component.call(this, 'section');
    this.$element = $(this.element);

    this.$h1 = $('<h1>');
    this.$img = $('<img>');
    this.$h2 = $('<h2>');
    this.$h3 = $('<h3>');
    this.albumsList = new ResultsList();
    this.tracksList = new ResultsList();

    this.$element.append([this.$h1,this.$img,this.$h2,this.albumsList.element,this.$h3,this.tracksList.element]);
};
ArtistPanel.prototype = Object.create(Component.prototype);
ArtistPanel.prototype.constructor = ArtistPanel;
ArtistPanel.prototype.update = function (title, url) {
    this.$h1.text(title);
    this.$img.attr('src',url);
    this.$h2.text('Albums');
};
ArtistPanel.prototype.clear = function() {
    this.$h1.text('');
    this.$h2.text('');
    this.$h3.text('');
    this.$img.attr('src','');
    this.albumsList.$element.empty();
    this.tracksList.$element.empty();
    $('div').remove('.player');
};

function SpotifyPlayer(id) {
    Component.call(this, 'div');
    var $element = $(this.element);
    $element.addClass('player');
    $element.append('<iframe src="https://open.spotify.com/embed?uri=spotify:track:' + id + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
}
SpotifyPlayer.prototype = Object.create(Component.prototype);
SpotifyPlayer.prototype.constructor = SpotifyPlayer;
