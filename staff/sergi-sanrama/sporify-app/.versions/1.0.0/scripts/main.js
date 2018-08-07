// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);
'use strict'
var search = new SearchPanel();

search.onSearch(function (query) {

    logic.searchArtists(query)
        .then(function (artists) {
            resultsArtists.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name,
                };
            }));
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var resultsArtists = new ResultsList();

var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

resultsArtists.onItemClick(function (id) {

    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            resultsAlbums.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name,
                };
            }));
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});
var resultsAlbums = new ResultsList();

resultsAlbums.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            resultsTracks.updateResults(tracks.map(function (track) {

                return {
                    id: track.id,
                    text: track.name,
                };
            }));
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });

});
var resultsTracks = new ResultsList();

//Tracks Features//
resultsTracks.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (features) {
            detailsTrack()
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
    detailContainer.clear();
});


var detailsTrack = new DetailPanel();

var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(resultsArtists.element);
document.body.appendChild(resultsAlbums.element);
document.body.appendChild(resultsTracks.element);
document.body.appendChild(resultsFeatures.element);
document.body.appendChild(detailContainer);
