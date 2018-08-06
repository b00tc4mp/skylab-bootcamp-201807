"use strict";

var ArtistPanel = function () {
    Component.call(this, 'section');
    var h1 = document.createElement('h1');
    var img = document.createElement('img');
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    this.albumsList = new ResultsList();
    this.tracksList = new ResultsList();
    this.element.appendChild(h1);
    this.element.appendChild(img);
    this.element.appendChild(h2);
    this.element.appendChild(this.albumsList.element);
    this.element.appendChild(h3);
    this.element.appendChild(this.tracksList.element);
};
ArtistPanel.prototype = Object.create(Component.prototype);
ArtistPanel.prototype.constructor = ArtistPanel;
ArtistPanel.prototype.update = function (title, url) {
    this.element.children[0].innerHTML = title;
    this.element.children[1].src = url;
    this.element.children[2].innerHTML = 'Albums';
};
ArtistPanel.prototype.clear = function() {
    this.element.children[0].innerHTML = '';
    this.element.children[1].src = '';
    this.element.children[2].innerHTML = ''; 
    this.element.children[3].innerHTML = ''; 
    this.element.children[4].innerHTML = ''; 
    this.element.children[5].innerHTML = ''; 
};

logic.token = 'BQD3MTkX_IYF58HULm6nmerwAlu5mh8R_yDce34kI2GkfbPSsTAmsI2HTFAIZDzECxuBEl5pfMDq8XXBD4fOcgmj_1OqiaYosY969qMrYKbPCcU0vtUMd96s9OTUBTvm3ovPHUIglgc6m6yFxw';

var searchArtist = new SearchPanel();
var artistsList = new ResultsList();
var artistPanel = new ArtistPanel();

document.body.appendChild(searchArtist.element);
document.body.appendChild(artistsList.element);
document.body.appendChild(artistPanel.element);

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

artistsList.updateResults = function (results) {
    this.element.innerHTML = 'Results found: ' + results.length;

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.name;
        a.onclick = function () {
            if (this._callback) this._callback(result);
        }.bind(this);
        this.element.appendChild(li);
        li.appendChild(a);
    }, this);
};

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

artistPanel.albumsList.updateResults = function (results) {
    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.name;
        a.onclick = function () {
            if (this._callback) this._callback(result);
        }.bind(this);
        this.element.appendChild(li);
        li.appendChild(a);
    }, this);
};

artistPanel.albumsList.onItemClick(function(album){
    artistPanel.tracksList.element.innerHTML = "";
    logic.retrieveTracksByAlbumId(album.id)
        .then(function (tracks) {
            artistPanel.tracksList.updateResults(tracks);
        })
        .catch(function (error) {
            alert(error.message);
        });
});

artistPanel.tracksList.updateResults = function(results) {
    artistPanel.element.children[4].innerHTML = 'Tracks';
    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = result.preview_url;
        a.innerHTML = result.name;
        this.element.appendChild(li);
        li.appendChild(a);
    }, this); 
};