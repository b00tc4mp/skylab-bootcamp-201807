"use strict";




function Divs() {
    var element = document.createElement("div");
    this.element = element;
}

function SearchBox() {
    Divs.call(this);
    var searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "asd");
    searchInput.setAttribute("class", "searchBox")
    searchInput.setAttribute("value", "")
    this.element.appendChild(searchInput);
}

SearchBox.prototype = Object.create(Divs.prototype);
SearchBox.prototype.constructor = SearchBox;

function SearchButton() {
    Divs.call(this);
    var searchbutton = document.createElement("button");
    searchbutton.setAttribute("type", "submit");
    searchbutton.setAttribute("class", "searchButton")
    searchbutton.setAttribute("onclick", "filterAndPrint();")
    searchbutton.setAttribute("style", "background-color: none; height: 20px, float: left")
    searchbutton.innerHTML = "Search"
    this.element.appendChild(searchbutton);
}

SearchButton.prototype = Object.create(Divs.prototype);
SearchButton.prototype.constructor = SearchButton;




var searchField = new SearchBox();
document.body.appendChild(searchField.element)


var searchSubmit = new SearchButton();
document.body.appendChild(searchSubmit.element)



function List(array) {
    Divs.call(this, 'ul');
    array.forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = item;
        this.element.appendChild(li);
    }.bind(this));
}

List.prototype = Object.create(Divs.prototype);
List.prototype.constructor = List;




var results = [restaurants[0].name, 2];



var listResults = new List(results);
document.body.appendChild(listResults.element)


function filterAndPrint() {
    var imprime = document.getElementById('asd').value;
    if (imprime === "1") {
        console.log("si")
    } else { console.log(imprime) }




}

//console.log(document.getElementById('asd').value);


var matching = restaurants.filter(restaurant){
    return restaurant.name.toLowerCase().indexOf(query)>-1;
}















