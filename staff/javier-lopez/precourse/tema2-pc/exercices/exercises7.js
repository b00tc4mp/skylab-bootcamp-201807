//f) Lista el numero de propiedades que contiene el objeto.


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function propertyCount(objectName){
	console.log(Object.keys(objectName).length);
}

propertyCount(avenger);
