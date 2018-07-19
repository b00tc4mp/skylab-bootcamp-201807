// my custom components
function Container(){
    Component.call(this, 'div');
    var $container = $(this.element);

    $container.addClass('container col-4');
}
Container.prototype = Object.create(Component.prototype);
Container.prototype.constructor = Container;


function ImageHead(){
    Component.call(this, 'div');
    var $container = $(this.element);

    $container.addClass('d-flex justify-content-center mb-5 mt-5');
    var $img = ('<img src="https://rocketdock.com/images/screenshots/Spotify.png"/>');

    $container.append($img);
}
ImageHead.prototype = Object.create(Component.prototype);
ImageHead.prototype.constructor = ImageHead;

function SearchPanel() {
    Component.call(this, 'form');
    
    var $form = $(this.element);
    $form.addClass('form-inline d-flex justify-content-center');
    $($form).append('<input type="search" class="form-control mb-2 mr-sm-2 p-2 mb-2 col" id="inlineFormInputName2" placeholder="Input text to search...">');
    $($form).append('<button type="submit" class="btn mb-2 p-2 mb-2 col-3">Submit</button>');

    var _callback;

    $form.submit(function(){
        event.preventDefault();
        var query = $("input").val();
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
    this.$form = $(this.element);
    this.$form.addClass('list-group mt-2');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.element.innerHTML = "";

    $.each(results,function (index, result) {
        

        var $a = $('<a class="list-group-item list-group-item-action" href="#/' + result.id + '">' + result.text + '</a>');

        $a.click(function () {
            if (this._callback) this._callback(result.id, result.text);
        }.bind(this));

        this.$form.append($a);
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
 */
function DetailPanel(title, info, preview, image) {
    Panel.call(this, title, 'section');

    var $form = $(this.element);

    var $p = ('<p>'+info+'</p>');
    var $iframe = ('<iframe src="'+preview+'"/>');
    var $img = ('<img src="'+image+'"/>');

    $form.append($p).append($iframe).append($img);

}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

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

    $(this.element).append('<iframe src="https://open.spotify.com/embed?uri=spotify:track:' + id + '" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
}

SpotifyPlayer.prototype = Object.create(Component.prototype);
SpotifyPlayer.prototype.constructor = SpotifyPlayer;