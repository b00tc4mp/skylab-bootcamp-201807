// My custom components


function searchPanel(tag) {
    Component.call (this,tag);

    // Create a form element
    var form = document.createElement('form');
   
    // Create an input text
    var input = document.createElement('input');
   
    // Create a search button
    var button = document.createElement('button');
    input.type="input";
    input.id="input";
    button.innerText="Search";
    button.type="submit";
    button.id="searchButton";
    button.style.backgroundColor="green";
    

    var self = this;
   

    form.appendChild(input);
    form.appendChild(button);


    this.element.appendChild(form);
}
searchPanel.prototype = Object.create (Component.prototype);
searchPanel.prototype.constructor = searchPanel;

function ResultsList(tag) {
    Component.call (this,tag);
    
    var ul= document.createElement("ul");

    filter.forEach(function(value){
            
        var li= document.createElement("li");
        li.innerText=value.borough;

        ul.appendChild(li);

    });

    this.element.appendChild(ul);
}
ResultsList.prototype = Object.create (Component.prototype);
ResultsList.prototype.constructor = ResultsList;

// my logic ...





var filter = restaurants.slice(0,10);
var panel = new searchPanel('section');
var listRestaurants = new ResultsList ('section');
document.body.appendChild(panel.element);
document.body.appendChild(listRestaurants.element);


searchButton.getElementById.addEventListener('click', function (event) {
    event.preventDefault();
    var inputValue= docuemnt.getElementById('input').value;
    document.getElementById("searchButton").innerHTML="asd";
    
});
