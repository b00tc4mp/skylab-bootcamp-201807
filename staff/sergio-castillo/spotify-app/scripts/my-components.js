// my custom components

function SearchPanel() {
    Component.call(this, 'form');

    var $form = $(this.element);

    $form.addClass('inline-form');

    // var $input = $('<input>');
    //$input.attr('type', 'search');
    //$input.attr('placeholder', 'Input a text...');
    // $input.attr({
    //     type: 'search',
    //     placeholder: 'Input a text ...'
    // });
    var $div = $('<div class="form-inline text-success my-2"></div>');

    var $input = $('<input type="text" class="form-control" id="searchArtist" aria-describedby="artistHelp" placeholder="Enter artist">');

    var $button = $('<button type="submit" class="btn btn-primary">Submit</button>');

    var $element = $(this.element);

    // $element.append($input);
    // $element.append($button);
    $element.append($div);
    $div.append([$input, $button]);

    var _callback;

    $element.submit(function (event) {
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

    this.$element = $(this.element);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.clear();

    $.each(results, function (index, result) {
        // results.forEach(function (result) {
        var $li = $('<li>');
        var $a = $('<a href="#/' + result.id + '">' + result.text + '</a>');

        $a.click(function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        $li.append($a);

        this.$element.append($li);
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