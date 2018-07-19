logic.token = 'BQC1SDEZhouJg7F1hsDF5H2c4uH9fzvIbdZ-aLP71cRR3uOMsG8QC6Wmb-580FltD10I9bqqZPeqdFStLR-j3Yc0sxdS_8aWcDsCLe7duNcLRH_Yk4cdeLzpwX-VI4IxXATk0tFrAGQ';
// NOTE: to reset token via web => developer.spotify.com/console/get-search-item

// my presentation logic

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

            albumResult.clear();
            albumTrackResults.clear();
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
            albumResult.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));
            
            albumTrackResults.clear();
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
    });
    
    
    var albumResult = new ResultsList();
    
    albumResult.onItemClick(function (id) {
        logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            albumTrackResults.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));
            
            detailContainer.clear();
        });
    });
    
    
    var albumTrackResults = new ResultsList();
    
    albumTrackResults.onItemClick(function (id) {
        logic.retrieveTrackById(id)
        .then(function (track) {
            detailContainer.clear();
            
            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);
            
            detailContainer.appendChild(player.element);

            /*var $detailContainer = $('detailContainer');
            $detailContainer.append('player.element');*/
        });
    });
    
    
    var detailContainer = document.createElement('div');
    
    detailContainer.clear = function () {
        this.innerHTML = '';
    };
    
    //Declaring where we're going to put childs
    var $body = $('body');


    //CHILDS

    //document.body.appendChild(search.element);
    $body.append(search.element);
    
    // document.body.appendChild(results.element);
    $body.append(results.element);

    // document.body.appendChild(albumResult.element);
    $body.append(albumResult.element);

    // document.body.appendChild(albumTrackResults.element);
    $body.append(albumTrackResults.element);

    // document.body.appendChild(detailContainer);
    $body.append(detailContainer);