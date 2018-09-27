logic.token = 'BQBzQQ-wFziNFtvr-RBDKvum8LzqjoGCo1rft2_JXJqEeRz-AdBp9Mu6fr-aJ4EQ4_QKx1GMFOELoEZaPDBtut1U7HQ8U_aU5CpyxgGJc5tEOAi5AadE-kLZLX2SqV2X4px944rhap-GxaAK1aM58-LURUOG4q2KP7KXtjlNZrw7R2NodoGZy_Xm7mOOCGnGkIM4-ITWdrHQ5HaBqcjmAzzuRZCAeAXIjatLZSAtT08ie4TwIYu5TP0Jm78hd7Hz8XUFnxNb4gI';
// NOTE: to reset token via web => https://developer.spotify.com/console/get-search-item

// my presentation logic

//var $container = $('<div class="container-flui">');
var $body = $('body');
var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            artistsList.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            albumsList.clear();
            tracksList.clear();
            $trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});



$body.append(search.element);

var artistsList = new ResultsList();

artistsList.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsList.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            tracksList.clear();
            $trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

// $body.append(artistsList.$element);
$body.append(artistsList.element);

var albumsList = new ResultsList();

albumsList.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            tracksList.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));

            $trackContainer.clear();
        });
});

$body.append(albumsList.element);

var tracksList = new ResultsList();

tracksList.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            $trackContainer.clear();

            var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            // var player = new SpotifyPlayer(track.id);

            $trackContainer.append(player.element);
        });
});

$body.append(tracksList.element);

var $trackContainer = $('<div>');

$trackContainer.clear = function () {
    this.empty();
};

$body.append($trackContainer);

