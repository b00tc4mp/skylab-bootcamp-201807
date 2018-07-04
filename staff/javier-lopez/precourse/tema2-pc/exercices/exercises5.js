//e) Añade una nueva propiedad, por ejemplo city y dale un valor.

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function PropertyNames(ObjectName){
	ObjectName.city = "New York";
	console.log(ObjectName);
}

PropertyNames(avenger);