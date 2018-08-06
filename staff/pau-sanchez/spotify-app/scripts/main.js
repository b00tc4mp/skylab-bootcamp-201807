logic.token = 'BQBQdtG0XK9wYFbDVil08R5ijjvAv7uB1Q-BZplMwe-tJVeNyoM6ZgHb30Aq777EYK9fLl_K3L8hxc2DYS1c_z-W20Io0oqG62XmdMTeeyfDedw4_cAnN54frHXwcs1bCaD74hnYrqxlVtKxXQopEqD1oFomxHuWf4YsRDhwcFRKb2iH';
// NOTE: to reset token via web => https://developer.spotify.com/console/get-search-item

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
            $trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var $body = $('body');



var $navigationBar = $('<nav>');
$navigationBar.addClass("navbar navbar-expand-sm bg-dark navbar-dark");


$body.append($navigationBar);
$navigationBar.append(search.element);

$titleArtists = $("<h1>Artists</h1>");
    $body.append($titleArtists);
    $titleArtists.addClass("title mx-auto");

var artistsList = new ResultsList();



artistsList.onItemClick(function (id) {
   
    ("$title").clear = function () {
        this.empty();
    };
    $title.clear();
    artistsList.clear();//
    

     $title = $("<h1>Albums</h1>");
    this.$element.append($title);
    $title.addClass("title mx-auto");
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsList.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            
            tracksList.clear();
            $trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

// $body.append(artistsList.$element);
$body.append(artistsList.element);

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

            $trackContainer.clear();
        });
});

$body.append(albumsList.element);

var tracksList = new ResultsList();

tracksList.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            $trackContainer.clear();

            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);
            
            $trackContainer.append(player.element);
        });
});

$body.append(tracksList.element);

var $trackContainer = $('<div>');

$trackContainer.clear = function () {
    this.empty();
};

$body.append($trackContainer);

