// my custom components

function SearchPanel(tag) {
    // TODO
    Component.call(this,tag);

    var form = document.createElement("form");
    
    var input = document.createElement("input");
    var button = document.createElement("button");

    input.setAttribute("type","text");
    input.setAttribute("id", "searcher");
    button.setAttribute("id", "submit");


    form.appendChild(input);
    form.appendChild(button);

    this.element.appendChild(form);
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList(restaurants, tag) {
    // TODO
    Component.call(this, "div");
    
    var div = document.createElement("div");
    var ul = document.createElement("ul");
    this.element.id = "resultsContainer";
    restaurants.forEach(function (item) {
        var li = document.createElement('li');

        li.innerText = "Name: "+item.name + " || Cuisine: " + item.cuisine;

        ul.appendChild(li);
    });
    
    div.appendChild(ul);
    this.element.appendChild(div);

    
}
ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

// my logic ...

restaurants = restaurants.slice(0,5);
var panel = new SearchPanel("section");
document.body.appendChild(panel.element);
var results = new ResultsList(restaurants, "div");
document.body.appendChild(results.element);

submit.addEventListener("click",function(e){
    e.preventDefault();
    var toSearch = document.getElementById("searcher").value;  
    var myArray = restaurants.slice(5,10); 
    results = new ResultsList(myArray, "div");

    document.getElementById("resultsContainer").innerHTML = results.element.innerHTML;
    });