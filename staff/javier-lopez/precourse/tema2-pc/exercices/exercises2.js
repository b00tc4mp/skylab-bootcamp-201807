//b) Ahora, crea una función que liste solo los valores de las propiedades.

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function PropertyNames(ObjectName){
	console.log(Object.values(ObjectName));
}

PropertyNames(avenger);
