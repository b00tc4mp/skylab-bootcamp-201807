

function SearchPanel() {
    Component.call(this, "form");

    var input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Input a text...";

    var button = document.createElement("button");
    button.type = "submit";
    button.innerHTML = "Search";

    this.element.appendChild(input);
    this.element.appendChild(button);

    this._callback = function () {};

    this.element.addEventListener("click", function (event) {
        event.preventDefault();

        var query = input.value;

        if(query) this._callback(query);

    }.bind(this));
}

SearchPanel.prototype = Object.create(Component.prototype)
SearchPanel.prototype.constructor = SearchPanel;

SearchPanel.prototype.onSearch = function (callback){
    this._callback = callback;
}

var search = new SearchPanel();
document.body.appendChild(search.element);

///////////////////////////////////////////////

function ResultsList() {
    Component.call(this, 'ul');
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

ResultsList.prototype.updateResults = function(results) {
    this.element.innerHTML = '';

    results.forEach(function(result,index) {
        var li = document.createElement('li');
        this.element.appendChild(li);
        li.className = "resultslist"
        var bu = document.createElement("button");
        bu.innerHTML = result.name;
        bu.className = "infoName";
        bu.setAttribute("onClick", "showInfoSpace("+index+")");
        li.appendChild(bu);

        var di = document.createElement("div")
        li.appendChild(di);
        di.className = "infoSpace";
        di.id = index;
        
        var info = `
        <p class="infotext">Cuisine: ${result.cuisine}</p>
        <p class="infotext">Address: ${result.address.building} ${result.address.street} ${result.address.zipcode} ${result.borough}</p>
        <a class="button-location" target="_blank" href="http://www.google.com/maps/place/${result.address.coord[1]},${result.address.coord[0]}">Map</a>
        <iframe src = "https://maps.google.com/maps?q=${result.address.coord[1]},${result.address.coord[0]}&hl=es;z=14&amp;output=embed" width="400" height="200"></iframe>`
        
        di.innerHTML = info;
    }, this);
};




function showInfoSpace(id,event){
    
    if (document.getElementById(id).style.display === "block") {
        document.getElementById(id).style.display = "none";
    } else {
       document.getElementById(id).style.display = "block";
        }
    
}

//restaurants.splice(100);

search.onSearch(function (query) {
    var matching = restaurants.filter(function(restaurant) {
        return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

   

    //results.updateResults(matching.map(function(result) { return result.name; }));
    results.updateResults(matching.map(function(result) { return result; }));
});

var results = new ResultsList();


document.body.appendChild(results.element);