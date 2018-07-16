// my custom components

function SearchPanel() {
    
    Component.call(this, 'form');

    // input
    var input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Input a text...';

    // button
    var button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Search';

    // form
    this.element.appendChild(input);
    this.element.appendChild(button);

    this._onSearch = function() {};

    this.element.addEventListener('submit', function(event) {
        event.preventDefault();
        var query = input.value;
        
        if (query) this._onSearch(query);

    }.bind(this));
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

SearchPanel.prototype.onSearch = function(callback) {
    this._onSearch = callback;
};


function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function(results) {
    this.element.innerHTML = '';

    results.forEach(function(result) {
        var li = document.createElement('li');

        li.innerHTML = result;

        this.element.appendChild(li);
    }, this);
}

function ListItem() {
    Component.call(this, 'a');

    this.element.id = '';
    this.element.href = '#';
    this.element.innerText = 'List item';

    this._onClick = function() {};

    document.body.addEventListener('click', function(event) {
    
        if (event.target.tagName.toLowerCase() === 'a' && event.target.id === this.element.id) {
            event.preventDefault();

            this._onClick(this.element.id);
        }

    }.bind(this));
}

ListItem.prototype = Object.create(Component.prototype);
ListItem.prototype.constructor = ListItem;

ListItem.prototype.onClick = function(callback) {
    this._onClick = callback;
}


function ItemDetail() {
    Component.call(this);
}

ItemDetail.prototype = Object.create(Component.prototype);
ItemDetail.prototype.constructor = ItemDetail;

ItemDetail.prototype.updateDetail = function(item) {
    this.element.innerHTML = item;
}



// my logic ...

var GOOGLE_MAPS_BASE_URL = 'http://www.google.com/maps/place/';

var searchPanel = new SearchPanel();

var resultsList = new ResultsList();

var itemDetail = new ItemDetail();

searchPanel.onSearch(function(query) {

    var matching = restaurants.filter(function(restaurant) {
        return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    resultsList.updateResults(matching.map(function(restaurant) {

        var listItem = new ListItem();
        listItem.element.id = restaurant.restaurant_id;
        listItem.element.href = 'detail/' + restaurant.restaurant_id;
        listItem.element.innerText = restaurant.name;

        listItem.onClick(function(id) {
            
            var matching = restaurants.filter(function(restaurant) {
                return restaurant.restaurant_id === id;
            });

            var restaurant = (matching) ? matching[0] : null;

            if (restaurant) {

                itemDetail.updateDetail(function() {

                    this.element.innerHTML = '';

                    // title
                    var titleElem = document.createElement('h1');
                    titleElem.innerText = restaurant.name;

                    this.element.appendChild(titleElem);

                    // info
                    var infoElem = document.createElement('div');
                    
                    var addressElem = document.createElement('address');
                    addressElem.innerText = restaurant.address.building + ' ' + 
                        restaurant.address.street + ' ' + 
                        restaurant.address.zipcode;

                    var boroughElem = document.createElement('div');
                    boroughElem.innerText = restaurant.borough;

                    var cuisineElem = document.createElement('div');
                    cuisineElem.innerText = restaurant.cuisine;

                    infoElem.appendChild(addressElem);
                    infoElem.appendChild(boroughElem);
                    infoElem.appendChild(cuisineElem);
                    this.element.appendChild(infoElem);

                    // location
                    var linkLocationElem = document.createElement('a');
                    linkLocationElem.href = GOOGLE_MAPS_BASE_URL + restaurant.address.coord[1] + ',' + restaurant.address.coord[0];
                    linkLocationElem.target = '_blank';
                    linkLocationElem.innerText = 'Location';

                    this.element.appendChild(linkLocationElem);

                    return this.element.innerHTML;

                }.bind(itemDetail)());
            }
        });
    
        return listItem.element.outerHTML;
    }));
});

document.body.appendChild(searchPanel.element);
document.body.appendChild(resultsList.element);
document.body.appendChild(itemDetail.element);
