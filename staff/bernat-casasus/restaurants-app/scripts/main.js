// my custom components

function SearchPanel(tag) {
    // TODO
    Component.call(this,tag);
    var form = document.createElement("form");
    var input= document.createElement("input");
    var button = document.createElement("button");
    input.type = "text";
    input.id = "searchInput"
    button.innerHTML = 'Search';
    button.type = "submit";
    button.id = "searchButton";
    form.appendChild(input);
    form.appendChild(button);
    this.element.appendChild(form);
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList(tag,array) {

    // TODO
    Component.call(this,tag);
    var ul = document.createElement("ul");

    this.element.id = "resultsContainer";
    array.forEach(function(value){

        var li = document.createElement("li");
        li.innerText = value.name;

        ul.appendChild(li);
    })

    this.element.appendChild(ul);
}

ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;

// my logic ...

    var filter = restaurants.slice(0, 1000);

    var searchPanel = new SearchPanel('section');
    document.body.appendChild(searchPanel.element);

    var resultsList = new ResultsList('section',filter);
    document.body.appendChild(resultsList.element);


    document.getElementById("searchButton").addEventListener("click", function(event){
        event.preventDefault();
        
        var inputValue = document.getElementById('searchInput').value;

        var searchResults = [];
        filter.forEach(function(value){
            if (Object.values(value).indexOf(inputValue) > -1) {
                console.log('has '+inputValue);
                searchResults.push(value);
             }
        })


        var resultsList = new ResultsList('section',searchResults);
        document.getElementById("resultsContainer").innerHTML = resultsList.element.innerHTML;

    });