logic.token = 'BQD076kproF1O-qGisGVKzlFM0Ps4ZD7920q7K72QhSLRSMz1uVIZWZ8xra6ZGb8qCsNO3eXgVD-qPN8JtWKl3wdZLJxcap3n9IUZBmU7a03D8q3burtJQJx0SN9KZ5z5bUwnhQqIyX0';
// NOTE: to reset token via web => developer.spotify.com/console/get-search-item

// my presentation logic

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            artistsList.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            albumsList.clear();
            tracksList.clear();
            trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

document.body.appendChild(search.element);

var artistsList = new ResultsList();

artistsList.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsList.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            tracksList.clear();
            trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

document.body.appendChild(artistsList.element);

var albumsList = new ResultsList();

albumsList.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            tracksList.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));

            trackContainer.clear();
        });
});

document.body.appendChild(albumsList.element);

var tracksList = new ResultsList();

tracksList.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            trackContainer.clear();

            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);

            trackContainer.appendChild(player.element);
        });
});

document.body.appendChild(tracksList.element);

var trackContainer = document.createElement('div');

trackContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(trackContainer);

