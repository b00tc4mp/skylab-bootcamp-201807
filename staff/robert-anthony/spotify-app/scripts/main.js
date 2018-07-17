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
    radio.checked = !i;
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
  Panel.call(this, title, "section");

  this.element.classList.add(cssClass);

  this.infoDisplay = new SettableList("settableList");
  this.element.appendChild(this.infoDisplay.element);
  this.imageHolder = document.createElement("div");
  this.element.appendChild(this.imageHolder);


  this.currentDetailData = null;

  this._onShowLocation = function () {
  };


}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;
DetailPanel.prototype.onShowLocation = function (callback) {
  this._onShowLocation = callback;
};

DetailPanel.prototype.setData = function (data) {
  this.currentDetailData = data;
  this.infoDisplay.clearData();
  var infoToDisplay = [];
  data.forEach(function (element) {

    infoToDisplay.push("<span>Album Title:</span> " + element);
  });
  this.infoDisplay.setData(infoToDisplay);


};


/*if (data.abv) infoToDisplay.push("<span>ABV:</span> " + data.abv);
infoToDisplay.push("<span>Is Organic:</span> " + data.isOrganic);
if (data.description) infoToDisplay.push("<span>Description:</span> " + data.description);
if (data.style && data.style.name) infoToDisplay.push("<span>Style:</span> " + data.style.name);
if (data.glass && data.glass.name) infoToDisplay.push("<span>Glass:</span> " + data.glass.name);*/
/*
  var imageURL = "";

  if (data.label) {
    switch (true) {
      case (data.label.large !== undefined):
        imageURL = data.label.large;
        break;
      case (data.label.medium != undefined):
        imageURL = data.label.medium;
        break;
    }

  }
    imageURL = imageURL ||   "https://learn.kegerator.com/wp-content/uploads/2016/01/different-beer-glasses.jpg";
    var elem = document.createElement("img");
    elem.src = imageURL;
    elem.classList.add("beer-image");
    this.imageHolder.innerHTML = "";
  this.imageHolder.appendChild(elem);


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
    a.innerHTML = element.name;
    a.href = "#/" + index;
    a.setAttribute('data-id', element.id);
    li.appendChild(a);

    this.element.appendChild(li);
  }.bind(this));
};


var searchChoices = ["name", "borough", "cuisine"];


var mainContainer = new ClassedComponent("mainContainer");
document.body.appendChild(mainContainer.element);


var searchPanel = new SearchPanel("Search for Artists", "searchPanel", "section");
mainContainer.element.appendChild(searchPanel.element);
searchPanel.onSearch(doArtistSearch);


// var checkboxes = new RadioButtons("choices", searchChoices, "radioButtons");
// searchPanel.element.appendChild(checkboxes.element);

var resultsList = new ResultsList([], "resultsList");
mainContainer.element.appendChild(resultsList.element);
resultsList.onElementClick(showArtistAlbums);

var detailsPanel = new DetailPanel("Album Detail", "detailsPanel", "div");
mainContainer.element.appendChild(detailsPanel.element);

// detailsPanel.onShowLocation(showRestaurantLocation);


function doArtistSearch(query) {
  TweenMax.to(detailsPanel.element, 0.25, {autoAlpha: 0})
  // var field = checkboxes.getField();


  logic.searchArtists(query).then(function (artists) {
    if (artists) {
      resultsList.setData(artists);
    }
  });


}


function showArtistAlbums(artistData) {

  logic.retrieveAlbumsByArtistId(artistData.id).then(function (albums) {
    var albumList = albums.map(function (album) {
      return album.name;
    });
    detailsPanel.setData(albumList);
    TweenMax.to(detailsPanel.element, 0.25, {autoAlpha: 1});
  });


}

logic.token = "BQClAdI46qiyYPM0jod_YpScLdPr697SS9ysrG3UXxeUI5l6vFzqbNDZ9SqLBpRhJdG-1AXa_fG05fa-dr5Z6RcljQX2nroPn7gEyhzF0b8EKuwhYjo9i6ge5sqqQpcdI-9Q7UMByQmX";

// function showRestaurantLocation(location) {
//   var url = "http://maps.google.com/?q=" + location[1] + "," + location[0];
//   window.open(url);
//}

