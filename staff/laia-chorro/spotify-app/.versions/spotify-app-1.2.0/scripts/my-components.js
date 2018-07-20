'use strict'

function NavBarLogo() {
    Component.call(this, 'nav');

    var imgLogo = './images/spotifyLogo.png',
        $img = $('<img>').addClass('navbar-brand').attr('src', imgLogo);

    $(this.element).append($img).addClass('navbar navbar-dark');
}
NavBarLogo.prototype = Object.create(Component.prototype);
NavBarLogo.prototype.constructor = NavBarLogo;

function SearchNavBar() {
    NavBarLogo.call(this);

    var $form = $('<form>').addClass('form-inline'),
        $input = $('<input>').attr({'type': 'search', 'placeholder': 'Search...'}).addClass('form-control mb-2 mr-sm-2'),
        $button = $('<button>').attr('type', 'submit').text('Search').addClass('btn btn-outline-info mb-2');
    $form.append([$input, $button]);
    $(this.element).append($form);

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

SearchNavBar.prototype = Object.create(Component.prototype);
SearchNavBar.prototype.constructor = SearchNavBar;



function ResultsList(idContainer, title) {
    Component.call(this, 'div');
    var $h1 = $('<h2>').text(title).addClass('list-title'),
        $ul = $('<ul>').addClass('list-group');

    $(this.element).attr('id', idContainer).append([$h1, $ul]).addClass(idContainer);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function (results) { // => { id, text, img }

    var $ul = $(this.element).find('ul');
    $ul.empty();

    results.forEach(function (result) {
        var $li = $('<li>').addClass('list-group-item list-group-item-action');
        $ul.append($li);

        var $span = $('<span>').text(result.text).addClass('result-text'),
            $img = result.img? $('<img>').attr('src', result.img) : $('<div>').addClass('empty-img'),
            $a = $('<a>').attr('href', '#/' + result.id);

        $($a).append([$img, $span]);
        $($li).append($a);

        $a.click(function () {
            if (this._callback) this._callback(result.id, result.text, $li);
        }.bind(this));
 
    }, this);
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/*function TitleList(title, id) {
    ResultsList.call(this, idContainer, titleContainer);
    var $h1 = $('<h1>').text(text),
        $a = $('<a>').append($h1).attr({'href': '#/' + id, 'data-id': id});

    $resultsContainer.empty().append([$a, $(resultsAlbums.element)]);
}

TitleList.prototype = Object.create(ResultsList.prototype);
TitleList.prototype.constructor = TitleList;*/



/**
 * 
 * @param {string} title The item title
 * @param {string} id The id of the track
 */
function EmbedPanel(title, id) {
    Component.call(this, 'div');

    var $iframe = $(this.element).html('<iframe src="https://open.spotify.com/embed?uri=spotify:track:'+ id +
            '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
}

EmbedPanel.prototype = Object.create(Component.prototype);
EmbedPanel.prototype.constructor = EmbedPanel;

