logic.token = 'BQD8qg4TEwSIhwk5hYoQH3ojohjx_GLqIsD5dnasj2HM7hPFfMgpz6KCQ3FOHnLssPtkVAq3_YVERFfL4lo9qQr_PZM6vaIS7e5D_8tCMlbRSFh-QKjYam6y4PHMdVsrc8TATZgMbpQ';
// NOTE: to reset token via web => https://developer.spotify.com/console/get-search-item

// my presentation logic

var $container = $('.container-fluid.marginDiv');

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


var $body = $('body');

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

            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);

            $trackContainer.append(player.element);
        });
});

$body.append(tracksList.element);

var $trackContainer = $('<div>');

$trackContainer.clear = function () {
    this.empty();
};

$body.append($trackContainer);

