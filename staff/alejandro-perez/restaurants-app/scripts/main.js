// my custom components

function SearchPanel(tag) {
    Component.call(this, tag);
    var myForm = document.createElement("form");
    var myInput = document.createElement("input");
    var myButton = document.createElement("button");

    myInput.setAttribute("type", "text");
    myInput.setAttribute("id", "textInput");
    myButton.setAttribute("id", "searchButton")




    myForm.appendChild(myInput);
    myForm.appendChild(myButton);

    this.element.appendChild(myForm);

}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;


function ResultsList(tag, filteredArray) {
    Component.call(this, 'div');
    // ID DIV
    this.element.id = 'resultsContainer'
    var myList = document.createElement("ul")
    myList.setAttribute("id", "resultsForm")


    filteredArray.forEach(element => {
        var li = document.createElement("li");
        li.innerText = element.name + ' ' + element.borough + ' ' + element.cuisine;
        myList.appendChild(li);
    });
    console.log(this)
    this.element.appendChild(myList);

}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

function RestaurantCard(tag) {
    //TODO
}



// my logic ...
var filteredArray = restaurants.slice(0, 5);
var panel = new SearchPanel("div");
document.body.appendChild(panel.element);
var results = new ResultsList("div", filteredArray)
document.body.appendChild(results.element)

searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    var toSearch = document.getElementById("textInput").value;
    var myArr = restaurants.slice(5, 10) // TEST

    var searchResults = [];

    filteredArray.forEach(element => {
        if (Object.values(element.name).indexOf(toSearch) > -1) {
            console.log('has ' + toSearch);
            searchResults.push(element)
        }

    });
    results = new ResultsList("div", searchResults)

    document.getElementById('resultsContainer').innerHTML = results.element.innerHTML

});


// results.element.children[0].innerHTML;