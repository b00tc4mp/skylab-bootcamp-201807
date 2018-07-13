var log = console.log.bind(console);



// my custom components
/*
*
*
*
* */
function SearchPanel(title,tag) {
    // TODO
  Panel.call(this,title,tag);

  var searchInput = document.createElement('input');
  var searchButton = document.createElement('button');
  searchButton.innerHTML = "Search";
  this.element.appendChild(searchInput);
  this.element.appendChild(searchButton);
  this.element.classList.add(SearchPanel.MY_CLASS);
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;
SearchPanel.MY_CLASS = "searchPanel";

SearchPanel.prototype.addSearchCallback = function (callback) {

  this.element.children[2].addEventListener('click', callback);
};

SearchPanel.prototype.getSearchTerm = function (callback) {

 return this.element.children[1].value;
};
/*
*
*
* */

/**/
function ResultsList(dataArray,tag) {

  List.call(this, dataArray,tag);

  this.element.classList.add(ResultsList.MY_CLASS);
    // TODO
}

ResultsList.prototype.setData = function (data) {
  this.element.empty();
};
ResultsList.prototype = Object.create(List.prototype);
ResultsList.prototype.constructor = ResultsList;
ResultsList.MY_CLASS = "resultsList";

// my logic ...

var first1000Restaurants = restaurants.slice(0,1000);

var searchPanel = new SearchPanel("Search for restaurants","section");
  document.body.appendChild(searchPanel.element);

var resultsArray = new ResultsList(["abce","def","ghi"]);
document.body.appendChild(resultsArray.element);

searchPanel.addSearchCallback(doRestaurantSearch);


function doRestaurantSearch(){
let results;
  let term = searchPanel.getSearchTerm();
  if (term) {

    results = first1000Restaurants.filter(function(element) {
     return element.findIndex(term) != -1;
    }).slice(0,100);

  }

}