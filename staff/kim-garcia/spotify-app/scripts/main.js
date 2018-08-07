logic.token = "BQCo74c1uYcCS4F90eOmqub9sfqjmffdh4qsQB7nOCUcx8XVGVhvQdiwetXtWyPZ1MgHKlE2ky3K7sFf1C4n6brBLOveBl0kdgTOJQsCzgU_1JBXpWeSqyPEM3kxAqhRN1NNZ1l_4EBRYpiHOvoptCRDuLM"

var search = new SearchPanel();
var results = new ResultsList();
var resultsAlbums = new ResultsList();

search.onSearch(function (query) {

    logic.searchArtists(query)
        .then(function (artists) {
            results.updateResults(artists)
        })

        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });

});

//En vez de coger el componente ya creado, lo modificamos 
results.updateResults = function (results) { // => { id, text }
    this.element.innerHTML = '';

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = '#/';
        a.innerHTML = result.name;
        a.onclick = function () {

            if (this._callback) this._callback(result);
        }.bind(this);

        this.element.appendChild(li);

        li.appendChild(a);
    }, this);
};

results.onItemClick(function (result) {

    var detail = new DetailPanel(result.name, result.followers.total, result.images[1].url)

    detailContainer.clear();
    detailContainer.appendChild(detail.element);

    logic.retrieveAlbumsByArtistId(result.id)
        .then(function (tracks) {
            resultsAlbums.updateResults(tracks);
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });

});


resultsAlbums.updateResults = function (results) { // => { id, text }
    this.element.innerHTML = '';

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = '#/';
        a.innerHTML = result.name;
        a.onclick = function () {

            if (this._callback) this._callback(result);
        }.bind(this);

        this.element.appendChild(li);

        li.appendChild(a);
    }, this);
};

var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};



document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);
document.body.appendChild(resultsAlbums.element);
