'use strict';

// my presentation logic


var search = new SearchPanel();

search.onSearch(function (query) {
    logic.token = 'BQDt3Iz89nxC0KyiA98L3tJs1epqmv33HIX_7uV-JCcTPJowdaATomC4DFQ1XPJKLcXjgvSE10HQCebHkRXJW4n1Qqo0HasrqgksAXzNHZBFO-1xeI6f8GoCD8XOdmYl4BOojmmkeCR2Ww';

    logic.searchArtists(query)
        .then(function (artist) {
            resultsArtist.updateResults(artist.map(function (artist) {
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

var resultsArtist = new ResultsList();

resultsArtist.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)

        .then(function (albums) {
            resultsAlbum.updateResults(albums.map(function (album) {
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

var resultsAlbum = new ResultsList();


resultsAlbum.onItemClick(function (id) {
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
            var detail = new DetailPanel('Track name: ' + track.name, 'Track popularity: ' + track.popularity, track.preview_url, track.external_urls.spotify);

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
        document.body.appendChild(resultsArtist.element); 
        document.body.appendChild(resultsAlbum.element); 
        document.body.appendChild(resultsTracks.element); 
        document.body.appendChild(detailContainer);