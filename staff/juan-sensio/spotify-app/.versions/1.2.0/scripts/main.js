"use strict";

logic.token = 'BQDMQsMx7qx8gXRGunW9IMAttyukbs1mSlWrB7KnoL75rLNXj_ELWxxG_te8EKyue0AX8k5JBSdO7LkuFEiS6nfZ0uUf8MgtKi8oVHYeEoyN8otuBPnEUZ_s8AC6xPJYrpjqJCrXv7vvMH72eA';

var $container = $('<div class="container-fluid">');
$('body').append($container);

var searchArtist = new SearchPanel();
$container.append(searchArtist.element);

var artistsList = new ResultsList();
$container.append(artistsList.element);

var artistPanel = new ArtistPanel();
$container.append(artistPanel.element);

searchArtist.onSearch(function (query) {
    artistPanel.clear();
    logic.searchArtists(query)
        .then(function (artists) {
            artistsList.updateResults(artists);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistsList.onItemClick(function (result) {
    artistPanel.update(result.name, result.images[1].url);
    logic.retrieveAlbumsByArtistId(result.id)
        .then(function (albums) {
            artistPanel.albumsList.updateResults(albums);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistPanel.albumsList.onItemClick(function(album){
    $(artistPanel.tracksList.element).text('');
    logic.retrieveTracksByAlbumId(album.id)
        .then(function (tracks) {
            artistPanel.tracksList.updateResults(tracks);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistPanel.tracksList.updateResults = function(results) {
    artistPanel.$h3.text('Tracks');
    results.forEach(function (result) {
        var $a = $('<a href="#">'+result.name+'</a>');
        //var $a = $('<a href="'+result.preview_url+'">'+result.name+'</a>');
        $a.addClass("list-group-item list-group-item-action");
        $a.click(function () {
            if (this._callback) this._callback(result);
        }.bind(this));
        this.$element.append($a);
    }, this); 
};

artistPanel.tracksList.onItemClick(function(result){
    var player = new SpotifyPlayer(result.id);
    artistPanel.$element.append(player.element);
})
