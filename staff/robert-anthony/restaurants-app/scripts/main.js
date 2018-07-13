"use strict"

var SEARCH_CHOICES_NAME = "choices";
var log = console.log.bind(console);


// my custom components
/*
*
*
*
* */


function ClassedComponent(cssClass, tag) {
  Component.call(this, tag);
  this.element.classList.add(cssClass);

}

ClassedComponent.prototype = Object.create(Component.prototype);
ClassedComponent.prototype.constructor = ClassedComponent;

/*
*
*
*
* */


function Checkboxes(options, cssClass) {
  Component.call(this);
  this.element.classList.add(cssClass);

  options.forEach(function (element, i) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = element.name;
    checkbox.value = element.value;
    checkbox.id = i;

    var label = document.createElement('label')
    label.htmlFor = i;
    label.appendChild(document.createTextNode(element.name));

    this.element.appendChild(checkbox);
    this.element.appendChild(label);
  }, this);
}

Checkboxes.prototype = Object.create(ClassedComponent.prototype);
Checkboxes.prototype.constructor = Checkboxes;

/*
*
*
*
*
* */

function RadioButtons(groupName, options, cssClass) {
  Component.call(this);
  this.element.classList.add(cssClass);
  options.forEach(function (element, i) {
    var radio = document.createElement('input');
    radio.type = "radio";
    radio.name = groupName;
    radio.value = element;
    radio.id = i;
    radio.checked = i ? false : true;
    var label = document.createElement('label')
    label.htmlFor = i;
    label.appendChild(document.createTextNode(element));

    this.element.appendChild(radio);
    this.element.appendChild(label);
  }.bind(this));
}

RadioButtons.prototype = Object.create(Component.prototype);
RadioButtons.prototype.constructor = RadioButtons;

/*
*
*
*
*
* */

function SearchPanel(title, cssClass, tag) {
  // TODO
  Panel.call(this, title, "form");

  var searchInput = document.createElement('input');
  searchInput.type = "search";
  searchInput.placeholder = "Search term...";
  var searchButton = document.createElement('button');
  searchButton.type = "submit";
  searchButton.innerHTML = "Submit";
  this.element.appendChild(searchInput);
  this.element.appendChild(searchButton);
  this.element.classList.add(cssClass);

  this._onSearch = function () {
  };

  searchButton.addEventListener('onfocus', function() {
    searchInput.value = "";
  }.bind(this));

  this.element.addEventListener('submit', function (event) {
    event.preventDefault();
    var query = searchInput.value;
    this._onSearch(query);
  }.bind(this));
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;
SearchPanel.prototype.onSearch = function (callback) {
  // this.element.children[2].addEventListener('click', callback);
  this._onSearch = callback;

};
SearchPanel.prototype.getSearchTerm = function (callback) {
  return this.element.children[1].value;
};

/*
*
*
* */

/**/
function ResultsList(dataArray, cssClass) {

  List.call(this, dataArray, "ul");

  this.element.classList.add(cssClass);
  // TODO
}


ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;
ResultsList.prototype.setData = function (data) {
  while (this.element.firstChild) {
    this.element.removeChild(this.element.firstChild);
  }
  data.forEach(function (element) {
    let li = document.createElement("li");
    li.innerHTML = element.name;

    this.element.appendChild(li);
  }.bind(this));
};


var searchChoices = ["name", "borough", "cuisine"];



var mainContainer = new ClassedComponent("mainContainer");
document.body.appendChild(mainContainer.element);


var searchPanel = new SearchPanel("Search for restaurants", "searchPanel", "section");
mainContainer.element.appendChild(searchPanel.element);

var checkboxes = new RadioButtons(SEARCH_CHOICES_NAME, searchChoices, "radioButtons");
searchPanel.element.appendChild(checkboxes.element);

var resultsList = new ResultsList([], "resultsList");
mainContainer.element.appendChild(resultsList.element);


searchPanel.onSearch(doRestaurantSearch);


function doRestaurantSearch() {
  log(document.querySelector('input[name="choices"]:checked').value)
  let choice = document.querySelector('input[name=' + SEARCH_CHOICES_NAME + ']:checked').value;
  let results;
  let term = searchPanel.getSearchTerm();
  if (term) {
    results = restaurants.filter(function (element) {
      return element[choice].toLowerCase().includes(term.toLowerCase());
    }).slice(0, 100);
    if (results) resultsList.setData(results);
  }

}