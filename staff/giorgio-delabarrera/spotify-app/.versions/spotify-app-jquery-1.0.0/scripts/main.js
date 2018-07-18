
function Container(tag) {
    this.element = document.createElement(tag || 'div');
}

Container.prototype.empty = function() {
    this.element.innerHTML = '';
};

// my presentation logic

logic.token = 'BQAgooGUBSTWLaJmqDjwXm19adkrRple1NmMFwNC3iPw3qYPJsvXE3G7Vrj6RA90z4MpnDZW8cUWQpYBDgI';

var DEFAULT_COVER_IMAGE = 'https://media2.fishtank.my/app_themes/era/assets/images/default-album-art.png';
var ERROR_MESSAGE = 'Sorry, we have temporary problem, try again later.';

// components
var search = new SearchPanel();
var artistsList = new ResultsList();
var albumsList = new ResultsList();
var tracksList = new ResultsList();

// containers
var listContainer = new Container();
var detailContainer = new Container();

$('body').append(search.element);
$('body').append(listContainer.element);
$('body').append(detailContainer.element);

search.onSearch(function (query) {

    logic.searchArtists(query)
        .then(function (artists) {

            $(listContainer.element).empty();
            
            artistsList.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            $(listContainer.element).append(artistsList.element);
        })
        .catch(function (error) {
            alert(ERROR_MESSAGE);
        });
});

artistsList.onItemClick(function (artistId) {

    logic.retrieveAlbumsByArtistId(artistId)
        .then(function (albums) {
            
            albumsList.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            $(listContainer.element).append(albumsList.element);
        })
        .catch(function (error) {
            alert(ERROR_MESSAGE);
        });
});

albumsList.onItemClick(function (albumId) {

    logic.retrieveTracksByAlbumId(albumId)
        .then(function (tracks) {
            tracksList.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));

            $(listContainer.element).append(tracksList.element);
        })
        .catch(function (error) {
            alert(ERROR_MESSAGE);
        });
});

tracksList.onItemClick(function (trackId) {

    logic.retrieveTrackById(trackId)
        .then(function (track) {
            
            var album = track.album,
                description = album.name + ' - ' + album.release_date,
                image = album.images[0] ? album.images[0].url : DEFAULT_COVER_IMAGE;
            
            var detail = new DetailPanel(track.name, description, image, track.preview_url);

            $(detailContainer.element).empty();

            $(detailContainer.element).append(detail.element);

            var audio = detail.getAudio();
            if (audio) audio.play();
        })
        .catch(function (error) {
            alert(ERROR_MESSAGE);
        });
});

