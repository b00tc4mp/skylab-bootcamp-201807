// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);


//Create List of artists by query
var search = new SearchPanel();

search.onSearch(function (query) {
        logic.searchArtists(query)
        .then(function (artists) {
            resultsArtists.updateResults(artists.map(function (artist) {
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
var resultsArtists = new ResultsList();

//Create List of artists by artist
var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

resultsArtists.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
    .then(function (albums) {


//res.items[0].images[1].url
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

//Create List of tracks by albums
resultsAlbums.onItemClick(function (id) {

    updateActiveAlbumById(id);

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


//List detail of track
resultsTracks.onItemClick(function (id) {

    logic.retrieveTrackById(id)
        .then(function (track) {
            //var detail = new DetailPanel(beer.name, beer.style.description, beer.labels ? beer.labels.medium : DEFAULT_IMAGE);
            var detail = new DetailPanel(track.name, track.style.description, track.labels ? track.labels.medium : DEFAULT_IMAGE);

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

function updateActiveAlbumById(id) {
    var albumsContainer = document.getElementById('albumsContainer');
    var prevActiveAlbum = albumsContainer.querySelectorAll('ul > li[data-active="true"]')[0];
    prevActiveAlbum.setAttribute('ative', 'false');

    var newActiveAlbum = document.querySelectorAll('albumsContainer');
    newActiveAlbum.setAttribute('ative', 'true');
}

document.body.appendChild(search.element);

document.body.appendChild(resultsArtists.element);

var albumsContainer = document.createElement('div');
document.body.appendChild(albumsContainer);
albumsContainer.id = 'albumsContainer';
albumsContainer.appendChild(resultsAlbums.element);

document.body.appendChild(resultsTracks.element);
document.body.appendChild(detailContainer);

