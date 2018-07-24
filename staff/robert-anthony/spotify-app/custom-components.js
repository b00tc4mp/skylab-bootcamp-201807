"use strict";
// my custom components
/*
*
*
*
* */

function ClassedComponent(cssClass, tag) {
  Component.call(this, tag);
  $(this.element).attr('style', '');

  $(this.element).addClass(cssClass);
}

ClassedComponent.prototype = Object.create(Component.prototype);
ClassedComponent.prototype.constructor = ClassedComponent;

function AudioComponent(cssClass) {
  ClassedComponent.call(this, cssClass);
  this.$element = $(this.element);

  this._audio = new Audio();
}

AudioComponent.prototype = Object.create(ClassedComponent.prototype);
AudioComponent.prototype.constructor = AudioComponent;
AudioComponent.prototype.clear = function () {
  if (this._audio) {
    this._audio.pause();
  }
};

AudioComponent.prototype.play = function () {
  if (this._audio) this._audio.play();
};
AudioComponent.prototype.setSourceAndPlay = function (src) {
  if (this._audio) {
    this._audio.src = src;
    this._audio.play();
  }
};

function NavBarWithSearch() {
  Component.call(this, 'nav');
  $(this.element).attr('style', '');

  $(this.element).addClass('navbar');
  $(this.element).append("<h1 class='display-4 sm-4'>Spotify Search</h1>");
}

NavBarWithSearch.prototype = Object.create(Component.prototype);
NavBarWithSearch.prototype.constructor = NavBarWithSearch;

function MainContainer(cssClass, tag) {
  ClassedComponent.call(this, tag);
  this.$element = $(this.element);

  this.$element.append('<div class="row">' + '<div class="col-sm" id="artistResults"></div>' + '<div class="col-sm" id="albumResults"></div>' + '<div class="col-sm" id="trackResults"></div>' + '</div>');
}

MainContainer.prototype = Object.create(ClassedComponent.prototype);
MainContainer.prototype.constructor = MainContainer;

MainContainer.prototype.addInto = function (element, idToPlaceInto) {
  this.$element.find("#" + idToPlaceInto).append(element);
};

function SearchPanel() {
  NavBarWithSearch.call(this);
  this.$element = $(this.element);

  this.$form = $("<form>").addClass("form-inline col-5");

  this.$form.append($('<label htmlFor="artistSearchInput" class="col-sm-4 col-form-label ">Search For Artist</label>'));

  this.$searchInput = $("<input id='artistSearchInput' type='search' autofocus placeholder='Search term' class='form-control mr-sm-2' >");
  this.$form.append(this.$searchInput);
  this.$button = $("<button class='btn btn-outline-success my-2 my-sm-0' type='submit'>Submit</button>");
  this.$form.append(this.$button);
  this.$element.append(this.$form);

  this._onSearch = function () {};

  this.$element.find('button').on('focus', function () {
    this.$searchInput.val("");
  }.bind(this));

  $(this.$element).on('submit', function (event) {
    event.preventDefault();
    var query = this.$searchInput.val();
    this._onSearch(query);
    this.$searchInput.val("");
  }.bind(this));
}

SearchPanel.prototype = Object.create(NavBarWithSearch.prototype);
SearchPanel.prototype.constructor = SearchPanel;
SearchPanel.prototype.onSearch = function (callback) {
  this._onSearch = callback;
};

/**/
function ResultsList(cssClass, h1Text) {

  Panel.call(this, "", "ul");
  $(this.element).attr('style', '');

  $(this.element).addClass(cssClass);
  $(this.element).addClass('list-group');

  /*
    if (h1Text) $(this.element).append("<h1>" + h1Text + "</h1>");
  */

  this._elementClick = function () {};

  $(this.element).on('click', function (event) {
    if (event.target === this.element) return null;
    var $target = $(event.target);
    $target.closest('.list-group').find('li').removeClass('active');
    if ($target.is('a')) {
      $target.parent().addClass('active');
      this._elementClick({ id: $target.attr('data-id'), text: $target.html });
    } else {
      $target.addClass('active');
      var $a = $target.find('a');
      this._elementClick({ id: $a.attr('data-id'), text: $a.html });
    }
  }.bind(this));
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;
ResultsList.prototype.onElementClick = function (callback) {
  this._elementClick = callback;
};
ResultsList.prototype.setData = function (data) {
  $(this.element).empty();

  data.forEach(function (element, index) {
    var $li = $("<li class='list-group-item list-group-item-action'><a>" + element.name + "</a></li>");
    $li.find("a").attr("data-id", element.id).attr("href", "#/" + index).addClass("detail-panel__link");
    $(this.element).append($li);
  }.bind(this));
};

function TrackDetailPanel(cssClass, linkToggle) {
  ResultsList.call(this, cssClass);
  this.$element = $(this.element);
  $(this.element).on('click', function (event) {
    if (event.target === this.element) return null;
    if (linkToggle) {
      $(event.target).toggleClass(linkToggle);
    }
    this._elementClick({ id: event.target.getAttribute('data-id'), text: event.target.innerHTML });
  }.bind(this));
}

TrackDetailPanel.prototype = Object.create(ResultsList.prototype);
TrackDetailPanel.prototype.constructor = TrackDetailPanel;

TrackDetailPanel.prototype.setData = function (title, data, imageSrc) {
  while (this.element.firstChild) {
    this.element.removeChild(this.element.firstChild);
  }

  $(this.element).append($("<h1>" + title + "</h1>"));

  var $img = $("<img>");
  $img.attr("src", imageSrc);
  $(this.element).append($img);
  data.forEach(function (element, index) {
    var $li = $("<li class='list-group-item list-group-item-action'><a >" + element.name + "</a></li>");
    $li.find("a").attr("data-id", element.id).attr("href", "#/" + index).addClass("detail-panel__link");
    $(this.element).append($li);
  }.bind(this));
};