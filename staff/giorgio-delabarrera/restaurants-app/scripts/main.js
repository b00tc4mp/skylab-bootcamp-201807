// my custom components

function SearchPanel(tag) {
    
    Component.call(this, tag);

    // input
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'search');
    input.setAttribute('value', 'rris');

    // button
    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerText = 'Buscar';

    // form
    var form = document.createElement('form');
    form.appendChild(input);
    form.appendChild(button);

    this.element.appendChild(form);

    // this._onSearch = function(event) { event.preventDefault(); alert('ahora?') };
    this._onSearch = function() {};

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        this._onSearch(input.value);
    });

    form.addEventListener('submit', this._onSearch);
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;
SearchPanel.prototype.onSearch = function(callback) {
    this._onSearch = callback;
};

// function handleSearch(input) {
function handleSearch(event) {

    event.preventDefault();
    alert('submitttt');

    // var re = new RegExp(input); 

    // var searchedRestaurants = [{"address": {"building": "469", "coord": [-73.961704, 40.662942], "street": "Flatbush Avenue", "zipcode": "11225"}, "borough": "Brooklyn", "cuisine": "Hamburgers", "grades": [{"date": {"$date": 1419897600000}, "grade": "A", "score": 8}, {"date": {"$date": 1404172800000}, "grade": "B", "score": 23}, {"date": {"$date": 1367280000000}, "grade": "A", "score": 12}, {"date": {"$date": 1336435200000}, "grade": "A", "score": 12}], "name": "Wendy'S", "restaurant_id": "30112340"}];

    // console.log(searchedRestaurants);

    // var searchedRestaurants = restaurants.filter(function(restaurant) {
    //     var searched = false;
    //     for (var property in restaurant) {
            
    //         var value = restaurant[property];
    //         if (typeof restaurant[property] === 'string') {
    //             value = restaurant[property].toLowerCase();
    //         }

    //         if (re.test(value) === true) {
    //             searched = true;
    //             break;
    //         } 
    //     }
    //     return searched;
    // });

    // console.log(searchedRestaurants);
}

function ResultsList(tag, restaurants) {
    Component.call(this, tag);

    var ul = document.createElement('ul');

    restaurants.forEach(function(restaurant){

        var li = document.createElement('li');
        li.innerText = restaurant.name + ', ' +restaurant.borough + ', ' + restaurant.cuisine;
        
        ul.appendChild(li);
    });
    
    this.element.appendChild(ul);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;


// function search(word, restaurants) {
//     return [{"address": {"building": "1007", "coord": [-73.856077, 40.848447], "street": "Morris Park Ave", "zipcode": "10462"}, "borough": "Bronx", "cuisine": "Bakery", "grades": [{"date": {"$date": 1393804800000}, "grade": "A", "score": 2}, {"date": {"$date": 1378857600000}, "grade": "A", "score": 6}, {"date": {"$date": 1358985600000}, "grade": "A", "score": 10}, {"date": {"$date": 1322006400000}, "grade": "A", "score": 9}, {"date": {"$date": 1299715200000}, "grade": "B", "score": 14}], "name": "Morris Park Bake Shop", "restaurant_id": "30075445"}];
// }


// my logic ...

// console.log(restaurants);
var filteredRestaurants = restaurants;

var searchPanel = new SearchPanel('section');
searchPanel.onSearch(handleSearch);
// searchPanel.onSearch(function(event) { event.preventDefault(); });
// searchPanel.test = function() { alert('pepe') };
document.body.appendChild(searchPanel.element);

var resultList = new ResultsList('section', filteredRestaurants);
document.body.appendChild(resultList.element);

console.log(searchPanel);