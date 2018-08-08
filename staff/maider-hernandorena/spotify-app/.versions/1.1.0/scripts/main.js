'use strict';

// my presentation logic

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.token = 'BQCtMW97bKWGUJSqTPjDn-UK_RiEdJVRasW2UTm3k5I5qYQipHCqPew9-JUIgO6_5W1dLWOo_1wJ4J58VD0Qzb4di8STXpip3LJ5zSvDHJwmKXzE0ljD_lpjFFdC-wk_PRboHGNmIQMPYQ';

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

        $('body').append(search.element); 
        $('body').append(resultsArtist.element); 
        $('body').append(resultsAlbum.element); 
        $('body').append(resultsTracks.element); 
        $('body').append(detailContainer);