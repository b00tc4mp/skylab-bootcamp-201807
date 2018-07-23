'use strict';

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.token = 'BQDvjaDo0bwTjgm_AuMTpolUiJXNApTsQ0qKK5HK9jcbYqn9MvAn1gMwlomsvC-th22arnA2LTgLaCL-9UlhGOJUD_5aSRZXDwrRPPRrtg1HrlXaNWN3BTwoL_cBlzcYXAc2VOSdz0FgsLFGZe8-JY4_5zZRlnf3Uz6LvBp_tAOzzwa6qq8z8IIflnnIHA_iAjN0lDOC9aC2WZ5nxC_bdV3aSjhkkbrq0D6whgvjcizWYdVMBeXX1rCiC3G-bXHunaaABhEmA40';
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

var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

results.onItemClick(function (id) {
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
            resultsAlbumTracks.updateResults(tracks.map(function (track) {
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

var resultsAlbumTracks = new ResultsList();


resultsAlbumTracks.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            var detail = new DetailPanel(track.name, track.popularity, track.album.images[0].url ? track.album.images[0].url : DEFAULT_IMAGE, track.album.external_urls.spotify, track.preview_url);

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
document.body.appendChild(resultsAlbum.element);
document.body.appendChild(resultsAlbumTracks.element);
document.body.appendChild(detailContainer);

