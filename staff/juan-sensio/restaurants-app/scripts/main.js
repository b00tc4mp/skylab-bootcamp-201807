// my custom components

function SearchPanel() {
    // TODO
    Component.call(this, 'form');
    var input = document.createElement('input');
    input.type = "text";
    input.name = "searchField";
    this.element.appendChild(input);
    var button = document.createElement('input');
    button.type = 'submit';
    button.value = "Search";
    this.element.appendChild(button);
    this.element.onsubmit = function(event) {
        event.preventDefault(); 
    };
}
SearchPanel.prototype = Object.create(Comment.prototype);
SearchPanel.prototype.constructor = SearchPanel;
SearchPanel.prototype.search = function(value) {
    console.log(value);
};

function ResultsList() {
    // TODO
    Component.call(this, 'ul');
}
ResultsList.prototype = Object.create(List.prototype);
ResultsList.prototype.constructor = ResultsList;
ResultsList.prototype.refresh = function(array, callback) {
    var maxNum = 20;
    if(maxNum > array.length)
        maxNum = array.length;
    this.element.innerHTML = "Results found: " + array.length + ' (showing: '+maxNum+').';
    for(var i=0; i<maxNum; i++) {
        var item = array[i];
        var li = document.createElement('li');
        li.innerHTML = item.name + ' (' + item.address.street + ', ' + item.address.building+ ').';
        li.style.cursor = 'pointer';
        this.element.appendChild(li);
    }
    // i need a closure to assign different clicks to each li
    for(var i=0; i<maxNum; i++) {
        var self = this;
        (function() {
            var li = self.element.children[i];
            var item = array[i];
            li.addEventListener('click', function(){
                callback(item);
            });
        })();
    }

};

function LocationPanel() {
    Panel.call(this,'name','div');
    this.element.children[0].innerHTML = '';
    var p = document.createElement('p');
    var p2 =document.createElement('p');  
    var a = document.createElement('a');
    a.href = '#';
    a.target = '_black';
    this.element.appendChild(p);
    this.element.appendChild(p2);
    this.element.appendChild(a);

    this.update = function(restaurant) {
        var h = this.element.children[0];
        h.innerHTML = restaurant.name;
        var p = this.element.children[1];
        p.innerHTML = restaurant.address.street + ', ' + restaurant.address.building + '. '+restaurant.borough+'. \n';
        p.innerHTML += 'Cuisine: '+restaurant.cuisine;
        var p2 = this.element.children[2];
        p2.innerHTML = 'Grades:';
        var grades = restaurant.grades;
        grades.forEach(function(grade){
            p2.innerHTML += ' ' + grade.grade;
        });
        var a = this.element.children[3];
        a.innerHTML = 'location';
        a.href = 'http://maps.google.com/maps?q='+restaurant.address.coord[1]+','+restaurant.address.coord[0];
    }.bind(this);
}
LocationPanel.prototype = Object.create(Panel.prototype);
LocationPanel.prototype.constructor = LocationPanel;
LocationPanel.prototype.reset = function() {
    for(var i=0; i<this.element.children.length; i++) {
        this.element.children[i].innerHTML = '';
    }
}

// my logic ...
var restaurants = restaurants.slice(0,1000);
var results = []

// build search panel
var searchPanel = new SearchPanel();
document.body.appendChild(searchPanel.element);
var prop = 'name';
searchPanel.element.onsubmit = function(event) {
    event.preventDefault();
    locationPanel.reset();
    var value = this.children[0].value;
    results = [];
    if(value!='') {
        var re = new RegExp(value,'i');
        restaurants.forEach(function(item) {
            if(re.test(item[prop])) 
                results.push(item);
        });
    }
    resultsList.refresh(results, locationPanel.update);
};

// build results list
var resultsList = new ResultsList();
document.body.appendChild(resultsList.element);

// build location panel
var locationPanel = new LocationPanel();
document.body.appendChild(locationPanel.element);

