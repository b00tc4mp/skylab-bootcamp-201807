// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();
logic.token = 'BQDV5GwFQsSPsh22gtCs-trR4DxhBauswKm9mcamVUiL2D_JTGnrbUU7Mna_b5eVo_ehhat0MKM8xWt879-yrtVUmSPSMGBsEF747pmnaebSZ6p3F98MAPZKGPRaFBIjkpuSzPw45FJumZaSspX3B8wY-q864g1iVZYahdD6lP2wvYokKu6_wJR5A79Zm1JPBEhH1HOo_BCv9woH5ngmwUvMZA'

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

