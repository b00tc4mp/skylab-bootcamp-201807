"use strict";

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

results.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsResults.updateResults(albums.map(function (album) {
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
var albumsResults = new ResultsList();

albumsResults.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            tracksResults.updateResults(tracks.map(function (track) {
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

var tracksResults = new ResultsList();


tracksResults.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            trackContainer.clear();

            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);

            trackContainer.appendChild(player.element);
        });
        
});

var trackContainer = document.createElement('div');

trackContainer.clear = function () {
    this.innerHTML = '';
};




document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(albumsResults.element);
document.body.appendChild(tracksResults.element);
document.body.appendChild(trackContainer);
