// my presentation logic

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchBeers(query)
        .then(function (beers) {
            results.updateResults(beers.map(function (beer) {
                return {
                    id: beer.id,
                    text: beer.name
                };
            }));

            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

var results = new ResultsList();

var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

results.onItemClick(function (id) {
    logic.retrieveBeerById(id)
        .then(function (beer) {
            var detail = new DetailPanel(beer.name, beer.style.description, beer.labels ? beer.labels.medium : DEFAULT_IMAGE);

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

