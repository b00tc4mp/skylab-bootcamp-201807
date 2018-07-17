// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.token = 'BQAd318nOQP7hreYymJaxfT5rAFKXGmnE6TBnswCTEDrajfOHW3eI8QxfcRdF_rLOxbG7hjT0f8vhBSHD1ju8zJBjfAHVdExkN6gAdkUm10vBxJfBAqtT0flqu7mf4SnRz8oaFi5mf4QZw';

    logic.searchArtists(query)
        .then(function (artist) {
            results.updateResults(artist.map(function (artist) {
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

var results = new ResultsList();

//var DEFAULT_IMAGE = 'https://images.vexels.com/media/users/3/137413/isolated/preview/4acb8e52632aa9b7c874b878eaf02bc4-spotify-icon-logo-by-vexels.png';

results.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
    
        .then(function (artist) {
            var detail = new DetailPanel(artist.name, artist.id, artist.images | DEFAUL_IMAGE);

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
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

