//e1) Asegura los cambios del ejercicio 5 solo imprimiendo esa nueva propiedad.

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function propertyNames(objectName){
	objectName.city = "New York";
	console.log(objectName.city);
}

propertyNames(avenger);