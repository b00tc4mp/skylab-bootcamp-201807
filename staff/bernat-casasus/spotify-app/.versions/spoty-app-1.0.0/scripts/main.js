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

            detailContainer.clear();
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
        .then(function (tracks) {
            var detail = new DetailPanel(tracks.name,tracks.popularity, tracks.preview_url,DEFAULT_IMAGE);

            detailContainer.clear();
            detailContainer.appendChild(detail.element);
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});



var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(resultsAlbumByArtistId.element);
document.body.appendChild(resultsTracksByAlbumId.element);
document.body.appendChild(detailContainer);

