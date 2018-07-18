// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();
logic.token = 'BQASnTNQ34wZW_Z_5v5S1By4BznWFxPEm1G9OdAQB0cRy07gGhY6qOKAH6KBdGCn6zwUbac0cl81H-Ctaa9KZGw2RO_AOGXUPxxZRlU0__b68BvdSWTtCARgP_HMDZK7jLkxlh_G8ksJWHhATiswOrRy3eH9ikKgbtoQouQYVJn9hlEanJ9ghm6mfovSFoPPl3z7kd1lW1rs6W80oVRCDsAgzQ'

search.onSearch(function (query) {
    
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
var resultsTracks=new ResultsList();

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

resultsTracks.onItemClick(function (id) {
    logic.retrieveTrackById(id)
    
        .then(function (track) {
            var detail = new DetailPanel(track.name,track.image, track.preview_url,);

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

