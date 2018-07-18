// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            results.updateResults(artists.map(function (artist) {
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

results.onItemClick (function (id){
logic.retrieveAlbumsByArtistId(id)
    .then(function (albums) {
        resultsAlbums.updateResults(albums.map(function (album) {
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

var resultsAlbums = new ResultsList();

resultsAlbums.onItemClick (function (id){
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            resultsTracks.updateResults(tracks.map(function (track) {
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
    
    var resultsTracks = new ResultsList();

resultsTracks.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            var detail = new DetailPanel(track.name);

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
document.body.appendChild(resultsAlbums.element);
document.body.appendChild(resultsTracks.element);
document.body.appendChild(detailContainer);

