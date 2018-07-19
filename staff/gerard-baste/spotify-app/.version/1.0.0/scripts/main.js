// Panel del buscador
function SearchPanel() {
    Component.call(this, 'form');

    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Input a text...';

    var button = document.createElement('button');
    button.type = 'submit';
    button.innerHTML = 'Search';

    this.element.appendChild(input);
    this.element.appendChild(button);

    var _callback;

    this.element.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = input.value;

        if (query && _callback) _callback(query);
    }.bind(this));

    this.onSearch = function (callback) {
        _callback = callback;
    };
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

//Panel donde aparecerían los resultados
function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;


ResultsList.prototype.updateResults = function (results) { // => { id, text }
    this.element.innerHTML = '';

    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.href = '#/' + result.id;
        a.innerHTML = result.text;
        a.onclick = function () {
            if (this._callback) this._callback(result.id, result.text, result.imagen);
        }.bind(this);

        this.element.appendChild(li);

        li.appendChild(a);
    }, this);
};

ResultsList.prototype.onItemClick = function (callback) {
    this._callback = callback;
};

/**
 * 
 * @param {string} title The item title
 * @param {string} info The information about an item
 */
function DetailPanel(title, popularity, preview, spotifyUrl) {
    Panel.call(this, title, 'section');

    var p = document.createElement('p');
    p.innerText = popularity;
    this.element.appendChild(p);

    var iframe = document.createElement('iframe');
    iframe.src = preview;
    this.element.appendChild(iframe);

    var a1 = document.createElement('a');
    a1.href = spotifyUrl;
    a1.setAttribute('target', '_blank');
    a1.innerHTML = 'Complete song on Spotify';
    this.element.appendChild(a1);

}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;

// my presentation logic

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.token = 'BQAya_Dq37WAdcFH7sfpT5A-rKMa8BdHc_O9tD77NtCgv4Ffc6zZuBObWP4xho8tbDKbYM0XfR9HJzG5JO9GxSNhMj7w0KtYTkvLUkA3TXXb_ooOK53-PQiu9Nv3O8Gbiooop5mw1-jKDn3vkA';

    logic.searchArtists(query)
        .then(function (artist) {
            resultsArtist.updateResults(artist.map(function (artist) {
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

var resultsArtist = new ResultsList();

resultsArtist.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)

        .then(function (albums) {
            resultsAlbum.updateResults(albums.map(function (album) {
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

var resultsAlbum = new ResultsList();


resultsAlbum.onItemClick(function (id) {
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


resultsTracks.onItemClick(function (id) {
    logic.retrieveTrackById(id)
    
        .then(function (track) {
            var detail = new DetailPanel('Track name: ' + track.name, 'Track popularity: ' + track.popularity, track.preview_url, track.external_urls.spotify);

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

        document.body.appendChild(search.element); 
        document.body.appendChild(resultsArtist.element); 
        document.body.appendChild(resultsAlbum.element); 
        document.body.appendChild(resultsTracks.element); 
        document.body.appendChild(detailContainer);