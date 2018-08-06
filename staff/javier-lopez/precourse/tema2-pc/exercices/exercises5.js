//e) Añade una nueva propiedad, por ejemplo city y dale un valor.

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function propertyNames(objectName){
	objectName.city = "New York";
	console.log(objectName);
}

propertyNames(avenger);