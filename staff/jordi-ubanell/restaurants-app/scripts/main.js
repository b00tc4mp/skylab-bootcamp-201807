// my custom components

function SearchPanel() {
    // TODO
    Component.call(this,tag);

    // Formulario
    var form = document.createElement('form');  // Create the formulary

    // Input text
    var input = document.createElement('input');      // Create a variable to save the input data
 
    input('type', 'text');
    // Button
    var button = document.createElement('button');    // Create the button 

    // Add to formulario input text & button
    form.appendChild(input);        // 
    form.appendChild(button);       // 

    this.element.appendChild(orm);      
}

// cercador en el array

restaurants.prototype.includes(input);

find

// my logic ...

restaurants = restaurants.slice(0,1000);


// Search box: search inbox + button

// Search engine: take the input string and search (with IndexOf) in all array (only in the fields name + cuisine + borrough)  

// list restaurants: show only the name + cuisine + borrough of the restaurant. Show a limited number of results and pushing a button you can see more more




// function listsRestaurants(){

//     var panel1 = new Panel('hello world');

//     document.body.appendChild(panel1.element);

// }




(function () {


    var panel1 = new Panel('Restaurant search engine');

    document.body.appendChild(panel1.element);


    var confirm = new Confirm('your are hungry?');
    confirm.backgroundColor('khaki');
    confirm.onAccept(function () {
        alert('please, break!!!');
    });

    document.body.appendChild(confirm.element);



    var rest = restaurants.name;
    //[0] (return = restaurants[0].name + " " + restaurants[0].cuisine + " " + restaurants[0].borough);

    var numbersList = new List(rest);

    document.body.appendChild(numbersList.element);
})();