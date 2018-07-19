// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artist) {
            results.updateResults(artist.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            // detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var results = new ResultsList();
var resultsAlbumByArtistId = new ResultsList();
var resultsTracksByAlbumId = new ResultsList();

results.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (album) {
            resultsAlbumByArtistId.updateResults(album.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

resultsAlbumByArtistId.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (track) {
            resultsTracksByAlbumId.updateResults(track.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));

            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});
var DEFAULT_IMAGE = 'https://i.imgur.com/WhSdQi7.png';

resultsTracksByAlbumId.onItemClick(function (id) {
    logic.retrieveTrackById(id)
    .then(function (track) {
        $trackContainer.clear();

        // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
        var player = new SpotifyPlayer(track.id);

        $trackContainer.append(player.element);
    });
});



var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    var $this = this;
    // this.innerHTML = '';
    $($this).html('');
};

$('body').append(search.element);
$('body').append(results.element);
$('body').append(resultsAlbumByArtistId.element);
//$('body').append(resultsTracksByAlbumId.element);
//$('body').append(detailContainer);
$('body').append(resultsTracksByAlbumId.element);


var $trackContainer = $('<div>');

$trackContainer.clear = function () {
    this.empty();
};

$('body').append($trackContainer);
