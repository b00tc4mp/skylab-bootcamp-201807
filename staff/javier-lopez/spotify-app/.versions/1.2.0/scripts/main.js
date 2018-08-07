logic.token = 'BQAxMQ5ZNISZW9qMSs7SNHDjOLdcS8YV-Mq_HWs7XBaqAUh4NOVwdmvczyE-I0K-ZAvGgkiAyzKxdqM0LRI1GUsp_8Y-PFV_69XA3Qtme_k10j7--L2CaEHnGea3HeDYMC2kbH-U7uY';
// NOTE: to reset token via web => https://developer.spotify.com/console/get-search-item

// my presentation logic

var $container = $('.container');

$('body').append($container);

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

$container.append(search.element);

var artistsList = new ResultsList('Artists');

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
$container.append(artistsList.element);

var albumsList = new ResultsList('Albums');

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

$container.append(albumsList.element);

var tracksList = new ResultsList('Tracks');

tracksList.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            $trackContainer.clear();

            //var player = new SpotifyPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);

            $trackContainer.append(player.element);
        });
});

$container.append(tracksList.element);

var $trackContainer = $('<div>');

$trackContainer.clear = function () {
    this.empty();
};

$container.append($trackContainer);

