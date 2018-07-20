// my custom components

function SearchPanel() {
    Component.call(this, 'nav');
    var $nav = $(this.element);
    $nav.addClass('navbar navbar-light bg-dark');
    var $imageNav = $('<img src="Spotify.png"/>');
    var $h1 = $('<h1>Sporifay</h1>').addClass('display-3 text-success');
    var $form = $('<form>').addClass('form-inline');
    
    //$nav.append($h1);
    $nav.append([$imageNav, $h1, $form]);
    //$form.addClass('inline-form');

    // var $input = $('<input>');
    //$input.attr('type', 'search');
    //$input.attr('placeholder', 'Input a text...');
    // $input.attr({
    //     type: 'search',
    //     placeholder: 'Input a text ...'
    // });
    var $input = $('<input type="search" placeholder="Input a text...">').addClass('form-control mr-sm-2');

    var $button = $('<button type="submit">Search</button>').addClass('btn btn-outline-success my-2');

    //var $element = $(this.element);

    // $element.append($input);
    // $element.append($button);
    //$element.append([$input, $button]);
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

function ResultsList() {
    Component.call(this, 'ul');

    this.$element = $(this.element).addClass('list-group');

}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();

    //var $divList = $('<div>').addClass('list-group mt-3');
    $.each(results, function (index, result) {
        // results.forEach(function (result) {
        var $li = $('<li>').addClass("list-group-item list-group-item-action");
        var $a = $('<a href="#/' + result.id + '">' + result.text + '</a>');

        $a.click(function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        $li.append($a);

        this.$element.append($li);
        // }, this);
    }.bind(this));
    $('ul li:first-child').addClass('mt-3')
    $('ul li').addClass('border-top border-dark')

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
    Panel.call(this, title, 'div');

    var $element = $(this.element).addClass('card mt-3');

    var $img = $('<img src="' + image + '">').addClass('card-img-top');

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