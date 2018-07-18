"use strict"

var log = console.log.bind(console);

var _audio = null;


function clearAudio() {
  if (_audio) {
    _audio.pause();
    _audio = null;
  }
}

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
  Panel.call(this, title, "ul");

  this.element.classList.add(cssClass);

  // this.infoDisplay = new SettableList("settableList");
  // this.element.appendChild(this.infoDisplay.element);
  this.imageHolder = document.createElement("div");
  this.element.appendChild(this.imageHolder);


  this.currentDetailData = null;

  this._elementClick = function () {

  };

  this.element.addEventListener('click', function (event) {
    if (event.target === this.element) return null;

    this._elementClick({id: event.target.getAttribute('data-id'), text: event.target.innerHTML});

  }.bind(this));
}

DetailPanel.prototype = Object.create(Panel.prototype);
DetailPanel.prototype.constructor = DetailPanel;
DetailPanel.prototype.onShowLocation = function (callback) {
  this._onShowLocation = callback;
};
DetailPanel.prototype.onElementClick = function (callback) {
  this._elementClick = callback;
};

DetailPanel.prototype.setData = function (data) {
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


function TrackDetailPanel(title, cssClass) {
  DetailPanel.call(this, title, cssClass);


}

TrackDetailPanel.prototype = Object.create(DetailPanel.prototype);
TrackDetailPanel.prototype.constructor = TrackDetailPanel;


TrackDetailPanel.prototype.setData = function (title, data, imageSrc) {
  while (this.element.firstChild) {
    this.element.removeChild(this.element.firstChild);
  }
  var h1 = document.createElement('h1');
  h1.innerHTML = title;
  this.element.appendChild(h1);
  var img = document.createElement('img');
  img.src = imageSrc;
  this.element.appendChild(img);
  data.forEach(function (element, index) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = element.name;
    a.href = "#/" + index;
    a.setAttribute('data-id', element.id);
    li.appendChild(a);
    a = document.createElement("a");


    this.element.appendChild(li);
  }.bind(this));
};


/**/
function ResultsList(cssClass) {

  Panel.call(this, "", "ul");

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

var resultsList = new ResultsList("resultsList");
mainContainer.element.appendChild(resultsList.element);
resultsList.onElementClick(showArtistAlbums);

var albumsDetail = new DetailPanel("", "albumsDetail");
mainContainer.element.appendChild(albumsDetail.element);
albumsDetail.onElementClick(showAlbumTracks);


var tracksDetail = new TrackDetailPanel("", "tracksDetail");
mainContainer.element.appendChild(tracksDetail.element);
tracksDetail.onElementClick(showTrackInfo);


function doArtistSearch(query) {
  TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 0});
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  clearAudio();

  // var field = checkboxes.getField();
  logic.searchArtists(query).then(function (artists) {
    if (artists) {
      resultsList.setData(artists);
    }
  });
}


function showAlbumTracks(albumData) {
  clearAudio();
  var albumRetrieved;
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  console.log(albumData);
  logic.retrieveAlbumById(albumData.id)
    .then(function (album) {
      albumRetrieved = album;
    })
    .then(function () {
      return logic.retrieveTracksByAlbumId(albumData.id)
    })
    .then(function (tracks) {
      var trackList = tracks.map(function (track) {
        return {name: track.name, id: track.id};
      });
      tracksDetail.setData(albumRetrieved.name, trackList, albumRetrieved.images[1].url);
      TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 1});
    });
}

function showArtistAlbums(artistData) {
  TweenMax.to(tracksDetail.element, 0.25, {autoAlpha: 0});
  clearAudio();
  logic.retrieveAlbumsByArtistId(artistData.id).then(function (albums) {
    var albumList = albums.map(function (album) {
      return {name: album.name, id: album.id};
    });
    albumsDetail.setData(albumList);
    TweenMax.to(albumsDetail.element, 0.25, {autoAlpha: 1});
  });

}


function showTrackInfo(trackData) {
  logic.retrieveTrackById(trackData.id).then(function (trackData) {
    clearAudio();

    if (trackData) {
      _audio = new Audio(trackData.preview_url);
      _audio.play();
    }
  });

}

logic.token = "BQAyDZNFqqtI6EmDHKRfLEBkbr_8MQjBuIzOeQNzgJfQEOHtt8603Cz4JyIZil3Sdus51lknhTd-kMF6GLWAdXTlgGNdq-M0CmMNXDnWA4CIy2ztQRN6g9LpzeziVEjavSWPpvsInvs_";

