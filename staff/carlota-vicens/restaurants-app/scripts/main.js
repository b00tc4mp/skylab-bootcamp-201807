// my custom components

function SearchPanel(tag) {
    // TODO
    Component.call(this, tag);

    //formulario
    var form = document.createElement('form');

    //input text
    var input = document.createElement('input');



    //button
    var button = document.createElement('button');


    input.setAttribute('type', 'text');
    input.setAttribute('id', 'searcher');
    button.setAttribute('id', 'submit');
    input.placeholder='Enter something...';
    button.innerHTML='Search';

    //add to formulario input text & button
    form.appendChild(input);
    form.appendChild(button);

    this.element.appendChild(form);

}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;

function ResultsList(restaurants, tag) {
    // TODO
    Component.call(this, tag);

    var div = document.createElement('div');
    var ul = document.createElement('ul');
    ul.setAttribute('id','restlist');


    restaurants.forEach(function (item) {
        var li = document.createElement('li');


        li.innerText = item.name + ", " + item.cuisine;

        ul.appendChild(li);


    });
    div.appendChild(ul);
    this.element.appendChild(div);


}
ResultsList.prototype = Object.create(Component.prototype);
ResultsList.prototype.constructor = ResultsList;



// my logic ...


//restaurants = restaurants.slice(0, 1000);
var panel = new SearchPanel('section');
document.body.appendChild(panel.element);
var list = new ResultsList(restaurants, 'div');
document.body.appendChild(list.element);


submit.addEventListener('click', function (e) {
    e.preventDefault();
    var toSearch = document.getElementById('searcher').value;
    //console.log(toSearch);
    var restfilter = filter(toSearch);
    var listfilter = new ResultsList(restfilter, 'div');
    removeElementById('restlist');
    document.body.appendChild(listfilter.element);
});



function filter (toSearch){
    var restaurantsfilter= [];
    restaurants.forEach (function(item){
        if ((toSearch.localeCompare(item.cuisine))==0){
            restaurantsfilter.push(item);
        }
    });
    return restaurantsfilter;
}

function removeElementById(id){
    var element = document.getElementById(id);
    if (element) {
        element.parentNode.removeChild(element);
    }

}