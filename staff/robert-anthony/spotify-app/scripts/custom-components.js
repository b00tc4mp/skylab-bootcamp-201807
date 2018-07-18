"use strict"
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
/*


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
*/

/*
*
*
*
*
* */
//
// function RadioButtons(group, options, cssClass) {
//   Component.call(this);
//
//   const groupName = group || "choices";
//
//   this.element.classList.add(cssClass);
//   options.forEach(function (element, i) {
//     var radio = document.createElement('input');
//     radio.type = "radio";
//     radio.name = groupName;
//     radio.value = element;
//     radio.id = i;
//     radio.checked = !i;
//     var label = document.createElement('label')
//     label.htmlFor = i;
//     label.appendChild(document.createTextNode(element));
//
//     this.element.appendChild(radio);
//     this.element.appendChild(label);
//     this.getField = function () {
//       return document.querySelector('input[name=' + groupName + ']:checked').value
//     }
//   }.bind(this));
// }
//
// RadioButtons.prototype = Object.create(Component.prototype);
// RadioButtons.prototype.constructor = RadioButtons;


/*
*
*
*
*
* */
//
// function SettableList(cssClass) {
//   Component.call(this, 'ul');
//
//
// }

/*
*
*
*
*
* */

function SearchPanel(title, cssClass, tag) {
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

// RadioButtons.prototype = Object.create(Component.prototype);
// RadioButtons.prototype.constructor = RadioButtons;

/*
*
*
*
*
* */

function DetailPanel(title, cssClass) {
  Panel.call(this, title, "ul");

  this.element.classList.add(cssClass);
  this.imageHolder = document.createElement("div");
  this.element.appendChild(this.imageHolder);

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
  DetailPanel.call(this, title, cssClass);b
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