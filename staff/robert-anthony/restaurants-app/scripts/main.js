"use strict"

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

function MapComponent(cssClass, tag) {
  ClassedComponent.call(this, cssClass, tag);
  var _mapContainer = document.createElement('div');
  this.element.appendChild(_mapContainer);
  this.setMap = function (coord) {
    var myLatlng = new google.maps.LatLng(43.565529, -80.197645);
    var mapOptions = {
      zoom: 8,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(this.element, mapOptions);
    google.maps.event.trigger(map, "resize");

    //=====Initialise Default Marker
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'marker'
      //=====You can even customize the icons here
    });

    //=====Initialise InfoWindow
    var infowindow = new google.maps.InfoWindow({
      content: "<B>Skyway Dr</B>"
    });

    //=====Eventlistener for InfoWindow
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
  }
  this.clearMap = function () {
    _mapContainer.innerHTML = '';
  }
}

MapComponent.prototype = Object.create(ClassedComponent.prototype);
MapComponent.prototype.constructor = MapComponent;




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

function RadioButtons(group, options, cssClass) {
  Component.call(this);

  const groupName = group || "choices";

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
    this.getField = function () {
      return document.querySelector('input[name=' + groupName + ']:checked').value
    }
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

function SettableList(cssClass) {
  Component.call(this, 'ul');


}

SettableList.prototype = Object.create(List.prototype);
SettableList.constructor = SettableList;
SettableList.prototype.setData = function (data) {
  if (!data instanceof Array || data.length === 0) return;
  data.forEach(function (item) {
    var li = document.createElement('li');
    li.innerHTML = item;
    this.element.appendChild(li);
  }.bind(this));

};

SettableList.prototype.clearData = function () {
  while (this.element.firstChild) {
    this.element.removeChild(this.element.firstChild);
  }
};

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
  searchInput.autofocus = true;
  var searchButton = document.createElement('button');
  searchButton.type = "submit";
  searchButton.innerHTML = "Submit";
  this.element.appendChild(searchInput);
  this.element.appendChild(searchButton);
  this.element.classList.add(cssClass);

  this._onSearch = function () {
  };

  searchButton.addEventListener('onfocus', function () {
    searchInput.value = "";
  }.bind(this));

  this.element.addEventListener('submit', function (event) {
    event.preventDefault();
    var query = searchInput.value;
    this._onSearch(query);
    searchInput.value = "";

  }.bind(this));
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;
SearchPanel.prototype.onSearch = function (callback) {
  // this.element.children[2].addEventListener('click', callback);
  this._onSearch = callback;

};
// SearchPanel.prototype.getSearchTerm = function (callback) {
//   return this.element.children[1].value;
// };

RadioButtons.prototype = Object.create(Component.prototype);
RadioButtons.prototype.constructor = RadioButtons;

/*
*
*
*
*
* */

function DetailPanel(title, cssClass) {
  // TODO
  Panel.call(this, title, "section");

  this.element.classList.add(cssClass);

  this.infoDisplay = new SettableList("settableList");
  this.element.appendChild(this.infoDisplay.element);

  /* this.locationButton = document.createElement('button');
   this.locationButton.innerHTML = "Location";
   this.element.appendChild(this.locationButton);*/

  this.map = new MapComponent('map', 'div');
  this.element.appendChild(this.map.element);
  this.currentDetailData = null;

  this._onShowLocation = function () {
  };

  /*  this.locationButton.addEventListener('click', function (event) {
      this._onShowLocation(this.currentDetailData.address.coord)
    }.bind(this));*/
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;
DetailPanel.prototype.onShowLocation = function (callback) {
  this._onShowLocation = callback;
};

DetailPanel.prototype.setData = function (data) {
  this.currentDetailData = data;
  this.infoDisplay.clearData();
  this.map.setMap([])
  // var infoToDisplay = [];
  // infoToDisplay.push("<span>Name:</span> " + data.name);
  // infoToDisplay.push("<span>Address:</span> " + data.address.building + " " + data.address.street + ", " + data.borough + ", " + "" + data.address.zipcode);
  // infoToDisplay.push("<span>Grade:</span> " + data.grades[0].grade);
  this.infoDisplay.setData(data);
};


/*
*
*
* */

/**/
function ResultsList(dataArray, cssClass) {

  List.call(this, dataArray, "ul");

  this.element.classList.add(cssClass);

  this._elementClick = function () {

  };

  this.element.addEventListener('click', function (event) {
    if (event.target === this.element) return null;

    this._elementClick({id: event.target.getAttribute('data-id'), text: event.target.innerHTML});

  }.bind(this))
}


ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;
ResultsList.prototype.onElementClick = function (callback) {
  this._elementClick = callback;
};
ResultsList.prototype.setData = function (data) {
  while (this.element.firstChild) {
    this.element.removeChild(this.element.firstChild);
  }
  data.forEach(function (element, index) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = element.text;
    a.href = "#/" + index;
    a.setAttribute('data-id', element.id);
    li.appendChild(a);

    this.element.appendChild(li);
  }.bind(this));
};


var searchChoices = ["name", "borough", "cuisine"];


var mainContainer = new ClassedComponent("mainContainer");
document.body.appendChild(mainContainer.element);


var searchPanel = new SearchPanel("Search for restaurants", "searchPanel", "section");
mainContainer.element.appendChild(searchPanel.element);
searchPanel.onSearch(doRestaurantSearch);


var checkboxes = new RadioButtons("choices", searchChoices, "radioButtons");
searchPanel.element.appendChild(checkboxes.element);

var resultsList = new ResultsList([], "resultsList");
mainContainer.element.appendChild(resultsList.element);
resultsList.onElementClick(showRestaurantDetails);

var detailsPanel = new DetailPanel("Restaurant Detail", "detailsPanel", "div");
mainContainer.element.appendChild(detailsPanel.element);

detailsPanel.onShowLocation(showRestaurantLocation);


function doRestaurantSearch(term) {
  TweenMax.to(detailsPanel.element, 0.25, {autoAlpha: 0})
  var field = checkboxes.getField();

  var results = index.find(term, field);
  if (results) resultsList.setData(results);
}


function showRestaurantDetails(restaurantData) {
  if (!restaurantData) return;
  var restaurantDetail = index.requestByID(restaurantData.id);
  detailsPanel.setData(restaurantDetail);
  TweenMax.to(detailsPanel.element, 0.25, {autoAlpha: 1});

}

function showRestaurantLocation(location) {
  var url = "http://maps.google.com/?q=" + location[1] + "," + location[0];
  window.open(url);
}

