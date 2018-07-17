// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchBeers(query, function (error, beers) {
        if (error) alert('Sorry, we have temporary problem, try again later.');
        else
            results.updateResults(beers.map(function (beer) {
                return {
                    id: beer.id,
                    text: beer.name
                };
            }));
    });


    detailContainer.clear();
});

var results = new ResultsList();

var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

results.onItemClick(function (id) {
    logic.retrieveBeerById(id, function (error, beer) {
        if (error) alert('Sorry, we have temporary problem, try again later.');
        else {
            var detail = new DetailPanel(beer.name, beer.style.description, beer.labels ? beer.labels.medium : DEFAULT_IMAGE);

            detailContainer.clear();
            detailContainer.appendChild(detail.element);
        }
    });

});

var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};

document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);

