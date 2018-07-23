// Panel del buscador
function SearchPanel() {
    Component.call(this, 'form');
    var $form = $(this.element);
	    $($form).append('<input type="search" placeholder="Input a text..." />');
    // var input = document.createElement('input');
    // input.type = 'search';
    // input.placeholder = 'Input a text...';

        $($form).append('<button>Search</button>');

    // var button = document.createElement('button');
    // button.type = 'submit';
    // button.innerHTML = 'Search';

    //this.element.appendChild($input);
    //this.element.appendChild(button);

    var _callback;

    $($form).submit(function (event) {
        event.preventDefault();
        var query = $("input").val();
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
        //var $li = $($'<li>')
        // var $li = $("ul").append("li");
        // console.log($("li"))
        
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
    logic.token = 'BQD2rn3wH6xfIqouW5Bwn7oDOyfZf2UMloghjaAgCWuskPzKz4uMT8v7l96bt9K4GS9cREyezaFN5oueyxhD9Ox6XXKKpzb2XQA7T1Sklm38vs_S0KPkyRL1fUf8TedS0mWP0H8Se8-TrB79IA';

    logic.searchArtists(query)
        .then(function (artist) {
            resultsArtist.updateResults(artist.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            $detailContainer.clear();
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

            $detailContainer.clear();
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

                    $detailContainer.clear();
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
            
            $detailContainer.clear();
            $('div').append(detail.element);
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

        //var detailContainer = document.createElement('div');
      
        $('body').append(search.element);
        $('body').append(resultsArtist.element); 
        $('body').append(resultsAlbum.element); 
        $('body').append(resultsTracks.element); 
        
        var $detailContainer = $('body').append('<div>');

        $detailContainer.clear = function () {
            this.innerHTML = '';
        };
        
        $('body').append($detailContainer);
      
      
        