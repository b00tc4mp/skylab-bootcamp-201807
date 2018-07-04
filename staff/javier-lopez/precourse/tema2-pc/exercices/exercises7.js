//f) Lista el numero de propiedades que contiene el objeto.


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function PropertyCount(ObjectName){
	console.log(Object.keys(ObjectName).length);
}

PropertyCount(avenger);
