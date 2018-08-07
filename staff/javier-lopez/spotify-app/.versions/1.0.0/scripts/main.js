// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

//Search Panel of an artist, we'll show them in a list
var search = new SearchPanel();
logic.token = 'BQDLHQJ58AcJJfzVzwHQMfuYjg8TteEqi7mx5CjLxkwKCbK9mA6VAkWuvzciultd9JSiVn77Yf2nZc5-MTQpkXVQJbZ4BAwN8lamzRJLKGVYuOdSqCBgcZk_kKzaUZesE8089yt7V00';

search.onSearch(function (query) {

    logic.searchArtists(query)
        .then(function (artists) {
            results.updateResults(artists.map(function (artists) {
                return {
                    id: artists.id,
                    text: artists.name
                };
            }));
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var results = new ResultsList();

var DEFAULT_URL = 'https://www.youtube.com/watch?v=bx1Bh8ZvH84';

//We'll get the id of the artist and we'll show on a list the albums
results.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumResults.updateResults(albums.map(function (albums) {
                return {
                    id: albums.id,
                    text: albums.name
                };
            }));
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var albumResults = new ResultsList();

//We'll get the id of the artist and we'll show on a list the albums
albumResults.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (trackAlbum) {
            albumTrackResults.updateResults(trackAlbum.map(function (trackAlbum) {
                return {
                    id: trackAlbum.id,
                    text: trackAlbum.name
                };
            }));
            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var albumTrackResults = new ResultsList();

//We'll show the name of the track with a preview
albumTrackResults.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            var detail = new DetailPanel(track.name, track.external_urls, track.preview_url ? track.preview_url: DEFAULT_URL);

            detailContainer.clear();
            detailContainer.appendChild(detail.element);
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
})


var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(albumResults.element);
document.body.appendChild(albumTrackResults.element);
document.body.appendChild(detailContainer);
