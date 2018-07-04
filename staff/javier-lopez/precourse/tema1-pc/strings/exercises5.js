//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.


function ShowLastName(LastName){

    //Forma automatica
    console.log(LastName+", "+LastName.substr(LastName.indexOf(" ")+1,LastName.length));

}

ShowLastName("Javier Lopez");






//Version pinxi
function showNameStatement(name){
    var splits = name.split(' ');
    var myNewString = splits[1];
    console.log(name+", "+myNewString);

}

showLastName("Tony Stark");