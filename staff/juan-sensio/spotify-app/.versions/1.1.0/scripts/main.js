"use strict";

var ArtistPanel = function () {
    Component.call(this, 'section');
    var h1 = document.createElement('h1');
    var img = document.createElement('img');
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    this.albumsList = new ResultsList();
    this.tracksList = new ResultsList();
    $(this.element).append(h1);
    $(this.element).append(img);
    $(this.element).append(h2);
    $(this.element).append(this.albumsList.element);
    $(this.element).append(h3);
    $(this.element).append(this.tracksList.element);
};
ArtistPanel.prototype = Object.create(Component.prototype);
ArtistPanel.prototype.constructor = ArtistPanel;
ArtistPanel.prototype.update = function (title, url) {
    $($(this.element).find('h1')).text(title);
    $($(this.element).find('img')).attr('src',url);
    $($(this.element).find('h2')).text('Albums');
};
ArtistPanel.prototype.clear = function() {
    $($(this.element).find('h1, h2, h3, ul')).text('');
    $($(this.element).find('img')).attr('src','');
};

logic.token = 'BQDUZT_9Zpklxphjfpb5xoudU23LMg5QKVJh2zpAFc0KKvAf3HcezcV4FH23YUVolz2fC6uTBEhfrak7R_0j9TzfPrFkbbhuJpkVK3ygpK09xxNAHEEbzO1KFD3o-b0qtZzk9fZLdcH_6b_XJg';

var searchArtist = new SearchPanel();
var artistsList = new ResultsList();
var artistPanel = new ArtistPanel();

$('body').append(searchArtist.element);
$('body').append(artistsList.element);
$('body').append(artistPanel.element);

searchArtist.onSearch(function (query) {
    artistPanel.clear();
    logic.searchArtists(query)
        .then(function (artists) {
            artistsList.updateResults(artists);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistsList.onItemClick(function (result) {
    artistPanel.update(result.name, result.images[1].url);
    logic.retrieveAlbumsByArtistId(result.id)
        .then(function (albums) {
            artistPanel.albumsList.updateResults(albums);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistPanel.albumsList.onItemClick(function(album){
    $(artistPanel.tracksList.element).text('');
    logic.retrieveTracksByAlbumId(album.id)
        .then(function (tracks) {
            artistPanel.tracksList.updateResults(tracks);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistPanel.tracksList.updateResults = function(results) {
    $(artistPanel.element).find('h3').text('Tracks');
    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = result.preview_url;
        a.innerHTML = result.name;
        $(li).append(a);
        $(this.element).append(li);
    }, this); 
};
