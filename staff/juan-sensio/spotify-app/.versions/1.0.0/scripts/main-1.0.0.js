logic.token = 'BQDDkL11kWzfgv7hLEd8oohf2qP9kR-ifSTaq7iCFXubKbuCWymm747lGTRzFebL4JgtWchDofKUUx7KeDIrn-s2fGuHPBkD9JaLCKByTe4cdec0uLMnVIk9I9gpwwid8iuO9FtS4pgk3G0a2A';
// super container
var Container = function() {
    Component.call(this, 'div');
    var searchPanel = new SearchPanel(); 
    var resultsList = new ResultsList();
    var detailContainer = document.createElement('div');
    this.element.appendChild(searchPanel.element);
    this.element.appendChild(resultsList.element);
    this.element.appendChild(detailContainer);

    this.onSearch = function(callback) {
        searchPanel.onSearch(callback);
    };
    this.onUpdateResults = function(callback) {
        resultsList.updateResults = callback;
    };
    this.updateResults = function(results) {
        resultsList.updateResults(results);
    };
    this.clearDetail = function() {
        detailContainer.innerHTML = "";
    };
    this.updateDetail = function(detailPanel) {
        detailContainer.appendChild(detailPanel.element);
    };
};
Container.prototype = Object.create(Component.prototype);
Container.prototype.constructo = Container;
// search artists
var container = new Container();
document.body.appendChild(container.element);
container.onSearch(function(query){
    logic.searchArtists(query)
        .then(function(artists){
            container.clearDetail();
            container.updateResults(artists);
        })
        .catch(function(error){
            alert(error.message);
        });
});
container.onUpdateResults(function (results) { 
    this.element.innerHTML = 'Results found: ' + results.length;

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.name;
        a.onclick = function () {
            if (this._callback) this._callback(result.id, result.name);
           var detailPanel = new DetailPanel(result.name, "Artist ID: "+result.id, result.images[1].url);
           container.clearDetail();
           container.updateDetail(detailPanel);
        }.bind(this);
        this.element.appendChild(li);
        li.appendChild(a);
    }, this);
});
// search albums by artist id
var albumsContainer = new Container();
document.body.appendChild(albumsContainer.element);
albumsContainer.onSearch(function(query){
    logic.retrieveAlbumsByArtistId(query)
        .then(function(albums){
            albumsContainer.clearDetail();
            albumsContainer.updateResults(albums);
        })
        .catch(function(error){
            console.log(error.message);
        });
});
albumsContainer.onUpdateResults(function (results) { 
    this.element.innerHTML = 'Results found: ' + results.length;

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#/' + result.id;
        a.innerHTML = result.name;
        a.onclick = function () {
           if (this._callback) this._callback(result.id, result.name);
           var detailPanel = new DetailPanel(result.name, "Album ID: "+result.id, result.images[1].url);
           albumsContainer.clearDetail();
           albumsContainer.updateDetail(detailPanel);
        }.bind(this);
        this.element.appendChild(li);
        li.appendChild(a);
    }, this);
});
// search tracks by album id
var tracksContainer = new Container();
document.body.appendChild(tracksContainer.element);
tracksContainer.onSearch(function(query){
    logic.retrieveTracksByAlbumId(query)
        .then(function(tracks){
            console.log(tracks[0]);
            tracksContainer.clearDetail();
            tracksContainer.updateResults(tracks);
        })
        .catch(function(error){
            console.log(error.message);
        });
});
tracksContainer.onUpdateResults(function (results) { 
    this.element.innerHTML = 'Results found: ' + results.length;

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = result.preview_url;
        a.target = "_blank";
        a.innerHTML = result.name;
        a.onclick = function () {
           var detailPanel = new DetailPanel(result.name, "Track ID: "+result.id, "");
           //tracksContainer.clearDetail();
           //tracksContainer.updateDetail(detailPanel);
        }.bind(this);
        this.element.appendChild(li);
        li.appendChild(a);
    }, this);
});


