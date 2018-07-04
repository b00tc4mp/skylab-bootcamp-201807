//d) Ahora, elimina la propiedad ID y asegura los cambios.


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function propertyNames(objectName){
	delete objectName.id;
	console.log(objectName);
}

propertyNames(avenger);