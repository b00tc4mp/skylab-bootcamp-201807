//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.


function showLastName(lastName){

    //Forma automatica
    console.log(lastName+", "+lastName.substr(lastName.indexOf(" ")+1,lastName.length));

}

showLastName("Javier Lopez");






//Version pinxi
function showNameStatement(name){
    var splits = name.split(' ');
    var myNewString = splits[1];
    console.log(name+", "+myNewString);

}

showLastName("Tony Stark");