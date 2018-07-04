//d) Ahora, elimina la propiedad ID y asegura los cambios.


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function PropertyNames(ObjectName){
	delete ObjectName.id;
	console.log(ObjectName);
}

PropertyNames(avenger);